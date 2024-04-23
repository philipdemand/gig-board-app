import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './contexts/UserContext'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMounted, setIsMounted] = useState(true)
  const [errorData, setErrorData] = useState([])
  const navigate = useNavigate();

  const {setUser} = useContext(UserContext)

  useEffect(() => {
    return () => {
      setIsMounted(false);
    };
  }, []);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const submittedUser = {
      username: username,
      password: password,
    };

    try {
      const res = await fetch("/api/v1/login", {
        method: "POST",
        body: JSON.stringify(submittedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (isMounted) {
        if (res.ok) {
          const data = await res.json();
          setUser(data);

          setUsername("");
          setPassword("");

          if (data && data.role_type === "Musician") {
            navigate("/musician");
          } else {
            navigate("/director");
          }
        } else {
          const errorData = await res.json();
          setErrorData(errorData.errors);
        }
      }
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  }

  const handleSwitch = () => {
    navigate("/signup")
  }

  return (
    <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
    <Card style={{ width: '300px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="event">
      <Card.Text style={{ color: '#007bff', textAlign: 'center' }}>Become a member</Card.Text>
      <Button size="sm" onClick={handleSwitch} style={{ marginBottom: '10px', width: '100%' }}>Signup</Button>
      <Card.Title style={{ textAlign: 'center' }}>Login</Card.Title>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} className="form-control" />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} className="form-control" />
        </div>
        <Button size="sm" type="submit" style={{ width: '100%' }}>Login</Button>
        {errorData.length > 0 ? <ul style={{ color: 'red', marginTop: '10px', listStyleType: 'none', padding: 0 }}>
          {errorData.map((error, i) => <li key={i}>{error}</li>)}
        </ul> : null}
      </form>
    </Card>
    </div>
  );
};

export default LoginPage;