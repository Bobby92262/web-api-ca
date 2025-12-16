import { useContext } from "react";
import { AuthContext } from '../contexts/authContext';
import { Link } from "react-router";

const StartPage = () => {
    const context = useContext(AuthContext);
  
    return context.isAuthenticated ? (
        <p>
            Welcome <strong>{context.userName} </strong>! View your <Link to="/profile">Profile</Link> or start exploring <Link to="/"> Movies</Link>.
        </p>
    ) : (
        <p>
            <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to create an account!
        </p>
    );
  };

export default StartPage;

