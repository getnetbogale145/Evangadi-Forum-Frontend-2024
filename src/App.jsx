// import "./App.css";
// import Gateway from "./Router";

// function App() {
//   return (
//     <>
//       <Gateway />
//     </>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter } from "react-router-dom";
import Gateway from "./Router";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Gateway />
    </BrowserRouter>
  );
}

export default App;
