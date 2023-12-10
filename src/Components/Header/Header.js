import React from 'react'
import { Link } from 'react-router-dom'
import "./Header.css";

const Header = () => {
  return (
    <div className = "header">
       <Link className = "title" to = '/'>QuizShala</Link>
       <hr className = "divider"/>
    </div>
  )
}

export default Header
