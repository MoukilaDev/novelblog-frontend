import { updateComment } from "../services/Postapi";
import { deleteCommentById } from "../services/Postapi";
import { useState } from "react";

// component to display a single comment with edit and delete functionality
function CommentItem({
    comment,
    onCommentUpdated,
    onCommentDeleted
}){  
    const [isEditing, setIsEditing] = useState(false);
    const [editingReaderName, setEditingReaderName] = useState('');
    const [editingContent, setEditingContent] = useState('');
    const [commentDeleting, setCommentDeleting] = useState(false);
    // Function to handle the editing state of a comment
    const handleEditComment = (comment) =>{
        setIsEditing(true);
        setEditingReaderName(comment.readerName);
        setEditingContent(comment.content);
    }
    // Function to handle the delete button click
    const handleDeleteComment = async (commentId) =>{
        const confirmed = window.confirm("Are you sure ?")
            if (!confirmed) return;
                setCommentDeleting(true);
                try{
                    await deleteCommentById(commentId);
                    onCommentDeleted(comment);
                }catch(err){
                    console.error(err);
                    alert("Delete failed");
                }finally{
                    setCommentDeleting(false);
                }
    };
    // Function to handle the submission of an edited comment
    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedComment = await updateComment(comment.id,{
            readerName : editingReaderName,
            content : editingContent
         });
            setIsEditing(false);
            onCommentUpdated(updatedComment);
    }
        // Display a loading message while the comment is being deleted
        if(commentDeleting) return <p>Deleting comment ...</p>;
        // Display the edit form if the comment is in editing mode
        if (isEditing === true){
            return(
                <form onSubmit= {handleSubmit}>
                    <h5>Make your corrections</h5>
                        <div>
                            <input
                                    value ={editingReaderName}
                                    onChange ={(e) => setEditingReaderName(e.target.value)}
                                />
                                <textarea
                                    value ={editingContent}
                                    onChange ={(e) => setEditingContent(e.target.value)}
                                />
                                <button type ="submit">Save</button>   
                        </div>
                </form>
            );
        }

        return(
            <form onkey={comment.id}>
                <p><strong>{comment.readerName}</strong></p>
                <p>{comment.content}</p>
                <button onClick={() => handleEditComment(comment)}>Update</button>
                <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
            </form>
        )
    }
    export default CommentItem;