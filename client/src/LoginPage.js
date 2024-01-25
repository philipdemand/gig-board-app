import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './contexts/UserContext'

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
    <div className="event">
      <h3>Become a member</h3><button onClick={handleSwitch}>Signup</button>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button type="submit">Login</button>
        {errorData.length > 0 ? <ul style={{ color: "red" }}>
          {errorData.map((error, i) => <li key={i}>{error}</li>)}
        </ul> : null}
      </form>
    </div>
  );
};

export default LoginPage;