import {useState} from "react";
import { createCommentById } from "../services/Postapi";

// Component for creating a new comment associated with a specific post
function CommentForm({
    id,
    onCommentCreated
}){
    const [readerName, setReaderName] = useState('');
    const [content, setContent] = useState('');
    // Function to handle the submission of a new comment
    const handleNewComment = async(e) =>{
        e.preventDefault();
        const newComment = {readerName, content};
        // Call the API to create a new comment for the specified post ID, then update the local state with the new comment and reset the form fields. 
        try{ 
            const comment = await createCommentById(id, newComment);
            onCommentCreated(comment);
            setReaderName('');
            setContent('');
        }catch(err){
            console.error(err);
            alert("Failed to create comment", err);
        }finally{
            console.log("Comment created !");
        }    
    };
        return(
            <form onSubmit={handleNewComment}>
                <input 
                        type="text"
                        placeholder = "enter your name"
                        value ={readerName}
                        onChange={(e)=> setReaderName(e.target.value)}
                        />
                        <br />
                        <input                     
                        type="text"
                        placeholder = "enter your comment"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                     />
                    <br />
                    <button type ="submit">Send</button>
            </form>   
        );
    }
export default CommentForm;