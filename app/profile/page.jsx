'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import Profile from "@components/Profile";

const MyProfile = () => {
  const {data: session, status} = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  
  const handleEdit = (post) => {
    router.push(`/update-post?id=${post._id}`);
  };
  
  const handleDelete = async (post) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');
    if (hasConfirmed) {
      try {
        await fetch(`/api/post/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((p) => {
          p._id !== post.id
        })
        
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setPosts(data);
    }
    if(session?.user.id) {
      fetchPosts();
    } 
  }, [status]);

  return (
    <Profile 
      name="My"
      desc="Welcome to your personalized page. Check the clips you have posted."
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
};

export default MyProfile