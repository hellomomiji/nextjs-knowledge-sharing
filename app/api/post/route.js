import { connectToDB } from "@utils/database";
import Post from "@models/post";
import { revalidatePath } from "next/cache";

export const GET = async (req) => {
  try {
    await connectToDB();
    const posts = await Post.find({}).populate('creator');
    
    revalidatePath('/api/post');
    return new Response(JSON.stringify(posts), {status: 200});

  } catch (error) {
    return new Response("Failed to fetch all posts.", {status: 500});
  }
};