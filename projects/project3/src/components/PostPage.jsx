import React, { useState, useEffect } from "react";
import { supabase } from "../Client.js";
import { useParams, Link } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";

function PostPage() {
  const { id } = useParams(); // Post ID from the URL
  const [post, setPost] = useState(null); // State for the post data
  const [comments, setComments] = useState([]); // State for comments
  const [newComment, setNewComment] = useState(""); // State for adding a new comment
  const session = useSession(); // Current user's session

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
      }
    };

    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: true });
      if (error) {
        console.error("Error fetching comments:", error.message);
      } else {
        setComments(data);
      }
    };

    fetchPost();
    fetchComments();
  }, [id]);

  // Handle upvote functionality
  const handleUpvote = async () => {
    if (!session) {
      alert("You must be logged in to upvote.");
      return;
    }
    const { error } = await supabase
      .from("posts")
      .update({ upvotes: post.upvotes + 1 })
      .eq("id", id);
    if (error) {
      console.error("Error updating upvotes:", error.message);
    } else {
      setPost({ ...post, upvotes: post.upvotes + 1 }); // Update the local state
    }
  };

  // Handle adding a new comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Comment cannot be empty!");
      return;
    }
    if (!session) {
      alert("You must be logged in to add a comment.");
      return;
    }
    const { error } = await supabase.from("comments").insert({
      post_id: id,
      user_id: session.user.id,
      comment: newComment,
    });
    if (error) {
      console.error("Error adding comment:", error.message);
    } else {
      setNewComment("");
      const { data } = await supabase
        .from("comments")
        .select("*")
        .eq("post_id", id)
        .order("created_at", { ascending: true });
      setComments(data); // Refresh comments
    }
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
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mb-4"
        >
          Upvote {post.upvotes}
        </button>

        {/* Show Edit button if the logged-in user owns the post */}
        {session?.user.id === post.user_id && (
          <Link
            to={`/edit/${post.id}`}
            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
          >
            Edit Post
          </Link>
        )}

        {/* Comments Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {comments.length > 0 ? (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="border border-gray-300 rounded-md p-4"
                >
                  <p className="text-gray-800">{comment.comment}</p>
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(comment.created_at).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No comments yet. Be the first!</p>
          )}

          {/* Add a Comment */}
          {session ? (
            <form onSubmit={handleAddComment} className="mt-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Submit
              </button>
            </form>
          ) : (
            <p className="text-gray-500 mt-4">
              Please log in to add a comment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostPage;
