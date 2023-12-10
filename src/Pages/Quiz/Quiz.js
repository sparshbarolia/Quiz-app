import React from 'react'
import { useEffect , useState } from 'react';
import { CircularProgress } from '@mui/material';
import "./Quiz.css";
import Question from '../../Components/Question/Question';

export default function Quiz({name , score , questions , setQuestions , setScore}) {

  const[options , setOptions] = useState();
  const[currQues , setCurrQues] = useState(0); 

  useEffect(() => {
    //Ye h sare questions
    console.log(questions);

    //this will shuffle options of that perticular question
    //isme hum ek array pass kr rhe h sbhi options ki or vo array shuffle krdega handleShuffle
    //questions ki state bnai h ek app.js me jo sare ques ka array return krta h
      setOptions(
        questions &&
          handleShuffle([
            questions[currQues]?.correct_answer,
            ...questions[currQues]?.incorrect_answers,
          ])
      );

  },[questions , currQues]);

  //this is to shuffle the options
  const handleShuffle = (optionss) => {
    return optionss.sort(() => Math.random() - 0.5);
  }

  return (
    <div className="quiz">
      <span className="subtitle">
        Welcome {name}
      </span>

      {/* agr ques null nhi h to pehle vala () run kro or agr null h to dusre vala () mtlb loader le ao */}
      {questions ? 
      (
        <>
          <div className="quizInfo">
            <span>{questions[currQues].category}</span>
            <span>
              Score : {score}
            </span>
          </div>
          <Question
            currQues={currQues}
            setCurrQues={setCurrQues}
            questions={questions}
            options={options}
            correct={questions[currQues]?.correct_answer}
            score={score}
            setScore={setScore}
            setQuestions={setQuestions}
          />
        </>
      ) : (
        <CircularProgress
          style={{ margin: 100 }}
          color="inherit"
          size={150}
          thickness={1}
        />
      )}
    </div>
  );
};