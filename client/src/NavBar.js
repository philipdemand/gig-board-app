import React, { useContext } from 'react';
import { UserContext } from './contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const NavBar = () => {
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
    // <nav className="navbar">
    //   <div className="navbar-title" onClick={handleNavbarTitleClick}>Gig Board</div>
    //   {user ? (
    //     <div className="navbar-user">
    //       <span className="welcome-message">Welcome, {user.username}</span>
    //       <button className="logout-button" onClick={handleLogoutClick}>
    //         Logout
    //       </button>
    //     </div>
    //   ) : null}
    // </nav>
    <Navbar data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand onClick={handleNavbarTitleClick} href="#home">Gig-Board</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link> */}
            {/* <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          {/* </Nav> */}
        </Navbar.Collapse>
        {user ? (
        <div className="navbar-user">
          <span className="welcome-message">Welcome, {user.username}</span>
          <Button size="sm "className="logout-button" onClick={handleLogoutClick}>
            Logout
          </Button>
        </div>
      ) : null}
      </Container>
    </Navbar>
  );
};

export default NavBar;