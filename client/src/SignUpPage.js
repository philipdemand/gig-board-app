import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './contexts/UserContext'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [role, setRole] = useState("")
  const [email, setEmail] = useState("")
  const [errorData, setErrorData] = useState([])
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePassConfChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
        email,
        role_type: role,
      }),
    })
      .then((r) => {
        if (r.ok) {
          return r.json();
        } else {
          r.json().then((err) => setErrorData(err.errors));
        }
      })
      .then((user) => {
        setUser(user);
        if (user.role_type === "Musician") {
          navigate("/musician");
        } else {
          navigate("/director");
        }
      })
      .catch((error) => {
        console.error("Signup failed:", error);
      });
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSwitch = () => {
    navigate("/login")
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Card style={{ width: '300px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="event">
        <Card.Text style={{ color: '#007bff', textAlign: 'center', marginTop: '10px' }}>Already a member?</Card.Text>
        <Button size="sm" onClick={handleSwitch} style={{ marginBottom: '10px', width: '100%' }}>Login</Button>
        <Card.Title style={{ textAlign: 'center' }}>Sign Up</Card.Title>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" value={username} onChange={handleUsernameChange} className="form-control" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" value={password} onChange={handlePasswordChange} className="form-control" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="confirmation">Confirm Password:</label>
            <input type="password" id="confirmation" value={passwordConfirmation} onChange={handlePassConfChange} className="form-control" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="emailaddress">Email Address:</label>
            <input type="email" id="emailaddress" value={email} onChange={handleEmailChange} className="form-control" />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="roleSelect">Select Role:</label>
            <select id="roleSelect" value={role} onChange={handleRoleChange} className="form-control">
              <option value="">Select Role</option>
              <option value="Musician">Musician</option>
              <option value="Director">Director</option>
            </select>
          </div>
          <Button size="sm" type="submit" style={{ width: '100%' }}>Sign Up</Button>
          {errorData.length > 0 ? <ul style={{ color: 'red', marginTop: '10px', listStyleType: 'none', padding: 0 }}>
            {errorData.map((error, i) => <li key={i}>{error}</li>)}
          </ul> : null}
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;