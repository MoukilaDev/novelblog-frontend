
function PostItem({
    post,
    editingPostId,
    editingTitle,
    editingContent,
    setEditingTitle,
    setEditingContent,
    handleEditPost,
    handleDeletePost,
    handleUpdate
}) {
    if (editingPostId === post.id){
        return(
            <div>
                <input
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)} 
                />
                <textarea 
                    value={editingContent}
                    onChange={(e) => setEditingContent(e.target.value)}
                />
                <button onClick={() =>handleUpdate(post.id)}>
                    Save
                </button>

            </div>
        );
    }

    return(
            <div>
                <h3>{post.title}</h3>
                <p>{post.content}</p>

                <button onClick={ () => handleEditPost(post)}>
                    Edit
                </button>
                <button onClick={() => handleDeletePost(post.id)}>
                    Delete
                </button>
            </div>
    );
}

export default PostItem;