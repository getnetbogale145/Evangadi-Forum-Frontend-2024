// import React, { createContext, useEffect, useState } from "react";

// import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
// import Landing from "./Pages/Landing/Landing";
// import axios from "./Utility/axios";
// import Home from "./Pages/Home/Home";
// import AskQUestion from "./Components/AskQuestion/AskQUestion";
// import Detail from "./Components/Details/Detail";
// import { AnimatePresence } from "framer-motion";
// import NotFound from "./Pages/NotFound/NotFound";
// import Updatepass from "./Components/Authentication/UpdatePass";


// export const AppState = createContext();

// function Gateway() {
//   const [user, setUser] = useState({});
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const location = useLocation();
//   // console.log(token)

//   async function checkUserValidity() {
//     try {
//       const { data } = await axios.get(`/users/check`, {
//         headers: {
//           Authorization: "Bearer " + token,
//         },
//       });

//       // console.log(data)
//       setUser(data);
//     } catch (error) {
//       console.log(error.response.data);
//       setUser(error.response.data);
//       navigate("/");
//     }
//   }

//   useEffect(() => {
//     checkUserValidity();
//   }, []);

//   return (
//     <AppState.Provider value={{ user, setUser }}>
//       <AnimatePresence>
//         <Routes location={location} key={location.pathname}>
//           <Route path="/" element={<Landing />} />
//           <Route path="/home" element={<Home />} />
//           <Route path="/question" element={<AskQUestion />} />
//           <Route path="/home/:answerdetail" element={<Detail />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </AnimatePresence>
//     </AppState.Provider>
//   );
// }

// export default Gateway;


import React, { createContext, useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import axios from "./Utility/axios";
import Home from "./Pages/Home/Home";
import AskQuestion from "./Components/AskQuestion/AskQuestion";
import Detail from "./Components/Details/Detail";
import { AnimatePresence } from "framer-motion";
import NotFound from "./Pages/NotFound/NotFound";
import UpdatePass from "./Components/Authentication/UpdatePass";
import SignIn from "./Components/Authentication/SignIn";
import SignUp from "./Components/Authentication/SignUp";
import Reset from "./Components/Authentication/Reset";

export const AppState = createContext();

function Gateway() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();

  async function checkUserValidity() {
    try {
      const { data } = await axios.get(`/users/check`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      setUser(data);
    } catch (error) {
      console.log(error.response.data);
      setUser(error.response.data);
      navigate("/");
    }
  }

  useEffect(() => {
    if (token) {
      checkUserValidity();
    } else {
      navigate("/");
    }
  }, [token]);

  return (
    <AppState.Provider value={{ user, setUser }}>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/question" element={<AskQuestion />} />
          <Route path="/home/:answerdetail" element={<Detail />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/forgot-password" element={<Reset />} />
          <Route path="/reset/update" element={<UpdatePass />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </AppState.Provider>
  );
}

export default Gateway;
