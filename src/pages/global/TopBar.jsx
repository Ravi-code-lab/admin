import { Box, IconButton, Popover, Typography, useTheme } from "@mui/material";
import { useContext, useState } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Logout } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [isProfileOption, setIsProfileOption] = useState(false);
  const [profileAnchor, setPofileAnchor] = useState(null);
  const navigate = useNavigate();
  //On Profile icon Click
  const handleProfile = (e)=>{
    setPofileAnchor(e.currentTarget);
    setIsProfileOption(!isProfileOption);
  }

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleProfile}>
          <PersonOutlinedIcon />
        </IconButton>
        <Popover
          open={isProfileOption}
          onClose={()=>{setIsProfileOption(false); setPofileAnchor(null);}}
          anchorEl={profileAnchor}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <IconButton onClick={()=>{localStorage.clear(); navigate("/login"); window.location.reload()}} >
            <Logout />
            <Typography>Log out</Typography>
        </IconButton>
        </Popover>
      </Box>
    </Box>
  );
};

export default Topbar;
