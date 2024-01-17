import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { UserContext } from './contexts/UserContext'

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

  return (
    <div className="event">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} />
        </div>
        <div>
          <label htmlFor="confirmation">Confirm Password:</label>
          <input type="password" id="confirmation" value={passwordConfirmation} onChange={handlePassConfChange} />
        </div>
        <div>
          <label htmlFor="emailaddress">Email Address:</label>
          <input type="emailaddress" id="emailaddress" value={email} onChange={handleEmailChange} />
        </div>
        <div>
            <label htmlFor="roleSelect">Select Role:</label>
            <select id="roleSelect" value={role} onChange={handleRoleChange}>
                <option value="Select Role">Select Role</option>
                <option value="Musician">Musician</option>
                <option value="Director">Director</option>
            </select>
        </div>
        <button type="submit">Sign Up</button>
        {errorData.length > 0 ? <ul style={{ color: "red" }}>
          {errorData.map((error, i) => <li key={i}>{error}</li>)}
        </ul> : null}
      </form>
    </div>
  );
};

export default SignUpPage;