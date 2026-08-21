const API_URL = "http://localhost:8080/api/posts";
const API_CATEGORY_URL = "http://localhost:8080/api/Categories";


export const getPosts = async() =>{
    const response = await fetch(`${API_URL}`);
    
    return response.json();
};

export const getCategories = async() =>{
    const response = await fetch(`${API_CATEGORY_URL}`);

    return response.json();
}

export const getPostById = async (id) =>{
    const response = await fetch(`${API_URL}/${id}`);

    return response.json();
}

export const getCommentsByPostId =  async (id) =>{
    const response = await fetch(`${API_URL}/${id}/comments`);

    return response.json();
}

export const createCategory = async (category) =>{
    const response =  await fetch(`${API_CATEGORY_URL}`,{
        method: 'POST',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(category)
    });
    return response.json();
}

export const createPost = async (post, categoryId) =>{
    const response =  await fetch(`${API_URL}/post/${categoryId}`,{
        method: 'POST',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(post)
    });
    
    return response.json();
};

export const createCommentById = async (postId, comment) => {
    const response = await fetch(`${API_URL}/${postId}/comments`,{
        method : 'POST',
        headers : {
            "content-type" : "application/json"
        },  
        body : JSON.stringify(comment)
    });
    if (!response.ok) {
        const message = await response.text();
        throw new Error(message);
    }
    return response.json();
}

export const updatePost  = async (id, post) =>{
    console.log(id);
    const response = await fetch(`${API_URL}/${id}`,{
        method: 'PUT',
        headers:{"content-type" : "application/json"},
        body: JSON.stringify(post)
    });

    return response.json();   
};

export const updateComment = async (commentId, comment) => {
    const response = await fetch(`${API_URL}/${commentId}/comments`,{
        method : 'PUT',
        headers : {"content-type" : "application/json"},
        body : JSON.stringify(comment)
    });

    return response.json();
};

export const deletePost = async (id) =>{
    const response =await fetch(`${API_URL}/${id}`,{method : 'DELETE'});
    // Checking the response
    if (!response.ok) {
    console.error("Delete failed");
    }
};

export const deleteCommentById  = async(commentId) =>{
    const response = await fetch(`${API_URL}/${commentId}/comments`,{method : 'DELETE'});
    // Checking the response
    if (!response.ok) {
    console.error("Delete failed");
    }
};