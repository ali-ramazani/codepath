import React, { useState, useEffect } from "react";
import { supabase } from "../Client.js";
import { Link } from "react-router-dom";

function HomeFeed() {
  const [posts, setPosts] = useState([]); // State to store posts
  const [orderBy, setOrderBy] = useState("created_at"); // State for sorting order

  // Fetch posts when component mounts or orderBy changes
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, image_url, upvotes") // Explicitly select fields
        .order(orderBy, { ascending: false });

      if (error) {
        console.error("Error fetching posts:", error);
        return;
      }

      setPosts(data);
    };

    fetchPosts();
  }, [orderBy]);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Runner's Hub</h1>
        <div className="flex justify-between items-center mb-4">
          {/* Dropdown to select sorting order */}
          <select
            onChange={(e) => setOrderBy(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2"
          >
            <option value="created_at">Newest</option>
            <option value="upvotes">Most Upvoted</option>
          </select>

          {/* Link to Create Post page */}
          <Link
            to="/create"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Create Post
          </Link>
        </div>

        {/* Grid of posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              className="bg-white p-4 shadow rounded-md hover:shadow-lg"
            >
              {/* Display post image */}
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              {/* Display post title */}
              <h2 className="text-xl font-bold">{post.title}</h2>
              {/* Display post content preview */}
              <p className="text-gray-600">
                {post.content.slice(0, 100)}...
              </p>
              {/* Display post upvotes */}
              <p className="text-sm text-gray-500">Upvotes: {post.upvotes}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomeFeed;
