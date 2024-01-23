import React, { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  function handleLogoutClick() {
    fetch("/api/v1/logout", { method: "DELETE" })
      .then((r) => {
        if (r.ok) {
          setUser(null);
        }
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout failed:", error.message);
      });
  }

  const handleNavbarTitleClick = () => {
    if (!user) {
      navigate("/");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title" onClick={handleNavbarTitleClick}>Gig Board</div>
      {user ? (
        <div className="navbar-user">
          <span className="welcome-message">Welcome, {user.username}</span>
          <button className="logout-button" onClick={handleLogoutClick}>
            Logout
          </button>
        </div>
      ) : null}
    </nav>
  );
};

export default Navbar;