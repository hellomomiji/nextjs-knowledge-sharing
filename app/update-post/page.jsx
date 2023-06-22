'use client';

import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const UpdatePost = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    content: '',
    tag: '',
  });

  useEffect(() => {
    const getPostDetails = async () => {
      const response = await fetch(`/api/post/${postId}`);
      const data = await response.json();

      setPost({
        content: data.post,
        tag: data.tag,
      })
    }
    
    if (postId) {
      getPostDetails();
    }
  }, [postId]);

  const updatePost = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!postId) return alert('Post Not Found.');
    
    try {
      const response = await fetch(`/api/post/${postId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          post: post.content,
          tag: post.tag
        })
      })
      
      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }
  
  return (
    <Form 
      type= 'Edit'
      post= {post}
      setPost= {setPost}
      submitting = {submitting}
      handleSubmit={updatePost}
    />

    
  )
}

export default UpdatePost