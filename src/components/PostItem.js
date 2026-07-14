import { Link } from "react-router-dom";
import { useState } from "react";
import { updatePost } from "../services/Postapi";
import { deletePost } from "../services/Postapi";

function PostItem({
    post,
    onPostDeleted,
    onPostUpdated,
}) 

{
    const [isEditing, setIsEditing] = useState(false);;
    const [editingTitle, setEditingTitle] = useState('');
    const [editingContent, setEditingContent] = useState('');
    // Editing post handler
    const handleEditPost = (post) => {
        setIsEditing(true);
        setEditingTitle(post.title);
        setEditingContent(post.content);
    }
    const handleUpdate = async (id) => {
        setIsUpdating(true);
        try {
            const updated = await updatePost(id, {
                title:  editingTitle,
                content: editingContent
            });
            // Update the local state with the new post data and reset the editing state
            onPostUpdated(updated);
            setIsEditing(false);
        } catch (err){
            console.error(err);
            alert("Update failed");
        } finally {
            setIsUpdating(false);
            console.log("Post updated");
        }
    }
    
    // State for action loading state (e.g., deleting or updating a post)
    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleDeletePost = async (id) =>{
        const confirmed = window.confirm("Are you sure ?")
            if (!confirmed) return;
            setIsDeleting(true);
            try{
                await deletePost(id);
                onPostDeleted(id)
            }catch(err){
                alert("Delete failed");
            }finally{
                setIsDeleting(false);
            }
        };

    if (isEditing){
        return(
            <div>
                <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                />
                <textarea
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                />
                <button onClick={() =>handleUpdate(post.id)}>
                    Save
                </button>

            </div>
        );
    }

    return(
            <div>
                <Link to={`/post/${post.id}`}>
                    <h3>{post.title}</h3>
                </Link>
                <p>{post.content}</p>
                <button onClick={ () => handleEditPost(post)}
                        disabled={isUpdating}>
                    {isUpdating ? "Updating..." : "Update"}
                </button>
                <button
                 onClick={() => handleDeletePost(post.id)}
                 disabled ={isDeleting}
                 >
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>
            </div>
    );
}

export default PostItem;