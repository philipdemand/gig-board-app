import React from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function LandingPage() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        // background: 'linear-gradient(to bottom, #ffffff, #f8f9fa)', // Example gradient background
      }}
    >
      <Card style={{ width: '300px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
          <Card.Title style={{ color: '#007bff' }}>Welcome to Gig Board</Card.Title>
          <Card.Text>Please select an option below:</Card.Text>
          <div style={{ marginBottom: '10px' }}>
            <Link to="/login">
              <Button size="sm" variant="primary">Login</Button>
            </Link>
          </div>
          <div>
            <Link to="/signup">
              <Button size="sm" variant="secondary">Create Account</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  )
}

export default LandingPage