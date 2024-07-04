// import React from 'react'
// import Question from '../../Components/Question/Question'

// function Home() {
//   return (
//         <>
//             <Question />
//         </>
//   )
// }

// export default Home

import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppState } from "../App";

function Home() {
  const { user, setUser } = useContext(AppState);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUser({});
    navigate("/login");
  }

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      {/* Logout Button */}
      <button onClick={logout}>Logout</button>

      {/* Navigation Links */}
      <ul>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;
