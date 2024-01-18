import React, { useContext, useState, useEffect } from 'react'
import NavBar from './NavBar';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext'
import LoginPage from './LoginPage'
import SignUpPage from './SignUpPage'
import LandingPage from './LandingPage'
import MusicianPage from './MusicianPage'
import DirectorPage from './DirectorPage'

function App() {

  const {user} = useContext(UserContext);
  const [gigs, setGigs] = useState([])

  useEffect(() => {
    fetch("/api/v1/gigs")
    .then((r) => r.json())
    .then(object => setGigs(object))
  }, [])

  const handleAddGig = (gigObj) => {
    setGigs([...gigs, gigObj])
  }

  const handleDeleteGig = (gigId) => {
    const updatedGigs = gigs.filter(gig => gig.id !== gigId)
    setGigs(updatedGigs)
  }

  const handleEditGig = (gigObj) => {
    const updatedGigs = gigs.map(gig => (
      gig.id === gigObj.id ? gigObj : gig ))
    setGigs(updatedGigs)
  }

  return (
    <>
      <NavBar />
      {!user ? (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    ) : (
      <Routes>
        <Route path="/musician" element={<MusicianPage gigs={gigs}/>} />
        <Route path="/director" element={<DirectorPage onDeleteGig={handleDeleteGig} onAddGig={handleAddGig} onEditGig={handleEditGig}/>} />
      </Routes>
    )}
    </>
  );
}

export default App;
