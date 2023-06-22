'use client';

import { useState, useEffect } from 'react';
import PostCard from './PostCard';

const PostCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 post_layout">
      {data.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      )
      )}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  
  const [searchResults, setSearchResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/post');
    const data = await response.json();
    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    console.log(e.target.value);
    const searchResult = filterPosts(e.target.value);
    setSearchResults(searchResult);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const tagClickResults = filterPosts(tagName);
    console.log(tagClickResults);
    setSearchResults(tagClickResults);
  }

  const filterPosts = (text) => {
    const regex = new RegExp(text, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.post)
    );
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {
        searchText ? (
          <PostCardList data={searchResults} handleTagClick={handleTagClick}/>
        ) : (
          <PostCardList data={allPosts} handleTagClick={handleTagClick}/> 
        )
      }

    </section>
  );
};

export default Feed;
