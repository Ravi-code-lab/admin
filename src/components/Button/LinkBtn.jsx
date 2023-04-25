import { Button } from '@mui/material';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
function LinkBtn(props) {
    const navigate = useNavigate();
  return (
    <Button {...props} 
    variant='contained'
    onClick={()=>{navigate(props.to, {state:props.data})}}
    >{props.icon? props.icon:<></>}{props.text}</Button>
  )
}

export default LinkBtn