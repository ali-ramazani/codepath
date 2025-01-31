import React, { useState } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const supabase = useSupabaseClient();
  const session = useSession();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase.from("posts").insert({
      title,
      content,
      image_url: imageUrl,
      user_id: session.user.id, // Link the post to the logged-in user
    });

    if (error) {
      console.error("Error creating post:", error.message);
    } else {
      navigate("/"); // Redirect to HomeFeed after successful post creation
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
