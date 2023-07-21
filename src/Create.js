import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('yoshi');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const blog = {title, body, author };
        setIsPending(true);
        const url = 'http://localhost:8000/blogs/';
        
        fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog)
        }).then((res) => {
            setIsPending(false)
            return res.json()
        }).then((data)=>{
            console.log(data);
            history.push(`/blogs/${data.id}`)
        })
    }
    return (
        <div className="create">
            <h2>Add a New Blog</h2>
            <form onSubmit={ handleSubmit }>
                <label>Blog title:</label>
                <input 
                    type="text" 
                    required
                    value = {title}
                    onChange = {(e)=> setTitle(e.target.value) }
                />
                <label>Blog Body: </label>
                <textarea 
                    required
                    value={body}
                    onChange={e=>setBody(e.target.value)}
                ></textarea>
                <label>Blog Author: </label>
                <select
                    value={author}
                    onChange={ e => setAuthor(e.target.value)}
                >
                    <option value="mario">mario</option>
                    <option value="yoshi">yoshi</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button>Adding new blog...</button>}
                <p>{title} </p>
                <p>{body } </p>
                <p>{author } </p>
            </form>
        </div>
    );
}

export default Create; 