import React, { useState } from 'react';
import './CreatePost.css';
import {supabase} from '../Client';

const CreatePost = () => {
    const [post, setPost] = useState({ title: "", author: "", description: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPost((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        const {data, error} = await supabase 
        .from('Posts')
        .insert([post]);

        if (error) {
            console.log("Error creating post: ", error.message)
        } else {
            console.log("Post created successfully: ", data);
            setPost({ title: "", author: "", description: "" });
        }

        event.target.reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label> <br />
                <input
                    type="text"
                    id="title"
                    name="title"
                    onChange={handleChange}
                /><br />
                <br />

                <label htmlFor="author">Author</label><br />
                <input
                    type="text"
                    id="author"
                    name="author"
                    onChange={handleChange}
                /><br />
                <br />

                <label htmlFor="description">Description</label><br />
                <textarea
                    rows="5"
                    cols="50"
                    id="description"
                    name="description"
                    onChange={handleChange}
                ></textarea>
                <br />
                <input type="submit" value="Submit" />
            </form>

            <div>
                <h3>Post Preview</h3>
                <p><strong>Title:</strong> {post.title}</p>
                <p><strong>Author:</strong> {post.author}</p>
                <p><strong>Description:</strong> {post.description}</p>
            </div>
        </div>
    );
};

export default CreatePost;
