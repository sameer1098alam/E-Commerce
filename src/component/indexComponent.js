import React from "react";
import { NavLink, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainComponent from "./MainComponent";
import SignupComponent from "./SignupComponent";
import Aboutus from "./aboutus";
import Contactus from "./contactus";
export default class IndexComponent extends React.Component{
    render(){
        return(
            <div>
                <div className="nav nav-pills">
                    <Router>
                        <div className="nav-item">
                            <NavLink to = "/aboutus" className='nav-link'>About us</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to = "/contactus" className='nav-link'>Contact us</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to ="/userServices" className='nav-link'>UserServices</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to = "/signup" className='nav-link'>Signup</NavLink>
                        </div>
                        <div className="nav-item">
                            <NavLink to = "/login" className='nav-link'>Login</NavLink>
                        </div>
                        <br/><br/>
                        <Routes>
                            <Route path="/aboutus" element={<Aboutus/>}></Route>
                            <Route path="/contactus" element= {<Contactus/>}></Route>
                            <Route path ="/userServices" element={<userServics/>}></Route>
                            <Route path="/signup" element={<SignupComponent/>}></Route>
                            <Route path="/login" element={<MainComponent/>}></Route>
                        </Routes>
                    </Router>
                </div>
            </div>
        )
    }
}


