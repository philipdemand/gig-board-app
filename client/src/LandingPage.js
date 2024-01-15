import React from 'react'
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="event">
      <h2>Welcome to Gig Board</h2>
      <p>Please select an option below:</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <div>
        <Link to="/signup">
          <button>Create Account</button>
        </Link>
      </div>
    </div>
    )
}

export default LandingPage