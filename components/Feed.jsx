'use client';

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
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
    const response = await fetch('/api/prompt');
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
        regex.test(item.prompt)
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
          <PromptCardList data={searchResults} handleTagClick={handleTagClick}/>
        ) : (
          <PromptCardList data={allPosts} handleTagClick={handleTagClick}/> 
        )
      }

    </section>
  );
};

export default Feed;
