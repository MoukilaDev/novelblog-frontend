import {useParams} from "react-router-dom";  

function PostDetails(){
    const { id, content } = useParams();

return(
    <div>
        <h2>Post Details</h2>
        <p>Post ID: {id}</p>
        <p>Post content: {content}</p>
    </div>
)

}
export default PostDetails;