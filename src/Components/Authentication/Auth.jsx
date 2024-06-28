import React, { useContext, useState } from "react";
import AuthStyle from "./classes.module.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { SignContext } from "../State/State";
import Reset from "./Reset";
import Updatepass from "./UpdatePass";
// import  {Navigate}  from 'react-router-dom'

const Auth = () => {
  // const [signState, setSignState]= useState(false)
  const [{ signstate }, dispatch] = useContext(SignContext);

  return (
    <div className={AuthStyle.auth_outer_container}>
      <div className={AuthStyle.auth_inner_container}>
        {signstate == "RESET" ? (
          <Reset />
        ) : signstate == "UPDATE" ? (
          <Updatepass />
        ) : signstate == "SIGN UP" ? (
          <SignUp />
        ) : (
          <SignIn />
        )}

        <div className={AuthStyle.content}>
          <p>About</p>

          <div className={AuthStyle.evan_title}>
            <h2> Evangadi Networks</h2>
          </div>

          <div className={AuthStyle.content_description}>
            <h4>Join Our Web Q&A Community</h4>

            <p>
              Looking for answers or want to share your knowledge? Join our
              vibrant Web Q&A community! Connect with experts, ask questions,
              and provide solutions. Be part of a space where learning and
              teaching go hand in hand.
            </p>

            <p>
              Join us today to ask questions, find answers, and share your
              expertise. Engage with a community of learners and experts, and
              help us create a hub of knowledge and support. Your participation
              makes a difference!
            </p>
          </div>

          <div>
            <button>HOW IT Works</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
