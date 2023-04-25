import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddEvent from "./pages/Event/AddEvent";
import EditEvent from "./pages/Event/EditEvent/EditEvent";
// import Event from "./pages/Event/Event";
// import Home from "./pages/Home/Home";
import ChangePassword from "./pages/Login/ChangePassword";
import ForgetPassword from "./pages/Login/Forget";
import Login from "./pages/Login/Login";
import VerifyOTP from "./pages/Login/VerifyOtp";
// import User from "./pages/User/User";
import AuthRoute from "./utility/Routes";

// import AddEvent from './pages/Event/AddEvent';
import SideBar from './pages/global/SideBar';
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import TopBar from "./pages/global/TopBar";
import Event from "./pages/Event/Event";

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
      {localStorage.getItem('token') &&<SideBar/>}
        <main className="content">
        {localStorage.getItem('token') && <TopBar/>}
        <Routes>
          <Route exact path="/" element={AuthRoute(Dashboard)}/>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/events" element={AuthRoute(Event)}/><Route exact path="/login" element={<Login />} />
          <Route exact path="/forget" element={<ForgetPassword />} />
          <Route exact path="/otpverify" element={<VerifyOTP />} />
          <Route exact path="/changePassword" element={<ChangePassword />} />
          <Route exact path="/addevent" element={AuthRoute(AddEvent)} />
          <Route
              exact
              path="/edit/event/:id"
              element={AuthRoute(EditEvent)}
            />
          {/* <Route path="/user" element={<Dashboard/>}/> */}
          {/* <Route path="/reports" element={<Dashboard/>}/> */}
          {/* <Route path="/time" element={<Dashboard/>}/> */}
          {/* <Route path="/faq" element={<Dashboard/>}/> */}
        </Routes>
        </main>
        
        {/* {<Routes>
          <Route exact path="/" element={AuthRoute(Home)}>
            <Route exact path="/" element={AuthRoute(Dashbard)} />
            <Route exact path="/event" element={AuthRoute(Event)} />
            
            
            <Route exact path="/users" element={AuthRoute(User)} />
          </Route>
          
        </Routes> } */}
      </div>
    </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
