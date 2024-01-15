import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data);
          if (data && data.role_type === "Musician") {
            navigate("/musician");
          } else {
            navigate("/director");
          }
        } else {
          setUser(null);
          navigate("/");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data:", error.message);
      }
    };
    fetchData();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };

// import React, { useState, useEffect, createContext } from "react";
// import { useNavigate } from 'react-router-dom';

// const UserContext = createContext();

// function UserProvider({ children }) {
  
//   const [user, setUser] = useState(null);
  
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("/me").then((res) => {
//       if (res.ok) {
//         res.json().then((data) => setUser(data));
//         if (user && user.role_type === "Musician") {
//             navigate("/musician") 
//         } else {
//             navigate("/director") 
//         }
//       } else {
//         setUser(null);
//         navigate("/");
//       }
//     });
//   }, []);

//   return <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>;
// }

// export { UserContext, UserProvider };