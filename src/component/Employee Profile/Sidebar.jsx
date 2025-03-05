import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import "./EmployeeDetail.css";
import {
  FcHome,
  FcViewDetails,
  FcPlanner,
  FcMoneyTransfer,
  FcAbout,
  FcFinePrint,
  FcDebt,
  FcCurrencyExchange,
} from "react-icons/fc";
function Sidebar() {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const SilderData = [
    { icon: <FcHome />, text: "Home", link: "/selectcompany" },
    { icon: <FcViewDetails />, text: "Dashboard", link: "/dashboard" },
    { icon: <FcPlanner />, text: "Attendance", link: "/employeeDetail" },
    { icon: <FcMoneyTransfer />, text: "Salary", link: "/employeeDetail" },
    { icon: <FcAbout />, text: "Inbox", link: "/employeeDetail" },
    { icon: <FcCurrencyExchange />, text: "Wallet", link: "/employeeDetail" },
    { icon: <FcFinePrint />, text: "Document", link: "/employeeDetail" },
    { icon: <FcDebt />, text: "Loan", link: "/employeeDetail" },
    { icon: <FcFinePrint />, text: "Reports", link: "/employeeDetail" },
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {SilderData.map((text, index) => (
          <Link to={text.link}>
            <ListItem key={text.text} disablePadding>
              <ListItemButton>
                <ListItemIcon>{text.icon}</ListItemIcon>
                <ListItemText primary={text.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
    </Box>
  );
  return (
    <>
      {["left"].map((anchor) => (
        <div key={anchor}>
          <button
            onClick={toggleDrawer(anchor, true)}
            className="MenuBtn MobileMenuView"
          >
            <MenuIcon />
          </button>
          <button
            onClick={toggleDrawer(anchor, true)}
            className="MenuBtn MobileManuIcon"
          >
            MENU
          </button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </div>
      ))}
    </>
  );
}

export default Sidebar;
