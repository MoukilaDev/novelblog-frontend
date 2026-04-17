const API_URL = "http://localhost:8080/api/posts";


export const getPosts = async() =>{
    const response = await fetch(API_URL);
    
    return response.json();
};

export const getPostById = async (id) =>{
    const response = await fetch(`${API_URL}/${id}`);

    return response.json();
}

export const createPost = async (post) =>{
    const response =  await fetch(API_URL,{
        method: 'POST',
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(post)
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

export const updatePost  = async (id, post) =>{
    const response = await fetch(`${API_URL}/${id}`,{
        method: 'PUT',
        headers:{"content-type" : "application/json"},
        body: JSON.stringify(post)
    });

    return response.json();   
};
