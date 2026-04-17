import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../services/Postapi";

function PostDetails() {
    const { id } = useParams();

    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getPostById(id)
            .then(data => setPost(data))
            .catch(err => {
                console.error(err);
                setError("Failed to load post");
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p>Loading post...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </div>
    );
}

export default PostDetails;