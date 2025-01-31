import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditPost.css';
import { supabase } from '../Client';

const EditPost = ({ data }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ id: null, title: "", author: "", description: "" });

    // Fetch post data by ID when component mounts
    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select()
                .eq('id', id)
                .single();

            if (error) {
                console.error("Error fetching post:", error.message);
            } else {
                setPost(data);
            }
        };
        fetchPost();
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updatePost = async (event) => {
        event.preventDefault(); 
        const { error } = await supabase
            .from('Posts')
            .update({
                title: post.title,
                author: post.author,
                description: post.description,
            })
            .eq('id', id);

        if (error) {
            console.error("Error updating post:", error.message);
        } else {
            navigate('/'); // Redirect after successful update
        }
    };

    const deletePost = async (event) => {
        event.preventDefault();
        const {error} = await supabase 
        .from('Posts')
        .delete()
        .eq('id', id);

        window.location = '/';
    }

    return (
        <div>
            <form onSubmit={updatePost}>
                <label htmlFor="title">Title</label> <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title || ""}
                    onChange={handleChange}
                /><br />
                <br />

                <label htmlFor="author">Author</label><br />
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={post.author || ""}
                    onChange={handleChange}
                /><br />
                <br />

                <label htmlFor="description">Description</label><br />
                <textarea
                    rows="5"
                    cols="50"
                    id="description"
                    name="description"
                    value={post.description || ""}
                    onChange={handleChange}
                ></textarea>
                <br />
                <input type="submit" value="Submit" />
                <button type="button" className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
};

export default EditPost;
