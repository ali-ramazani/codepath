import React, { useState, useEffect } from "react";
import { supabase } from "../Client.js";
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase.from("posts").select().eq("id", id).single();
      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setPost(data);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpvote = async () => {
    await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id);
    setPost({ ...post, upvotes: post.upvotes + 1 });
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full max-h-64 object-cover rounded-md mb-4"
          />
        )}
        <p className="text-gray-700 mb-4">{post.content}</p>
        <button
          onClick={handleUpvote}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        >
          Upvote {post.upvotes}
        </button>
      </div>
    </div>
  );
}

export default PostPage;
