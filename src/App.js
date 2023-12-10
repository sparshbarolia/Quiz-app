import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import React, { useState } from 'react';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Result from './Pages/Result/Result';
import axios from 'axios';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {

  const [name , setName] = useState("");
  const [questions  , setQuestions] = useState();
  const [score , setScore] = useState(0);
  

  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );

    //jo bhi result aya API se use questions ke naam ka array bnadia
    setQuestions(data.results);
  };

  return (
    <Router>
      <div className="app">
        <div className="background-image" style={{ backgroundImage: 'url("/ques1.png")' }} />
  
        <Header/>
        
        <Routes>
          <Route exact path="/" element={<Home name = {name} setName={setName}  fetchQuestions={fetchQuestions}/>}></Route>
          <Route exact path="/quizpg" 
          element={<Quiz name = {name}
                         questions = {questions}
                         score = {score}
                         setScore = {setScore}
                         setQuestions = {setQuestions}
          /> }>

          </Route>
          <Route exact path="/resultPg" element={<Result score = {score}/> }></Route>
        </Routes>
        
      </div>
      <Footer/>
    </Router>
  );
}

export default App;


