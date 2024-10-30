import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../Client';

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            const {data} = await supabase
            .from('Posts')
            .select();
            setPosts(data);
        }
        fetchData();
    }, [props]);
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post) => 
                   <Card id={post.id} title={post.title} author={post.author} description={post.description}/>
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;