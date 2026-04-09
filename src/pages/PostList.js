import { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import PostForm from "../components/PostForm";
import { deletePost } from "../services/api";

function  PostList(){

    const [posts, setPosts] = useState([]);
    const handleNewPost = (post) => {setPosts([...posts, post])};
    const handleDeletePost = async (id) => {
        await deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
    }


    useEffect(() => {
        getPosts().then(data => setPosts(data));
    }, []);

    return (
            <div>
                
                <h2>Liste des posts</h2>

                {posts.map(post => (
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <button onClick ={() => handleDeletePost(post.id)}>Delete</button>
                    </div>
                ))}
                <PostForm onPostCreated={handleNewPost} />
            </div>
            
            
        );
    }

    export default PostList;