import React, { useContext, useRef, useState, useEffect } from "react";
import Person3Icon from "@mui/icons-material/Person3";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import classes from "./questioncard.module.css";
import { Link, useParams } from "react-router-dom";
import { GoTrash } from "react-icons/go";
import { MdEdit } from "react-icons/md";
import { CiShoppingTag } from "react-icons/ci";
import { AppState } from "../../../Router";
import axios from "../../../Utility/axios";

import { ThreeDots } from "react-loader-spinner";
import { IoPersonCircle } from "react-icons/io5";

const Card = ({ info, ansCount }) => {
  const { title, username, answer, questionid, answerid, num_answers } = info;
  const [updatedanswer, setUpdatedAnswer] = useState(answer);
  const [updatedAns, setUpdatedAnsFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [warn, setWarning] = useState(false);
  const [spin, setSpin] = useState(false);
  const { user } = useContext(AppState);
  const { answerdetail } = useParams();
  const token = localStorage.getItem("token");
  const menuRef = useRef(null);
  const ansUpdateRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [answeredAt, setAnsweredAt] = useState(null);

  const urlUpdate = `/answers/update/${answerdetail}`;

  useEffect(() => {
    // Set answeredAt to current date when the component mounts
    const now = new Date();
    setAnsweredAt(now);
  }, []);

  const UpdateAnswer = async (e) => {
    e.preventDefault();
    if (!updatedanswer) {
      ansUpdateRef.current.placeholder = "Please enter a valid answer.";
      ansUpdateRef.current.style.border = "2px inset lightcoral";
      return;
    }

    try {
      setSpin(true);
      await axios.put(
        urlUpdate,
        {
          newAnswer: updatedanswer,
          AID: answerid,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTimeout(() => {
        window.location.reload();
        setSpin(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating answer:", error);
      setSpin(false);
    }
  };

  const DeleteAnswer = async () => {
    try {
      setSpin(true);
      setWarning(false);
      const urlDelete = `/answers/delete/${answerdetail}/${answerid}`;
      await axios.delete(urlDelete, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setTimeout(() => {
        window.location.reload();
        setSpin(false);
      }, 5000);
    } catch (error) {
      console.error("Error deleting answer:", error);
      setSpin(false);
    }
  };

  const displayMenu = () => {
    menuRef.current.classList.toggle(`${classes.disp}`);
    setOpen(!open);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setWarning(false);
  };

  const DeleteWarnMessage = () => {
    menuRef.current.classList.remove(`${classes.disp}`);
    setWarning(true);
    setIsOpen(true);
  };

  const updateAnswerFlag = () => {
    setUpdatedAnsFlag((prevState) => !prevState);
    menuRef.current.classList.remove(`${classes.disp}`);
    setOpen(false);
  };

  const cancelUpdate = () => {
    setUpdatedAnsFlag(false);
  };

  const postAnswer = async (e) => {
    e.preventDefault();
    try {
      const now = new Date();
      setAnsweredAt(now);

      await axios.post(
        `/answers/post`,
        {
          questionId: questionid,
          answer: updatedanswer,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnsweredAt(now); // Set the date when the answer is posted
      // Assuming that `postAnswer` is called on form submit
    } catch (error) {
      console.error("Error posting answer:", error);
    }
  };

  return (
    <>
      <Link to={questionid} className={classes.question_card_container}>
        <div className={classes.question_container}>
          <div className={classes.asked_by}>
            <div className={classes.svg_container}>
              <IoPersonCircle  style={{ fontSize: '100px' }}/>
              {ansCount && (
                <>
                  <span>
                    {num_answers === 0
                      ? "Not answered"
                      : num_answers === 1
                      ? "1 answer"
                      : `${num_answers} answers`}
                  </span>
                </>
              )}
            </div>
            <div>
              <code>{username}</code>
            </div>
          </div>
          <div>
            <div>{answer ? answer : title}</div>
            <div onClick={displayMenu} className={classes.arrowrighticon}>
              <KeyboardArrowRightIcon />
            </div>
            <div className={classes.three_dots_menu_lists} ref={menuRef}>
              {username === user.username && (
                <>
                  <button onClick={updateAnswerFlag}>
                    <MdEdit size={20} /> Edit
                  </button>
                  <button onClick={DeleteWarnMessage}>
                    <GoTrash size={20} /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {answeredAt && (
          <div className={classes.answeredAt}>
            Posted {answeredAt.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}
          </div>
        )}
      </Link>
      {updatedAns && (
        <form onSubmit={UpdateAnswer} className={classes.upd_answer}>
          <textarea
            value={updatedanswer}
            ref={ansUpdateRef}
            onChange={(e) => setUpdatedAnswer(e.target.value)}
          ></textarea>
          <button type="submit">Update Your Answer</button>
          <button type="button" onClick={cancelUpdate}>
            Cancel
          </button>
        </form>
      )}
      {open && (
        <div className={classes.open_closed} onClick={() => setOpen(false)}></div>
      )}
      {warn && (
        <div className={classes.warning}>
          <p>Are you sure you want to delete your answer?</p>
          <div>
            <button onClick={DeleteAnswer}>Yes</button>
            <button onClick={() => setWarning(false)}>No</button>
          </div>
        </div>
      )}
      {spin && (
        <div className={classes.loading_spinner}>
          <ThreeDots
            visible={true}
            height={50}
            width={50}
            color="#FF8500"
            radius={6}
            ariaLabel="Loading spinner"
          />
        </div>
      )}
      {isOpen && <div className={classes.backdrop} onClick={closeMenu}></div>}
    </>
  );
};

export default Card;
