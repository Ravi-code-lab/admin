
import React, { Component } from 'react'
import { Route, Navigate } from 'react-router-dom';

const AuthRoute = (Component) =>{
    return localStorage.getItem('token')? <Component/> : <Navigate to='/login'/>;
};


export default AuthRoute;


