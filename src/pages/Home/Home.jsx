import React from 'react'
import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import Dashbard from '../Dashboard/Dashbard';

function Home() {
  return (
    <>
    <div style={{display:'flex', flexDirection:'row'}}>
     <NavBar/>
     <Outlet/>
     </div>
    </>
  );
}

export default Home