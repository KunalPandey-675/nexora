"use server"
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";
import { errorLogger } from "../errorLogger";
import { z } from "zod";

// Validation schemas
const CreateMentorSchema = z.object({
    name: z.string().min(2, "Mentor name must be at least 2 characters").max(100, "Mentor name must be at most 100 characters"),
    subject: z.string().min(1, "Subject is required").max(50, "Subject must be at most 50 characters"),
    topic: z.string().min(1, "Topic is required").max(200, "Topic must be at most 200 characters"),
    voice: z.string().min(1, "Voice is required"),
    style: z.string().min(1, "Style is required"),
    duration: z.number().int().min(1, "Duration must be at least 1 minute").max(480, "Duration must be at most 8 hours"),
});

const GetAllMentorsSchema = z.object({
    limit: z.number().int().min(1).max(100).optional().default(10),
    page: z.number().int().min(1).optional().default(1),
    subject: z.union([z.string(), z.array(z.string())]).optional(),
    topic: z.union([z.string(), z.array(z.string())]).optional(),
});

export const createMentor = async (formData: CreateMentor) => {
    try {
        // Validate input
        const validatedData = CreateMentorSchema.parse(formData);

        const { userId: author } = await auth();
        if (!author) {
            errorLogger.error('Unauthorized: No user ID found in auth', undefined, { action: 'createMentor' });
            throw new Error("You must be logged in to create a mentor");
        }

        const supabase = createSupabaseClient();
        const { data, error } = await supabase
            .from('mentors')
            .insert({ ...validatedData, author })
            .select()

        if (error || !data) {
            errorLogger.error('Failed to create mentor in database', error || new Error('No data returned'), { validatedData, author });
            throw new Error(error?.message || "Failed to create a mentor");
        }

        errorLogger.info('Mentor created successfully', { mentorId: data[0].id, author });
        return data[0];
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.issues.map(issue => issue.message).join(', ');
            errorLogger.error('Validation error in createMentor', new Error(error.message), { errors: error.issues, formData });
            throw new Error(`Validation failed: ${errorMessages}`);
        }
        errorLogger.error('Error in createMentor action', error instanceof Error ? error : new Error(String(error)), { formData });
        throw error;
    }
}
export const getAllMentors = async ({ limit = 10, page = 1, subject, topic }: GetAllMentors) => {
    try {
        // Validate input
        const validatedParams = GetAllMentorsSchema.parse({ limit, page, subject, topic });

        const supabase = createSupabaseClient();

        let query = supabase.from('mentors').select();

        if (validatedParams.subject && validatedParams.topic) {
            const subjectStr = Array.isArray(validatedParams.subject) ? validatedParams.subject[0] : validatedParams.subject;
            const topicStr = Array.isArray(validatedParams.topic) ? validatedParams.topic[0] : validatedParams.topic;
            query = query.ilike('subject', `%${subjectStr}%`)
                .or(`topic.ilike.%${topicStr}%,name.ilike.%${topicStr}%`)
        } else if (validatedParams.subject) {
            const subjectStr = Array.isArray(validatedParams.subject) ? validatedParams.subject[0] : validatedParams.subject;
            query = query.ilike('subject', `%${subjectStr}%`)
        } else if (validatedParams.topic) {
            const topicStr = Array.isArray(validatedParams.topic) ? validatedParams.topic[0] : validatedParams.topic;
            query = query.or(`topic.ilike.%${topicStr}%,name.ilike.%${topicStr}%`)
        }
        query = query.order('created_at', { ascending: false });
        query = query.range((validatedParams.page - 1) * validatedParams.limit, validatedParams.page * validatedParams.limit - 1);

        const { data: mentors, error } = await query;

        if (error) {
            errorLogger.error('Failed to fetch mentors', error, { validatedParams });
            throw new Error(error.message);
        }

        return mentors;
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errorMessages = error.issues.map(issue => issue.message).join(', ');
            errorLogger.error('Validation error in getAllMentors', new Error(error.message), { errors: error.issues, params: { limit, page, subject, topic } });
            throw new Error(`Invalid parameters: ${errorMessages}`);
        }
        errorLogger.error('Error in getAllMentors action', error instanceof Error ? error : new Error(String(error)), { limit, page, subject, topic });
        throw error;
    }
}

export const getMentor = async (id: string) => {
    try {
        const supabase = createSupabaseClient()
        const { data, error } = await supabase
            .from('mentors')
            .select()
            .eq("id", id)
        
        if (error) {
            errorLogger.error('Failed to fetch mentor', error, { mentorId: id });
            throw new Error(error.message);
        }

        return data?.[0]
    } catch (error) {
        errorLogger.error('Error in getMentor action', error instanceof Error ? error : new Error(String(error)), { mentorId: id });
        throw error;
    }
}

export const addToSessionHistory = async (mentorId: string) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            errorLogger.error('Unauthorized: No user ID found in auth', undefined, { action: 'addToSessionHistory', mentorId });
            throw new Error("You must be logged in to save session history");
        }

        const supabase = createSupabaseClient()
        const { data, error } = await supabase.from('session_history').insert({
            mentor_id: mentorId,
            user_id: userId,
        })
        
        if (error) {
            errorLogger.error('Failed to add session to history', error, { mentorId, userId });
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        errorLogger.error('Error in addToSessionHistory action', error instanceof Error ? error : new Error(String(error)), { mentorId });
        throw error;
    }
}

