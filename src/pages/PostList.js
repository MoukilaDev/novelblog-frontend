import { useEffect, useState } from "react";
import { getPosts } from "../services/Postapi";
import PostForm from "../components/PostForm";
import { deletePost } from "../services/Postapi";
import { updatePost } from "../services/Postapi";
import PostItem from "../components/PostItem";

function  PostList(){

    // State for the loading state
    const [loading, setLoading] =useState(true);
    // State for error handling
    const [error, setError] = useState(null);
    // State for posts
    const [posts, setPosts] = useState([]);
    // New post handler
    const handleNewPost = (post) => {setPosts([...posts, post])};
    // Delete post handler
    const handleDeletePost = async (id) =>{
        await deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
        console.log("Post deleted");
    };
        /* Update post handler
            * Call the API to update the post, then update the local state with the new post data and reset the editing state.
            * @param {number} id - The ID of the post being updated.
            * @return {void}
        */
    const handleUpdate = async (id) => {
        const updated = await updatePost(id, {
            title:  editingTitle,
            content: editingContent
        });
        // Update the local state with the new post data and reset the editing state
        setPosts(posts.map(post => post.id === id ? updated : post));
        setEditingPostId(null);
        console.log("Post updated");
    }

    // State for editing posts
    const [editingPostId, setEditingPostId] = useState(null);
    const [editingTitle, setEditingTitle] = useState('');
    const [editingContent, setEditingContent] = useState('');
    // Editing post handler
    const handleEditPost = (post) => {
        setEditingPostId(post.id);
        setEditingTitle(post.title);
        setEditingContent(post.content);
    }
    
    
    // Get the posts, then set data on them, catch any errors and finally set the loading state to false when done
    useEffect(() => {
        getPosts()
            .then(data => setPosts(data))
            .catch(err => {
                    console.error(err);
                    setError("Failed to load posts");
                })
            .finally(() => setLoading(false));
    }, []);
    
        if(loading){
            return <p>Loading...</p>;
        }
        
        if(error){
            return <p>{error}</p>;
        }
    return (
        <div>
            <h2>Liste des posts</h2>

            <PostForm onPostCreated={handleNewPost} />

            {posts.map(post => (
                <PostItem
                    key={post.id}
                    post={post}
                    editingPostId={editingPostId}
                    editingTitle={editingTitle}
                    editingContent={editingContent}
                    setEditingTitle={setEditingTitle}
                    setEditingContent={setEditingContent}
                    handleEditPost={handleEditPost}
                    handleDeletePost={handleDeletePost}
                    handleUpdate={handleUpdate}
                />
            ))}
        </div>
    );
}

    export default PostList;