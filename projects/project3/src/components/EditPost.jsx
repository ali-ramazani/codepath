import React, { useState, useEffect } from "react";
import { supabase } from "../Client.js";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // State for the post data
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        console.error("Error fetching post:", error.message);
      } else {
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from("posts")
      .update({ title, content, image_url: imageUrl })
      .eq("id", id);
    if (error) {
      console.error("Error updating post:", error.message);
    } else {
      navigate(`/post/${id}`); // Redirect to the post page
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
        <form onSubmit={handleUpdatePost} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditPost;
