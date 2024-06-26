import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from './contexts/UserContext';
import Gig from './Gig';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function DirectorPage({ onAddGig, onDeleteGig, onEditGig }) {
  const { user } = useContext(UserContext);
  const [myGigs, setMyGigs] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorData, setErrorData] = useState([]);
  const [startDateError, setStartDateError] = useState("")
  const [endDateError, setEndDateError] = useState("")
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/v1/gigs/${user.role_id}`)
      .then((r) => r.json())
      .then((object) => {
        setMyGigs(object);
        setLoading(false);
      });
  }, [user.role_id]);

  const handleEditMyGig = (gigObj) => {
    const updatedGigs = myGigs.map((myGig) =>
      myGig.id === gigObj.id ? gigObj : myGig
    );
    setMyGigs(updatedGigs);
  };

  const handleDeleteMyGig = (myGigId) => {
    const updatedMyGigs = myGigs.filter((myGig) => myGig.id !== myGigId);
    setMyGigs(updatedMyGigs);
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    const today = new Date().toISOString().split('T')[0];
    if (selectedStartDate < today) {
      setStartDateError("Start date cannot be in the past");
    } else {
      setStartDate(selectedStartDate);
      setStartDateError("")
    }
  };

  const handleEndDateChange = (e) => {
    const enteredDate = e.target.value;
  
    if (enteredDate < startDate) {
      setEndDateError("End date cannot be before start date");
    } else {
      setEndDate(enteredDate);
      setEndDateError("")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const gigData = {
      title: title,
      description: description,
      start_date: startDate,
      end_date: endDate,
    };

    fetch(`/api/v1/gigs/${user.role_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gigData),
    })
      .then((r) =>
        r.json().then((data) => {
          if (r.ok) {
            onAddGig(data);
            setMyGigs([...myGigs, data]);
            setIsClicked(false);
            setErrorData([]);
            setTitle("")
            setStartDate("")
            setEndDate("")
            setDescription("")
          } else {
            setErrorData(data.errors);
          }
        })
      );
  };

  return (
    <>
      <h2 style={{paddingBottom: "10px", paddingTop: "10px", paddingLeft: "10px"}}>Music Director Portal</h2>
      {!isClicked ? (
        <div style={{paddingLeft: "10px"}}><Button size="sm" onClick={handleClick}>Post a New Gig</Button></div>
      ) : 
      null}
      {isClicked ? 
      (
          <div className="centerform">
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-1" controlId="formBasicTitle">
              <Form.Label>Title:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Title"
                value={title}
                onChange={handleTitleChange}
                 />
            </Form.Group>
            <Form.Group className="mb-1" controlId="formBasicStartDate">
              <Form.Label>Start Date:</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
                 />
            </Form.Group>
            {startDateError ? (
        <ul style={{ color: 'red' }}>
          <li>{startDateError}</li>
        </ul>
      ) : null}
            <Form.Group className="mb-1" controlId="formBasicEndDate">
              <Form.Label>End Date:</Form.Label>
              <Form.Control 
                type="date" 
                placeholder="End Date"
                value={endDate}
                onChange={handleEndDateChange}
                 />
            </Form.Group>
            {endDateError ? (
        <ul style={{ color: 'red' }}>
          <li>{endDateError}</li>
        </ul>
      ) : null}
            <Form.Group className="mb-1" controlId="formBasicDescription">
              <Form.Label>Description:</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Description"
                value={description}
                onChange={handleDescriptionChange}
                 />
            </Form.Group>
            <Button size="sm"type="submit">Submit</Button>
            <Button size="sm" onClick={handleClick}>Cancel</Button>
          </Form>
        </div>
      ) : null}
      {errorData.length > 0 ? (
        <ul style={{ color: 'red' }}>
          {errorData.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      ) : null}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{paddingLeft: "10px", paddingTop: "10px"}}>
          <h3 style={{textAlign: 'center'}}>My Gigs</h3>
          {myGigs.map((myGig) => (
            <Gig
              key={myGig.id}
              myGig={myGig}
              onDeleteGig={onDeleteGig}
              onDeleteMyGig={handleDeleteMyGig}
              onEditGig={onEditGig}
              onEditMyGig={handleEditMyGig}
            />
          ))}
          </div>
      )}
    </>
  );
}

