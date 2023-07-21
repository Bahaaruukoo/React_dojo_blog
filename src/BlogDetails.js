import { useHistory, useParams } from 'react-router-dom';
import useFetch from './useFetch';

const BlogDetails = () => {
    const { id } = useParams();
    const {data:blogs, isPending, error}  = useFetch('http://localhost:8000/blogs/' + id);
    const history = useHistory();

    const deleteHandler = (id) => {
        fetch('http://localhost:8000/blogs/' + id, { method : 'DELETE'})
        .then(res => {
            console.log('deleted')
            history.push('/')
        });
    }
    return (
        <div className="blog-details">
           { isPending && <p>Loading...</p>}
           { error && {error} }
           { blogs && (
            <article>
                <h2> {blogs.title} </h2>
                <p>Written by {blogs.author} </p>
                <p> {blogs.body} </p>
                <button onClick={()=>deleteHandler(blogs.id)}>Delete blog</button>
            </article>
           )}
        </div>
     );
}
 
export default BlogDetails;