import { AdminPanelSettingsRounded, Dashboard, Event, Logout } from '@mui/icons-material'
import { getFabUtilityClass, Paper, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  const [selected, setselected] = useState(1);

  const isSelected = (num)=>{
    return selected === num ? 'nav-link-selected':'nav-link';
  }
  return (
    <Paper sx={{maxWidth:'40%', minWidth:'max-content', height:'100vh', position:'fixed'}}>
        <div style={{display:'flex',padding:'1rem 1.5rem'}}>
            <AdminPanelSettingsRounded fontSize='large'/>
            <Typography>Admin Handle</Typography>
        </div>
        <ul className='nav-links'>
            <li><Link to="/" className={isSelected(1)} onClick={()=> setselected(1)}><Dashboard fontSize='small'/><Typography variant='subtitle1'>Dashboard</Typography></Link></li>
            <li><Link to="/event" className={isSelected(2)} onClick={()=> setselected(2)}><Event fontSize='small'/><Typography variant='subtitle1'>Event</Typography></Link></li>
            <li><Link to="/users" className={isSelected(3)} onClick={()=> setselected(3)}><Event fontSize='small'/><Typography variant='subtitle1'>Users</Typography></Link></li>
            <li><Link to="/event" className={isSelected(4 )} onClick={()=> setselected(4)}><Event fontSize='small'/><Typography variant='subtitle1'>About</Typography></Link></li>
            <li onClick={(e)=>{localStorage.removeItem('token')}}><Link to="/login" className={isSelected(5 )} onClick={()=> setselected(5)}><Logout fontSize='small'/><Typography variant='subtitle1'>Log out</Typography></Link></li>

        </ul>
    </Paper>
  )
}

export default NavBar