export default DirectorPage;

// import React, { useState, useContext, useEffect } from 'react'
// import { UserContext } from './contexts/UserContext';
// import Gig from './Gig'

// function DirectorPage({ onAddGig, onDeleteGig, onEditGig }) {

//     const {user} = useContext(UserContext);
//     const [myGigs, setMyGigs] = useState([])
//     const [isClicked, setIsClicked] = useState(false)
//     const [title, setTitle] = useState("")
//     const [description, setDescription] = useState("")
//     const [startDate, setStartDate] = useState("")
//     const [endDate, setEndDate] = useState("")
//     const [errorData, setErrorData] = useState([])

//     useEffect(() => {
//         fetch(`/api/v1/gigs/${user.role_id}`)
//         .then((r) => r.json())
//         .then(object => setMyGigs(object))
//     }, [])

//     const handleEditMyGig = (gigObj) => {
//         const updatedGigs = myGigs.map(myGig => (
//             myGig.id === gigObj.id ? gigObj : myGig ))
//           setMyGigs(updatedGigs)
//     }

//     const handleDeleteMyGig = (myGigId) => {
//         const updatedMyGigs = myGigs.filter(myGig => myGig.id !== myGigId)
//         setMyGigs(updatedMyGigs)
//     }

//     const handleClick = () => {
//         setIsClicked(!isClicked)
//     }

//     const handleTitleChange = (e) => {
//         setTitle(e.target.value)
//     }

//     const handleDescriptionChange = (e) => {
//         setDescription(e.target.value)
//     }

//     const handleStartDateChange = (e) => {
//         setStartDate(e.target.value)
//     }

//     const handleEndDateChange = (e) => {
//         setEndDate(e.target.value)
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault();
    
//         const gigData = {
//             title: title,
//             description: description,
//             start_date: startDate,
//             end_date: endDate
//         };
    
//         fetch(`/api/v1/gigs/${user.role_id}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(gigData)
//         })
//         .then((r) => r.json()
//             .then((data) => {
//                 if (r.ok) {
//                     onAddGig(data);
//                     setMyGigs([...myGigs, data]);
//                     setIsClicked(false);
//                     setErrorData([])
//                 } else {
//                     setErrorData(data.errors);
//                 }
//             })
//         )
//     };

//     return (
//         <>
//         <h1>Music Director Portal</h1>
//         {!isClicked ? <button onClick={handleClick}>Post a New Gig</button> : null}
//         {isClicked ?
//         <div>
//             <form onSubmit={handleSubmit}>
//                 Title:
//                 <input 
//                 type="text"
//                 name="title"
//                 value={title}
//                 onChange={handleTitleChange}
//                 /><br></br>
//                 Start Date:
//                 <input 
//                 type="date"
//                 name="startdate"
//                 value={startDate}
//                 onChange={handleStartDateChange}
//                 /><br></br>
//                 End Date:
//                 <input 
//                 type="date"
//                 name="enddate"
//                 value={endDate}
//                 onChange={handleEndDateChange}
//                 />
//                 <br></br>
//                 Description:
//                 <textarea 
//                 type="text"
//                 name="description"
//                 value={description}
//                 onChange={handleDescriptionChange}
//                 />
//                 <br></br>
//                 <button type="submit">Submit</button>
//                 </form>
//         </div>
//         : null
//         }
//         {errorData.length > 0 ? <ul style={{ color: "red" }}>
//           {errorData.map((error, i) => <li key={i}>{error}</li>)}
//         </ul> : null}
//         <h1>My Gigs</h1>
//         {myGigs.map(myGig => 
//             <Gig 
//                 key={myGig.id} 
//                 myGig={myGig} 
//                 onDeleteGig={onDeleteGig} 
//                 onDeleteMyGig={handleDeleteMyGig}
//                 onEditGig={onEditGig} 
//                 onEditMyGig={handleEditMyGig}
//             />
//         )}
//         </>
//     )
// }

// export default DirectorPage