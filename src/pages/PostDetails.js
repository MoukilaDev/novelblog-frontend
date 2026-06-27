import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../services/Postapi";
import { getCommentsByPostId } from "../services/Postapi";
import CommentItem from "../components/CommentItem";
import CommentForm from "../components/CommentForm";
import { useNavigate } from "react-router-dom";

function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Navigation hook
    const navigate = useNavigate();
    // New comment handler
    const onCommentCreated = (newComment) =>{
        setComments([...comments, newComment]);
    }

    const onCommentDeleted = (deletedComment) => {
        setComments(comments.filter(comment => comment.id !== deletedComment.id));
        console.log("comment deleted");
    }

    const onCommentUpdated =  (updatedComment) => {
        setComments(comments.map(comment => comment.id === updatedComment.id ? updatedComment : comment));
        console.log("comment updated");
    }
    
    
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
    }, [id]);//The id parameter means that the effect will re-run if the id changes, ensuring that the component fetches the correct post and comments when navigating to a different post.

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return <p>Loading post ...</p>;
    
    return (
        <div>
            <button onClick={() => navigate("/")}>
                Back to posts
            </button>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <h3>All Commments ({comments.length})</h3>
            {comments.map(comment =>(
                // Render each comment using the CommentItem component, passing necessary props for handling updates and deletions
                <CommentItem
                    comment={comment}
                    onCommentDeleted={onCommentDeleted}
                    onCommentUpdated={onCommentUpdated}
                />
            ))}
                
            <br/>
            <h3>Add new comment</h3>
            <CommentForm
                id={id}
                onCommentCreated={onCommentCreated}
            />
        </div>
    );
}

export default PostDetails;