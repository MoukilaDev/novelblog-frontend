import { useEffect, useState } from "react";
import { getPosts } from "../services/Postapi";
import PostForm from "../components/PostForm";
import { deletePost } from "../services/Postapi";
import { updatePost } from "../services/Postapi";

function  PostList(){

    // State for editing posts
    const [posts, setPosts] = useState([]);
    // New post handler
    const handleNewPost = (post) => {setPosts([...posts, post])};
    // Delete post handler
    const handleDeletePost = async (id) =>{
        await deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
    };

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
    // Update post handler
        /*
            * Call the API to update the post, then update the local state with the new post data and reset the editing state.
            * @param {number} id - The ID of the post being updated.
            * @return {void}
        */
    const handleUpdate = async (id) => {
        const updated = await updatePost(id, {
            title:  editingTitle,
            content: editingContent
        });
        setPosts(posts.map(post => post.id === id ? updated : post));
        setEditingPostId(null);
    }
    
 
    useEffect(() => {
        getPosts().then(data => setPosts(data));
    }, []);

    return (
        <div>
            <h2>Liste des posts</h2>

            <PostForm onPostCreated={handleNewPost} />

            {posts.map(post => (
                <div key={post.id}>

                    {editingPostId === post.id ? (
                        <div>
                            <input
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                            />

                            <textarea
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                            />

                            <button onClick={() => handleUpdate(post.id)}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.content}</p>

                            <button onClick={() => handleEditPost(post)}>
                                Edit
                            </button>

                            <button onClick={() => handleDeletePost(post.id)}>
                                Delete
                            </button>
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
}

    export default PostList;