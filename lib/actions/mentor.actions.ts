"use server"
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";
import { revalidatePath } from "next/cache";

export const createMentor = async (formData: CreateMentor) => {
    const { userId: author } = await auth();
    const supabase = createSupabaseClient();
    const { data, error } = await supabase
        .from('mentors')
        .insert({ ...formData, author })
        .select()

    if (error || !data) throw new Error(error?.message || "Failed to create a mentor")

    return data[0]
}
export const getAllMentors = async ({ limit = 10, page = 1, subject, topic }: GetAllMentors) => {
    const supabase = createSupabaseClient();

    let query = supabase.from('mentors').select();

    if (subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if (subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if (topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: mentors, error } = await query;

    if (error) throw new Error(error.message);

    return mentors;
}

export const getMentor = async (id: string) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase
        .from('mentors')
        .select()
        .eq("id", id)
    if (error) console.log('Error:', error)

    return data?.[0]
}

export const addToSessionHistory = async (mentorId: string) => {
    const { userId } = await auth();
    const supabase = createSupabaseClient()
    const { data, error } = await supabase.from('session_history').insert({
        mentor_id: mentorId,
        user_id: userId,
    })
    if (error) throw new Error(error.message);
    return data;
}

export const getRecentSessions = async (limit = 10) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase.from("session_history").select(`mentors:mentor_id(*)`).order('created_at', { ascending: false }).limit(limit)
    if (error) throw new Error(error.message);
    return data.map(({ mentors }) => mentors)
}

export const getUserSessions = async (userId: string, limit = 10) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase.from("session_history").select(`mentors:mentor_id(*)`).eq('user_id', userId).order('created_at', { ascending: false }).limit(limit)
    if (error) throw new Error(error.message);
    return data.map(({ mentors }) => mentors)
}
export const getUserMentors = async (userId: string) => {
    const supabase = createSupabaseClient()
    const { data, error } = await supabase.from("mentors").select().eq('author', userId)
    if (error) throw new Error(error.message);
    return data;
}

export const newMentorPermissions = async () => {
    const { userId, has } = await auth()
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

    if (error) throw new Error(error.message)
    const mentorCount = data?.length

    if (mentorCount >= limit) {
        return false
    } else {
        return true
    }
}


export const addBookmark = async (mentorId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase.from("bookmarks").insert({
    mentor_id: mentorId,
    user_id: userId,
  });
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

export const removeBookmark = async (mentorId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("mentor_id", mentorId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

export const getBookmarkedMentors = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`mentors:mentor_id (*)`)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data.map(({ mentors }) => mentors);
};

export const getBookmarkedMentorIds = async (userId: string): Promise<string[]> => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select("mentor_id")
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data.map(({ mentor_id }) => mentor_id);
};