import React, { useState } from 'react'
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import './Question.css'
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Question({
    currQues,
    setCurrQues,
    questions,
    options,
    correct,
    setScore,
    score,
  }) {

    const[selected,setSelected] = useState();
    const[error,setError] = useState(false);

    const navigate = useNavigate();

    const handleSelect = (i) => {
        if(selected === i && selected === correct){
            return "select";
        }
        else if(selected === i && selected !== correct){
            return "wrong";
        }
        else if(i == correct ){
            return "select";
        }
    }

    const handleCheck = (i) => {
        setSelected(i);
        if(i === correct) setScore(score+1);
        setError(false);
    };

    // const handleQuit = () => {
        
    // }

    const handleNext = () => {
        if(currQues == 9){
          navigate("/resultPg");
        }
        else if(selected){
          setCurrQues(currQues + 1);
          setSelected();
        }
        else{
          setError("Please select an option first");
        }
    }

  return (
    <div className='question'>
      <h1>Question {currQues + 1}</h1>

      <div className="singleQuestion">
        <h2>
            {/* questions -> array of questions from API */}
            {/* currQues -> index of current question  */}
            {/* question -> key in array of objects from API  */}
            {questions[currQues].question}
        </h2>

            <div className="options">
                { error && <ErrorMessage> {error} </ErrorMessage> }
                {
                  //shuffled options ki array me operation lgare h kuchh
                    options && 
                    options.map( (i) => (
                        <button onClick={ () => handleCheck(i) }
                        className = {`singleOption ${selected && handleSelect(i)}`}
                        key={i}
                        disabled={selected}> {i} 
                        </button>
                    ))
                }
            </div>
            
            <div className="controls">
            <Button
            variant="contained"
            color="secondary"
            size="large"
            style={{ width: 185 }}
            href="/"    //quit krne pr home page pr redirect krdega
            // onClick={() => handleQuit()}
          >
            Quit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: 185 }}
            onClick={handleNext}
          >
            {currQues > 20 ? "Submit" : "Next Question"}
          </Button>
            </div>
        
      </div>
    </div>
  )
}
