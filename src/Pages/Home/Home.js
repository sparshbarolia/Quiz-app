import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Categories from '../../Data/Category';
import { MenuItem, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import ErrorMessage from '../../Components/ErrorMessage/ErrorMessage';

export default function Home({name , setName , fetchQuestions}) {

    const[category,setCategory] = useState("");
    const[difficulty,setDifficulty] = useState("");
    const[error,setError] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        if(!category || !difficulty || !name){
            setError(true);
            return;
        }
        else{
            setError(false);
            fetchQuestions(category , difficulty);
            navigate('/quizPg');
        }
    }

    return (
        <div className='content'>
            <div className="settings">
                <span style={{ fontSize: 30 }}>Quiz Settings</span>

                <div className="settings__select">

                    {error && <ErrorMessage>Please Fill all the feilds</ErrorMessage>}

                    <TextField
                        style={{ marginBottom: 25 }}
                        label="Enter Your Name"
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        style={{ marginBottom: 25 }}
                        select
                        label="Select Category"
                        variant="outlined"
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                    >
                        {/* This will show options */}
                        {Categories.map((cat) => (
                            <MenuItem key={cat.category} value={cat.value}>
                                {cat.category}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        label="Select Difficulty"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                        variant="outlined"
                        style={{ marginBottom: 30 }}
                    >
                        {/* This will show options */}
                        <MenuItem key="Easy" value="easy">
                            Easy
                        </MenuItem>
                        <MenuItem key="Medium" value="medium">
                            Medium
                        </MenuItem>
                        <MenuItem key="Hard" value="hard">
                            Hard
                        </MenuItem>
                    </TextField>

                    <Button 
                        variant="contained" 
                        color="primary" 
                        size='large'
                        onClick={handleSubmit}
                        >Start Quiz</Button>
                </div>

            </div>

            <img src="/quiz.svg" alt="quiz img" className='banner' />
        </div>
    )
}
