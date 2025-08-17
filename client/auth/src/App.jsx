import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Nav from './components/Nav'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';


function App() {
 

  return (
    <>
    <Router>
      <Nav></Nav>
      <Routes>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>    
      </Routes>    
    </Router>    
      
    </>
  )
}

export default App
