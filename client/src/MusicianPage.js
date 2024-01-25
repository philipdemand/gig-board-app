import React, { useState, useEffect, useContext } from 'react';
import GigPost from './GigPost';
import { UserContext } from './contexts/UserContext';

function MusicianPage({ gigs }) {
  const { user } = useContext(UserContext);
  const [myApps, setMyApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredGigs, setFilteredGigs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleAddApp = (appObject) => {
    setMyApps([...myApps, appObject]);
  };

  const handleDeleteApp = (appId) => {
    const updatedApps = myApps.filter((app) => app.id !== appId);
    setMyApps(updatedApps);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const gigsWithStatusAndAppId = Array.isArray(gigs)
      ? gigs.map((gig) => {
          const application = myApps.find((app) => app.gig_id === gig.id);
          const applicationStatus = application ? application.status : null;
          const appId = application ? application.id : null;

          return { ...gig, application_status: applicationStatus, app_id: appId };
        })
      : [];

    const filterGigs = () => {
      const currentDate = new Date().toISOString().split('T')[0];

      switch (selectedCategory) {
        case 'pending':
          return gigsWithStatusAndAppId.filter((gig) => gig.application_status === 'PENDING');
        case 'accepted':
          return gigsWithStatusAndAppId.filter((gig) => gig.application_status === 'ACCEPTED');
        case 'rejected':
          return gigsWithStatusAndAppId.filter((gig) => gig.application_status === 'REJECTED');
        case 'notApplied':
          return gigsWithStatusAndAppId.filter((gig) => !gig.application_status);
        case 'past':
          return gigsWithStatusAndAppId.filter((gig) => gig.end_date && gig.end_date < currentDate);
        default:
          return gigsWithStatusAndAppId.filter((gig) => !gig.end_date || gig.end_date >= currentDate);
      }
    };

    setFilteredGigs(filterGigs());
  }, [selectedCategory, gigs, myApps]);

  useEffect(() => {
    fetch(`/api/v1/myapps/${user.role_id}`)
      .then((r) => r.json())
      .then((object) => {
        setMyApps(object);
        setLoading(false);
      });
  }, [user.role_id]);

  return (
    <>
      <h1>Musician Portal</h1>
      <h2>Gigs</h2>
      <div className="category-buttons">
        <button onClick={() => handleCategoryToggle('all')}>All Current Gigs</button>
        <button onClick={() => handleCategoryToggle('pending')}>Pending</button>
        <button onClick={() => handleCategoryToggle('accepted')}>Accepted</button>
        <button onClick={() => handleCategoryToggle('rejected')}>Rejected</button>
        <button onClick={() => handleCategoryToggle('notApplied')}>Not Applied</button>
        <button onClick={() => handleCategoryToggle('past')}>Past Gigs</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        filteredGigs.map((gig) => (
          <GigPost
            key={gig.id}
            gig={gig}
            onAddApp={handleAddApp}
            onDeleteApp={handleDeleteApp}
          />
        ))
      )}
    </>
  );
}

export default MusicianPage;

// import React, { useState, useEffect, useContext } from 'react';
// import GigPost from './GigPost';
// import { UserContext } from './contexts/UserContext';

// function MusicianPage({ gigs }) {
//   const { user } = useContext(UserContext);
//   const [myApps, setMyApps] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filteredGigs, setFilteredGigs] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   const handleAddApp = (appObject) => {
//     setMyApps([...myApps, appObject]);
//   };

//   const handleDeleteApp = (appId) => {
//     const updatedApps = myApps.filter((app) => app.id !== appId);
//     setMyApps(updatedApps);
//   };

//   const handleCategoryToggle = (category) => {
//     setSelectedCategory(category);
//   };

//   useEffect(() => {
//     const gigsWithStatusAndAppId = Array.isArray(gigs)
//       ? gigs.map((gig) => {
//           const application = myApps.find((app) => app.gig_id === gig.id);
//           const applicationStatus = application ? application.status : null;
//           const appId = application ? application.id : null;

//           return { ...gig, application_status: applicationStatus, app_id: appId };
//         })
//       : [];

//     const filterGigs = () => {
//       switch (selectedCategory) {
//         case 'pending':
//           return gigsWithStatusAndAppId.filter((gig) => gig.application_status === 'PENDING');
//         case 'accepted':
//           return gigsWithStatusAndAppId.filter((gig) => gig.application_status === 'ACCEPTED');
//         case 'rejected':
//           return gigsWithStatusAndAppId.filter((gig) => gig.application_status === 'REJECTED');
//         case 'notApplied':
//           return gigsWithStatusAndAppId.filter((gig) => !gig.application_status);
//         default:
//           return gigsWithStatusAndAppId;
//       }
//     };

//     setFilteredGigs(filterGigs());
//   }, [selectedCategory, gigs, myApps]);

//   useEffect(() => {
//     fetch(`/api/v1/myapps/${user.role_id}`)
//       .then((r) => r.json())
//       .then((object) => {
//         setMyApps(object);
//         setLoading(false);
//       });
//   }, [user.role_id]);

//   return (
//     <>
//       <h1>Musician Portal</h1>
//       <h2>Gigs</h2>
//       <div className="category-buttons">
//         <button onClick={() => handleCategoryToggle('all')}>All Gigs</button>
//         <button onClick={() => handleCategoryToggle('pending')}>Pending</button>
//         <button onClick={() => handleCategoryToggle('accepted')}>Accepted</button>
//         <button onClick={() => handleCategoryToggle('rejected')}>Rejected</button>
//         <button onClick={() => handleCategoryToggle('notApplied')}>Not Applied</button>
//       </div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         filteredGigs.map((gig) => (
//           <GigPost
//             key={gig.id}
//             gig={gig}
//             onAddApp={handleAddApp}
//             onDeleteApp={handleDeleteApp}
//           />
//         ))
//       )}
//     </>
//   );
// }

// export default MusicianPage;