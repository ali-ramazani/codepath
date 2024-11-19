import React, { useState, useEffect } from "react";
import {supabase} from "../Client.js";
import { Link } from "react-router-dom";

function HomeFeed() {
  const [posts, setPosts] = useState([]);
  const [orderBy, setOrderBy] = useState("created_at");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("posts")
        .select()
        .order(orderBy, { ascending: false });
      setPosts(data);
    };
    fetchPosts();
  }, [orderBy]);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Runner's Hub</h1>
        <div className="flex justify-between items-center mb-4">
          <select
            onChange={(e) => setOrderBy(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="created_at">Newest</option>
            <option value="upvotes">Most Upvoted</option>
          </select>
          <Link
            to="/create"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create Post
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="bg-white p-4 shadow rounded-md hover:shadow-lg"
            >
              <h2 className="text-xl font-bold">{post.title}</h2>
              <p className="text-gray-600">
                {post.content.slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-500">Upvotes: {post.upvotes}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeFeed;
