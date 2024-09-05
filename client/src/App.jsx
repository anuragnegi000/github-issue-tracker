import React from 'react'
import {Navigate,Router,Routes,Route} from "react-router-dom";
import Home from "../src/pages/Home/home";
import Navbar from "../src/components/Navbar";
import Signup from "../src/pages/Signup/signup";
import Signin from "../src/pages/Signin/signin";
import Error from "../src/pages/Error/error";
import RefreshHandler from './RefreshHandler';
import { useState } from 'react';

export default function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false);

  const PrivateRoute = ({element})=>{
       return isAuthenticated ? element : <Navigate to = '/signin' />
  }
  return (<>
    <Navbar/>
    <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    <Routes>
      <Route path='/' element = {<PrivateRoute element={<Home/>}/> } />
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup />} />
      <Route path='*'  element={<Error/>}/>
    </Routes>
    </>
  )
}
