import { useEffect, useState } from "react";
import { getPosts } from "../services/Postapi";
import PostForm from "../components/PostForm";
import PostItem from "../components/PostItem";

function  PostList(){

    // State for the loading state
    const [loading, setLoading] =useState(true);
    // State for error handling
    const [error, setError] = useState(null);
    // State for posts
    const [posts, setPosts] = useState([]);
    // State for editing posts elements
    

    // New post handler
    const onPostCreated = (post) => {
        setPosts(previousPosts => [...previousPosts, post]);
        
    };
    // Update post handler
    const onPostUpdated = (updatedPost) => {
        // Update the local state with the new post data and reset the editing state
        setPosts(previousPosts => 
                    previousPosts.map(post => post.id === updatedPost.id ? updatedPost : post));
        console.log("Post updated");
    }

    // Delete post handler
    const onPostDeleted = (deletedId) =>{
        setPosts(previousPosts => previousPosts.filter(post => post.id !== deletedId));
    };

    // Get the posts, then set data on them, catch any errors and finally set the loading state to false when done
    useEffect(() => {
        getPosts()
            .then(data => setPosts(data))
            .catch(err => {
                    console.error(err);
                    setError("Failed to load posts");
                })
            .finally(() => setLoading(false));
    },[]);
    
        if(loading) return <p>Loading...</p>;
        if(error) return <p>{error}</p>;

    return (
        <div>
            <h1>Lowen's adventures blog</h1>
            <h2>All posts</h2>
            {posts.map(post => (
                <PostItem
                    key={post.id}
                    post={post}
                    onPostUpdated={onPostUpdated}
                    onPostDeleted={onPostDeleted}
                />
            ))}
            <PostForm onPostCreated={onPostCreated} />
        </div>
    );
}

    export default PostList;