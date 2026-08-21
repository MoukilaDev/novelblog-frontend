import { useEffect, useState } from "react";
import { createPost } from "../services/Postapi";
import { getCategories } from "../services/Postapi";
import CategoryForm from "./CategoryForm";

function PostForm({ onPostCreated}){
    
    // State for the loading state
    const [loading, setLoading] =useState(true);
    // State for error handling
    const [error, setError] = useState(null);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    
    const handleNewPost = async (e) => {
        e.preventDefault();
        const newPost = {title, content};
        alert(selectedCategoryId);
        const createdPost = await createPost(newPost, selectedCategoryId);

        onPostCreated(createdPost);
        setTitle('');
        setContent('');
        alert("Post created successfully !");
        console.log("Post created !");

    };

    const onCategoryCreated =(category) =>{
        setCategories(previousCategories => [...previousCategories, category])
        setSelectedCategoryId(category.categoryId);
    }

    useEffect(() =>{
        getCategories()
            .then(data => {
                setCategories(data);
                console.log("Categories received:", data);})
            .catch(err => {
                console.error(err);
                setError("Failed to load categories");
            })
            .finally(()=> setLoading(false));
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    return(
        <div>
            <form onSubmit={handleNewPost}>
                <h2>Create your post</h2>
                <input
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <br/>
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <br/>
                
                <label>
                    Choose a category:
                    <select
                            value={selectedCategoryId}
                            onChange={(e) => setSelectedCategoryId(e.target.value)}>
                                {categories.map(category =>(
                                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                ))}
                    </select>
                </label>
                <br />
                <button type="submit">Create</button>
            </form>
            <CategoryForm
                    loading={loading}
                    error={error}
                    onCategoryCreated={onCategoryCreated}
            />
        </div>
        )
}
export default PostForm;