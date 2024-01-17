import React, { useState, useContext } from 'react'
import { UserContext } from './contexts/UserContext';
import './Gig.css';

function GigPost({ gig, onAddApp, onDeleteApp }) {

    const {user} = useContext(UserContext);
    const [isClicked, setIsClicked] = useState(false)
    const [message, setMessage] = useState('')
    const [errorData, setErrorData] = useState([])

    const handleClick = () => {
        setIsClicked(!isClicked)
    }

    const handleChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const postData = {
            gig_id: gig.id,
            message: message,
            status: "PENDING"
        }
        fetch(`/api/v1/applications/${user.role_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
        .then((r) => r.json()
            .then((data) => {
                if (r.ok) {
                    onAddApp(data)
                    setIsClicked(false)
                    setErrorData([])
                } else {
                    setErrorData(data.errors)
                }
            })
        ) 
    }

    const handleCancelClick = async () => {
        try {
            const response = await fetch(`/api/v1/applications/${gig.app_id}`, {
                method: "DELETE"
            });
            if (!response.ok) {
                throw new Error(`Failed to cancel application. Status: ${response.status}`);
            }
            const responseBody = await response.text();
            if (responseBody.trim() !== "") {
                console.error("Unexpected response body:", responseBody);
            }
    
            onDeleteApp(gig.app_id);
        } catch (error) {
            console.error("Error canceling application:", error.message);
            setErrorData(["An error occurred while canceling the application. Please try again."]);
        }
    };

    return (
        <div className="gig-container">
        <h3>{gig.title}</h3>
        Start Date: {gig.start_date}
        <h3>{gig.description}</h3>
        {gig.application_status 
            ? <><h4>Application: {gig.application_status}</h4> <button onClick={handleCancelClick}>Cancel Application</button></>
            : <button onClick={handleClick}>Apply</button>}
        {isClicked ?
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                name="message"
                value={message}
                onChange={handleChangeMessage}
                />
                <button type="submit">Submit</button>
            </form>
        : null
        }
        {errorData ? <ul style={{ color: "red" }}>
            {errorData.map((error, i) => <li key={i}>{error}</li>)}
        </ul> : null}
        </div>
    )
}

export default GigPost