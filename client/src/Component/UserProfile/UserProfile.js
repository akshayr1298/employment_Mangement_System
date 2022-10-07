

import React from 'react'
import { UserState } from '../../Context/Context'
import Header from '../Header/Header'
import Navbar from '../Header/Header'


const UserProfile = () => {
 const {user}  = UserState()
  return (
    <div>
     <Header/>
    </div>
  )
}

export default UserProfile
