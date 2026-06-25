import { updateComment } from "../services/Postapi";
import { useState } from "react";


function CommentItem({
    comment,
    handleDeleteComment,
    onCommentUpdated
}){  
    const [editingReaderName, setEditingReaderName] = useState('');
    const [editingContent, setEditingContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const handleEditComment = (comment) =>{
        setIsEditing(true);
        setEditingReaderName(comment.readerName);
        setEditingContent(comment.content);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedComment = await updateComment(comment.id,{
            readerName : editingReaderName,
            content : editingContent
         });
            setIsEditing(false);
            onCommentUpdated(updatedComment);
        }

        if (isEditing === true){
            return(
                <form onSubmit= {handleSubmit}>
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