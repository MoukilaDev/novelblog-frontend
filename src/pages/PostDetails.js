import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../services/Postapi";
import { getCommentsByPostId } from "../services/Postapi";
import CommentItem from "./CommentItem";
import { createCommentById } from "../services/Postapi";
import { deleteCommentById } from "../services/Postapi";
import { useNavigate } from "react-router-dom";

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [readerName, setReaderName] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [commentDeleting, setCommentDeleting] = useState(false);
    // Navigation hook
    const navigate = useNavigate();
    // New comment handler
    const handleNewComment = async(e) =>{
        e.preventDefault();
        const newComment = {readerName, content};
            
        try{ const comment = await createCommentById(id, newComment);
        setComments([...comments, comment]);
        setReaderName('');
        setContent('');
        }catch(err){
            console.error(err);
            alert("Failed to create comment", err);
        }
    };

    const onCommentUpdated =  (updatedComment) => {
        setComments(comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment));
        console.log("comment updated")
    }
    
    const handleDeleteComment = async (commentId) =>{
        const confirmed = window.confirm("Are you sure ?")
            if (!confirmed) return;
            setCommentDeleting(true);
            try{
                await deleteCommentById(commentId);
                setComments(comments.filter(comment => comment.id !== commentId));
            }catch(err){
                console.error(err);
                alert("Delete failed");
            }finally{
                setCommentDeleting(false);
            }
    };
    // Fetch post and comments on component mount
    useEffect(() => {
        getPostById(id)
            .then(data => setPost(data))
            .catch(err => {
                console.error(err);
                setError("Failed to load post");
            })
        getCommentsByPostId(id)
            .then(data => setComments(data))
            .catch(err => {
                console.error(err);
                setError('Failed to load commments');
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return <p>Loading post ...</p>;
    if(commentDeleting) return <p>Deleting comment ...</p>;
    
    return (
        <div>
            <button onClick={() => navigate("/")}>
                Back to posts
            </button>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <h3>All Commments ({comments.length})</h3>
            {comments.map(comment =>(
                <CommentItem
                    comment={comment}
                    handleDeleteComment={handleDeleteComment}
                    onCommentUpdated={onCommentUpdated}
                />
            ))}
                
            <br/>
            <h3>Add new comment</h3>
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
        </div>
    );
}

export default PostDetails;