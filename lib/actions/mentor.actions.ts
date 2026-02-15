"use server"
import { auth } from "@clerk/nextjs/server"
import { createSupabaseClient } from "../supabase";

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

    if(subject && topic) {
        query = query.ilike('subject', `%${subject}%`)
            .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    } else if(subject) {
        query = query.ilike('subject', `%${subject}%`)
    } else if(topic) {
        query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`)
    }

    query = query.range((page - 1) * limit, page * limit - 1);

    const { data: mentors, error } = await query;

    if(error) throw new Error(error.message);

    return mentors;
}