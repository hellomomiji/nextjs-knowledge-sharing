'use client';

import Form from "@components/Form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";


const CreatePost = () => {
  const router = useRouter();
  const {data: session} = useSession();
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    content: '',
    tag: '',
  });

  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await fetch('/api/post/new',
      {
        method: 'POST',
        body: JSON.stringify({
          post: post.content,
          userId: session?.user.id,
          tag: post.tag
        })
      })
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <Form 
      type= 'Create'
      post= {post}
      setPost= {setPost}
      submitting = {submitting}
      handleSubmit={createPost}
    />

    
  )
}

export default CreatePost