import { useState } from "react";
import { createPost } from "../services/Postapi";

function PostForm({ onPostCreated}){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleNewPost = async (e) => { e.preventDefault();
        const newPost = {title, content};
        const createdPost = await createPost(newPost);

        onPostCreated(createdPost);
        setTitle('');
        setContent('');
        alert("Post created successfully !");
        console.log("Post created !");

    };
    return(
        <form onSubmit={handleNewPost}>
            <h2>Create your post</h2>

            <input
                type="text"
                placeholder="Titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />

            <br />

            <textarea
                placeholder="Contenu"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <br />

            <button type="submit">Create</button>
        </form>)
}
export default PostForm;