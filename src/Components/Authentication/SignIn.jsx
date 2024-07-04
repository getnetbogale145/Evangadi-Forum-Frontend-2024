// import React, { useContext, useEffect, useRef, useState } from "react";
// import AuthStyle from "./classes.module.css";
// import { SignContext } from "../State/State";
// import { stateType } from "../../Utility/reducer";
// import axios from "../../Utility/axios";
// import { useNavigate } from "react-router-dom";
// import { ThreeDots } from "react-loader-spinner";

// // const baseUrl = `http://localhost:5500/api`;

// function SignIn() {
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [process, setProcess] = useState(false);
//   const [{ signstate }, dispatch] = useContext(SignContext);
//   const email = useRef(null);
//   const password = useRef(null);
//   const [errMessage, setErrorMessage] = useState(false);
//   const navigate = useNavigate();

//   const handleSignState = () => {
//     dispatch({
//       type: stateType.SIGN_UP,
//     });
//   };

//   const handleRESET = () => {
//     dispatch({
//       type: stateType.RESET,
//     });
//   };

//   const [isAnimating, setIsAnimating] = useState(true);

//   useEffect(() => {
//     // Remove the animation class after the animation duration
//     const timer = setTimeout(() => {
//       setIsAnimating(false);
//     }, 1000); // 1000ms = 1s, match this duration with your animation duration

//     return () => clearTimeout(timer);
//   }, []);

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

//   async function handleSubmit(event) {
//     event.preventDefault();

//     const emailVal = email.current.value;
//     const passVal = password.current.value;

//     // console.log(emailVal)

//     if (!emailVal) {
//       // alert('please email')
//       // console.log(emailVal.current)
//       email.current.style.border = "0.5px solid red";
//       return;
//     } else if (!passVal) {
//       password.current.style.border = "0.5px solid red";
//       // alert('please pass')
//       return;
//     }
//     setProcess(true);
//     try {
//       const { data } = await axios.post(`/users/login`, {
//         email: emailVal,
//         password: passVal,
//       });

//       //  console.log(data.msg)
//       console.log('Login response data:', data); // Debugging line

//       //  alert('successfully login')
//       localStorage.setItem("token", data.token);
//       // console.log(data)
//       // navigate('/home')
//       setTimeout(() => {
//         navigate("/home");
//         window.location.reload();
//         setProcess(false);
//       }, 2000);
//       //  navigate('/home')
//     } catch (error) {
//       //  alert(`${error?.response?.data?.msg} `)
//       // console.log(`${error?.response?.data?.msg}`)/
//       setProcess(false);
//       setErrorMessage(error?.response?.data?.msg);
//     }
//   }

//   return (
//     <div className={AuthStyle.form_container}>
//       <div className={`${isAnimating ? AuthStyle.slidein : ""}`}>
//         <form action="" onSubmit={handleSubmit}>
//           <div className={AuthStyle.Atitle}>
//             <p>Log in to your Account</p>
//             <p>
//               {" "}
//               Don't have an account?{" "}
//               <span onClick={handleSignState}>Create a new account</span>{" "}
//             </p>
//           </div>

//           {errMessage && (
//             <div className={AuthStyle.error_message}>
//               You entered the wrong username or password.
//             </div>
//           )}

//           <div>
//             <input type="email" name="email" ref={email} placeholder="Email" />
//           </div>

//           <div className={AuthStyle.password_toggle_container}>
//             <input
//               type={passwordVisible ? "text" : "password"}
//               placeholder="Password"
//               ref={password}
//               name="password"
//             />

//             <span
//               className={`fa ${passwordVisible ? "fa-eye" : "fa-eye-slash"}  ${
//                 AuthStyle.pwd_toggle
//               }`}
//               onClick={togglePasswordVisibility}
//               aria-hidden="true"
//             ></span>
//           </div>

//           {process && (
//             <ThreeDots
//               visible={true}
//               height="40"
//               width="40"
//               color="#516CF0"
//               radius="6"
//               ariaLabel="three-dots-loading"
//               wrapperStyle={{}}
//               wrapperClass={AuthStyle.ThreeDotsCenter}
//             />
//           )}

//           <div className={AuthStyle.btn_container}>
//             <button type="submit">Submit</button>
//             <div className={AuthStyle.forgot_outer_container}>
//               <div className={AuthStyle.forgot} onClick={handleRESET}>
//                 Forgot Password?
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignIn;



// routing
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthStyle from "./classes.module.css";
import { SignContext } from "../State/State";
import { stateType } from "../../Utility/reducer";
import axios from "../../Utility/axios";
import { useNavigate, Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";

function SignIn() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [process, setProcess] = useState(false);
  const [{ signstate }, dispatch] = useContext(SignContext);
  const email = useRef(null);
  const password = useRef(null);
  const [errMessage, setErrorMessage] = useState(false);
  const navigate = useNavigate();

  const handleSignState = () => {
    dispatch({
      type: stateType.SIGN_UP,
    });
  };

  const handleRESET = () => {
    dispatch({
      type: stateType.RESET,
    });
  };

  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    // Remove the animation class after the animation duration
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1000); // 1000ms = 1s, match this duration with your animation duration

    return () => clearTimeout(timer);
  }, []);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  async function handleSubmit(event) {
    event.preventDefault();

    const emailVal = email.current.value;
    const passVal = password.current.value;

    if (!emailVal) {
      email.current.style.border = "0.5px solid red";
      return;
    } else if (!passVal) {
      password.current.style.border = "0.5px solid red";
      return;
    }
    setProcess(true);
    try {
      const { data } = await axios.post(`/users/login`, {
        email: emailVal,
        password: passVal,
      });

      console.log('Login response data:', data);

      localStorage.setItem("token", data.token);
      setTimeout(() => {
        navigate("/home");
        window.location.reload();
        setProcess(false);
      }, 2000);
    } catch (error) {
      setProcess(false);
      setErrorMessage(error?.response?.data?.msg);
    }
  }

  return (
    <div className={AuthStyle.form_container}>
      <div className={`${isAnimating ? AuthStyle.slidein : ""}`}>
        <form action="" onSubmit={handleSubmit}>
          <div className={AuthStyle.Atitle}>
            <p>Log in to your Account</p>
            <p>
              Don't have an account?{" "}
              <Link to="/register" className={AuthStyle.link}>Create a new account</Link>
            </p>
          </div>

          {errMessage && (
            <div className={AuthStyle.error_message}>
              You entered the wrong username or password.
            </div>
          )}

          <div>
            <input type="email" name="email" ref={email} placeholder="Email" />
          </div>

          <div className={AuthStyle.password_toggle_container}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              ref={password}
              name="password"
            />

            <span
              className={`fa ${passwordVisible ? "fa-eye" : "fa-eye-slash"}  ${
                AuthStyle.pwd_toggle
              }`}
              onClick={togglePasswordVisibility}
              aria-hidden="true"
            ></span>
          </div>

          {process && (
            <ThreeDots
              visible={true}
              height="40"
              width="40"
              color="#516CF0"
              radius="6"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass={AuthStyle.ThreeDotsCenter}
            />
          )}

          <div className={AuthStyle.btn_container}>
            <button type="submit">Submit</button>
            <div className={AuthStyle.forgot_outer_container}>
              <Link to="/reset-password" className={AuthStyle.forgot}>
                Forgot Password?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
