import React, { useContext, useEffect, useState } from "react";
import Layout from "../../Layout/Layout";
import { Link } from "react-router-dom";
import { AppState } from "../../Router";
import classes from "./question.module.css";
import Card from "./QuestionCard/Card";
import axios from "../../Utility/axios";
import { motion } from "framer-motion";

function Question() {
  const [data, setData] = useState([]);
  const [searchedData, setSearchedData] = useState([]);
  const [val, setValue] = useState("");
  const { user } = useContext(AppState);
  const token = localStorage.getItem("token");
  const [offSet, setOffSet] = useState(0);
  const [limit, setLimit] = useState(5);
  const [totalQuestion, setTotalQuestion] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await axios.get(
          `/questions/getallquestions/${offSet}/${limit}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setData(info.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchSearchedData = async () => {
      try {
        const info = await axios.post(
          `/questions/searchedquestion`,
          {
            searchWord: val,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setSearchedData(info.data);
      } catch (error) {
        console.error("Error fetching searched data:", error);
      }
    };

    const numberOfQuestions = async () => {
      try {
        const num = await axios.get("/questions/noOfquestion", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setTotalQuestion(num.data.num);
      } catch (error) {
        console.error("Error fetching number of questions:", error);
      }
    };

    fetchData();
    numberOfQuestions();

    if (val) {
      fetchSearchedData();
    }
  }, [user, offSet, limit, val, token]);

  const listItems = [];

  const handlePaginationClick = (iter) => {
    setOffSet(iter * limit);
  };

  for (let i = 0; i < Math.ceil(totalQuestion / limit); i++) {
    listItems.push(
      <button key={i} onClick={() => handlePaginationClick(i)}>
        {i + 1}
      </button>
    );
  }

  return (
    <Layout>
      <motion.div className={classes.homepage_container}>
        <div className={classes.quest_user_container}>
          <button>
            <Link to="/question">Ask Question</Link>
          </button>
          <div>
            Welcome: <span>{user.username}</span>
          </div>
        </div>

        <div className={classes.homepage_search}>
          <input
            type="search"
            placeholder="Search Questions by Title you Want"
            value={val}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <div className={classes.questions}>
          {totalQuestion} Questions are Asked
        </div>

        <div className={classes.card_wrapper}>
          {(val ? searchedData : data).map((eachQuestion, index) => (
            <Card key={index} info={eachQuestion} ansCount={true} />
          ))}

          <div className={classes.pagination}>
            <div>{listItems}</div>

            <div className={classes.perpage}>
              <div>
                <button onClick={() => setLimit(5)}>5</button>
                <button onClick={() => setLimit(10)}>10</button>
                <button onClick={() => setLimit(15)}>15</button>
              </div>
              <div className={classes.perpagetext}>
                Number of questions per page
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}

export default Question;
