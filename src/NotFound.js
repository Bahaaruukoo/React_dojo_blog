import { Link } from 'react-router-dom';

const NotFound = () => {
    return ( 
        <div className="not-found">
            <h3>404 page not found</h3>
            <p> <Link to='/'>  go to home mage</Link> </p>
        </div>
     );
}
 
export default NotFound;