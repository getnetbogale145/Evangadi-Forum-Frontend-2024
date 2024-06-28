
import React, { useRef, useState } from "react";
import classes from "./askquestion.module.css";
import Layout from "../../Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "../../Utility/axios";
import { DNA } from "react-loader-spinner";
import { InfinitySpin } from "react-loader-spinner";
import { motion } from "framer-motion";
import { IoCheckmarkCircleOutline } from "react-icons/io5"; // Import your preferred icon

function AskQuestion() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postedAt, setPostedAt] = useState(null);
  const token = localStorage.getItem("token");
  const titleRef = useRef(null);
  const DescreRef = useRef(null);
  const [dispError, setDispError] = useState(false);
  const [loading, setLoading] = useState(false);

  const GoToQuestionPage = () => {
    navigate("/home");
  };

  async function postQuestion(e) {
    e.preventDefault();

    if (title.length === 0 || description.length === 0) {
      setDispError("Both fields are required.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "/questions/new-question",
        {
          title: title,
          description: description,
          tag: "react",
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      const now = new Date();
      setPostedAt(now);

      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error posting question:", error);
      setDispError("Error posting question. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <motion.div
        style={{ borderRadius: "10px", padding: "40px" }}
        className={classes.question_wrapper}
      >
        <div className="question-container">
          <div className="question-header">Steps to write a good question</div>
          <div className="question-steps">
            <div className="step">
              <IoCheckmarkCircleOutline
                className="bullet-icon"
                style={{
                  color: "blue",
                  marginRight: "10px",
                  lineHeight: "12px",
                }}
              />
              <span>Summarize your question in one line title</span>
            </div>
            <div className="step">
              <IoCheckmarkCircleOutline
                className="bullet-icon"
                style={{
                  color: "blue",
                  marginRight: "10px",
                  lineHeight: "12px",
                }}
              />
              <span>Describe your question in detail</span>
            </div>
            <div className="step">
              <IoCheckmarkCircleOutline
                className="bullet-icon"
                style={{
                  color: "blue",
                  marginRight: "10px",
                  lineHeight: "12px",
                }}
              />
              <span>
                Describe what you tried and what you expected to happen
              </span>
            </div>
            <div className="step">
              <IoCheckmarkCircleOutline
                className="bullet-icon"
                style={{
                  color: "blue",
                  marginRight: "10px",
                  lineHeight: "12px",
                }}
              />
              <span>Review your question and post it to the site</span>
            </div>
          </div>
        </div>

        <div className={classes.question_form_container}>
          <div>Ask a public question</div>
          <div className={classes.go} onClick={GoToQuestionPage}>
            Go to Question page{" "}
          </div>

          <form action="" onSubmit={postQuestion}>
            {dispError && <div className={classes.disperror}>{dispError} </div>}
            <div>
              <input
                type="text"
                id={classes.input}
                ref={titleRef}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
              />
            </div>

            <div>
              <textarea
                name=""
                id=""
                ref={DescreRef}
                placeholder="Question Description ..."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button type="submit">Post Your Question</button>
          </form>

          {postedAt && (
            <div className={classes.postedAt}>
              Asked{" "}
              {postedAt.toLocaleString("en-US", {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </div>
          )}
        </div>

        {loading &&
          (Math.floor(Math.random() * 10) % 2 === 0 ? (
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          ) : (
            <InfinitySpin
              visible={true}
              width="300"
              color="#fe8303"
              ariaLabel="infinity-spin-loading"
            />
          ))}
      </motion.div>
    </Layout>
  );
}

export default AskQuestion;
