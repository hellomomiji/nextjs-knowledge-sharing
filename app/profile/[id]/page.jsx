"use client";

import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";



const UserProfile = ({params}) => {
  const searchParams = useSearchParams();
  const username = searchParams.get('name');
  console.log(params.id);

  const [userPosts, setUserPosts] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/post');
    const data = await response.json();
    setUserPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     const response = await fetch(`/api/users/${params?.id}/posts`);
  //     const data = await response.json();

  //     setUserPosts(data);
  //   }
  //   if(params?.id) {
  //     fetchPosts();
  //   } 
  // }, [params.id]);
  
  return (
    <Profile 
      name={username}
      desc={`Welcome to ${username} profile page. Check the clips ${username} have posted.`}
      data={userPosts}
    />
  )
}

export default UserProfile