export const getRecentSessions = async (limit = 10) => {
    try {
        const supabase = createSupabaseClient()
        const { data, error } = await supabase.from("session_history").select(`mentors:mentor_id(*)`).order('created_at', { ascending: false }).limit(limit)
        
        if (error) {
            errorLogger.error('Failed to fetch recent sessions', error, { limit });
            throw new Error(error.message);
        }

        return data.map(({ mentors }) => mentors)
    } catch (error) {
        errorLogger.error('Error in getRecentSessions action', error instanceof Error ? error : new Error(String(error)), { limit });
        throw error;
    }
}

export const getUserSessions = async (userId: string, limit = 10) => {
    try {
        const supabase = createSupabaseClient()
        const { data, error } = await supabase.from("session_history").select(`mentors:mentor_id(*)`).eq('user_id', userId).order('created_at', { ascending: false }).limit(limit)
        
        if (error) {
            errorLogger.error('Failed to fetch user sessions', error, { userId, limit });
            throw new Error(error.message);
        }

        return data.map(({ mentors }) => mentors)
    } catch (error) {
        errorLogger.error('Error in getUserSessions action', error instanceof Error ? error : new Error(String(error)), { userId, limit });
        throw error;
    }
}
export const getUserMentors = async (userId: string) => {
    try {
        const supabase = createSupabaseClient()
        const { data, error } = await supabase.from("mentors").select().eq('author', userId)
        
        if (error) {
            errorLogger.error('Failed to fetch user mentors', error, { userId });
            throw new Error(error.message);
        }

        return data;
    } catch (error) {
        errorLogger.error('Error in getUserMentors action', error instanceof Error ? error : new Error(String(error)), { userId });
        throw error;
    }
}

export const getUserPlan = async () => {
    const { has } = await auth()

    if (has({ plan: 'pro_learner' })) {
        return { name: 'Pro Learner', isFinal: true }
    } else if (has({ plan: 'core_learner' })) {
        return { name: 'Core Learner', isFinal: false }
    } else {
        return { name: 'Basic Plan', isFinal: false }
    }
}

export const newMentorPermissions = async () => {
    try {
        const { userId, has } = await auth()
        
        if (!userId) {
            errorLogger.error('Unauthorized: No user ID found in auth', undefined, { action: 'newMentorPermissions' });
            throw new Error("You must be logged in to check mentor permissions");
        }

        const supabase = createSupabaseClient()

        let limit = 0
        if (has({ plan: 'pro_learner' })) {
            return true
        } else if (has({ feature: '3_mentor_limit' })) {
            limit = 3
        } else if (has({ feature: '10_mentor_limit' })) {
            limit = 10
        }

        const { data, error } = await supabase.from('mentors').select('id', { count: 'exact' }).eq('author', userId)

        if (error) {
            errorLogger.error('Failed to check mentor count', error, { userId });
            throw new Error(error.message);
        }

        const mentorCount = data?.length

        if (mentorCount >= limit) {
            return false
        } else {
            return true
        }
    } catch (error) {
        errorLogger.error('Error in newMentorPermissions action', error instanceof Error ? error : new Error(String(error)));
        throw error;
    }
}


export const addBookmark = async (mentorId: string, path: string) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            errorLogger.error('Unauthorized: No user ID found in auth', undefined, { action: 'addBookmark', mentorId });
            throw new Error("You must be logged in to bookmark a mentor");
        }

        const supabase = createSupabaseClient();
        const { data, error } = await supabase.from("bookmarks").insert({
            mentor_id: mentorId,
            user_id: userId,
        });
        
        if (error) {
            errorLogger.error('Failed to add bookmark', error, { mentorId, userId });
            throw new Error(error.message);
        }

        revalidatePath(path);
        return data;
    } catch (error) {
        errorLogger.error('Error in addBookmark action', error instanceof Error ? error : new Error(String(error)), { mentorId });
        throw error;
    }
};

export const removeBookmark = async (mentorId: string, path: string) => {
    try {
        const { userId } = await auth();
        if (!userId) {
            errorLogger.error('Unauthorized: No user ID found in auth', undefined, { action: 'removeBookmark', mentorId });
            throw new Error("You must be logged in to remove bookmarks");
        }

        const supabase = createSupabaseClient();
        const { data, error } = await supabase
            .from("bookmarks")
            .delete()
            .eq("mentor_id", mentorId)
            .eq("user_id", userId);
        
        if (error) {
            errorLogger.error('Failed to remove bookmark', error, { mentorId, userId });
            throw new Error(error.message);
        }

        revalidatePath(path);
        return data;
    } catch (error) {
        errorLogger.error('Error in removeBookmark action', error instanceof Error ? error : new Error(String(error)), { mentorId });
        throw error;
    }
};

export const getBookmarkedMentors = async (userId: string) => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
            .from("bookmarks")
            .select(`mentors:mentor_id (*)`)
            .eq("user_id", userId);
        
        if (error) {
            errorLogger.error('Failed to fetch bookmarked mentors', error, { userId });
            throw new Error(error.message);
        }

        return data.map(({ mentors }) => mentors);
    } catch (error) {
        errorLogger.error('Error in getBookmarkedMentors action', error instanceof Error ? error : new Error(String(error)), { userId });
        throw error;
    }
};

export const getBookmarkedMentorIds = async (userId: string): Promise<string[]> => {
    try {
        const supabase = createSupabaseClient();
        const { data, error } = await supabase
            .from("bookmarks")
            .select("mentor_id")
            .eq("user_id", userId);
        
        if (error) {
            errorLogger.error('Failed to fetch bookmarked mentor IDs', error, { userId });
            throw new Error(error.message);
        }

        return data.map(({ mentor_id }) => mentor_id);
    } catch (error) {
        errorLogger.error('Error in getBookmarkedMentorIds action', error instanceof Error ? error : new Error(String(error)), { userId });
        throw error;
    }
};