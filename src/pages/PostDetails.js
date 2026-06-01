import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../services/Postapi";
import { getCommentsByPostId } from "../services/Postapi";
import { createCommentById } from "../services/Postapi";
import { useNavigate } from "react-router-dom";

function PostDetails() {
    const { id } = useParams();
    /// Navigation hook
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [readerName, setReaderName] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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
    }, [id]);

    if (loading) return <p>Loading ...</p>;
    if (error) return <p>{error}</p>;
    if (!post) return <p>Loading post ...</p>;

    return (<div>
            <button onClick={() => navigate("/")}>
                Back to posts
            </button>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <h3>All Commments</h3>
            {comments.map(comment =>(
                <div key={comment.id}>
                    <p><strong>{comment.readerName}</strong></p>
                    <p>{comment.content}</p>
                </div>
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