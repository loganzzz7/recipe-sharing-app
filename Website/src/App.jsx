import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './forms/Home';
import Login from './forms/Login';
import SignUp from './forms/SignUp';
import Navbar from './Navbar';
import SearchTerms from './Terms';
import UserContext from './Context';
import './App.css';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState((sessionStorage.getItem('user') != null) ? sessionStorage.getItem('user') : '');

  const [terms, setTerms] = useState({ word: '', cuisine: '', cookTime: '' });

  return (
    <UserContext.Provider value={[user, setUser]}>
      <SearchTerms.Provider value={[terms, setTerms]}>
        <Router>
          <div className='navbar'>
            <Navbar />
          </div>
          <div className='content'>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/signup" element={<SignUp />}></Route>
            </Routes>
          </div>
        </Router>
      </SearchTerms.Provider>
    </UserContext.Provider>
  )
}

export default App;