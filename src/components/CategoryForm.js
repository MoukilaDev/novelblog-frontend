import { useState } from "react";
import { createCategory } from "../services/Postapi";


function CategoryForm({
    onCategoryCreated,
    loading,
    error}){
    // State for the name input
    const [categoryName, SetCategoryName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newCategory = {categoryName}
        const createdCategory = await createCategory(newCategory);

        onCategoryCreated(createdCategory);

        SetCategoryName('');
        alert("category created successfully !");

    }
    if (loading) return <p>Loading...</p>
    if (error) return <p>{error}</p>

    return(
        <form onSubmit={handleSubmit}>
            <h2>Create a category</h2>
            <input
                type="text"
                value={categoryName}
                onChange={(e)=> SetCategoryName(e.target.value)}
            />
            <button type="submit">create</button>
        </form>
    )

}
export default CategoryForm;