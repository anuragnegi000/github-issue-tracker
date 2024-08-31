import React from 'react'
import {Router,Routes,Route} from "react-router-dom";
import Home from "../src/pages/Home/home";
import Navbar from "../src/components/Navbar";
import Signup from "../src/pages/Signup/signup";
import Signin from "../src/pages/Signin/signin";
import Error from "../src/pages/Error/error";


export default function App() {
  return (<>
    <Navbar/>
    <Routes>
      <Route path='/' element = {<Home/>} />
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup />} />
      <Route path='*'  element={<Error/>}/>
    </Routes>
    </>
  )
}
