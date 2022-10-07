import React from "react";
import { Route } from 'react-router-dom'

import User from "./Component/Home/User";
import LeaveApplication from "./Component/LeaveApplication/LeaveApplication";
import './App.css'
import UserProfile from "./Component/UserProfile/UserProfile";

function App() {
  return (
    <div>
    
        <Route path="/" component={User} exact/>
        <Route path="/home" component={UserProfile} />
    
      
    </div>
  );
}

export default App;
