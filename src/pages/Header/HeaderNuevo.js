import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import logo from "../Header/logoNav.png";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Person2Icon from "@mui/icons-material/Person2";
import ButtonGroup from "@mui/material/ButtonGroup";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import ArticleIcon from '@mui/icons-material/Article';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import PersonIcon from '@mui/icons-material/Person';
import AlignHorizontalLeftIcon from '@mui/icons-material/AlignHorizontalLeft';
import ApprovalIcon from '@mui/icons-material/Approval';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';


const pages = ["Home", "Pricing", "Blog"];

const buttons = [
  <Button key="one">One</Button>,
  <Button key="two">Two</Button>,
  <Button key="three">Three</Button>,
];

const HeaderNuevo = (props) => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const [state, setState] = React.useState({
    left: false,
  });

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
    sx={{
      width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
      height: "100%",
      backgroundColor: "#2185D5",
      position: "fixed",
      top: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <h3 style={{ color: "#FAFAFA" }}>Menu</h3>
    <Divider></Divider>
    <List>
      {[
        { text: "Home", icon: <HomeIcon />, route: "/UserPage" },
        { text: "Citas", icon: <AddHomeWorkIcon />, route: "/citas" },
        { text: "Examenes", icon: <ArticleIcon /> ,route: "/Examenes" },
        { text: "Medicamentos", icon: <MedicationLiquidIcon />,route: "/Medicamento"  },
        { text: "Mi Perfil", icon: <PersonIcon />,route: "/UserProfile" },
        { text: "Estadisticas", icon: <AlignHorizontalLeftIcon />,route: "/Proximamente" },
        { text: "Centros Medicos", icon: <ApprovalIcon />,route: "/SigIntegration"  },
      ].map((item, index) => (
        <ListItem key={item.text} disablePadding>
          <Link to={item.route} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItemButton>
              <ListItemIcon sx={{ color: "#FAFAFA" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ color: "#FAFAFA" }} />
            </ListItemButton>
          </Link>
        </ListItem>
      ))}
    </List>
  </Box>
  );

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#0077C0" }}>
        <Toolbar>
          {["left"].map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton
                onClick={toggleDrawer(anchor, true)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}

          <Typography
            href="/Login"
            variant="h6"
            noWrap
            component="a"
            sx={{
              component: "div",
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              flexGrow: 1,
            }}
          >
            <Avatar src={logo} alt="Logo" sx={{ marginRight: 1 }} />
            <Button style={{ color: "#EEEEEE", margin: "0 3px" }}>Home</Button>
            <Button style={{ color: "#EEEEEE", margin: "0 3px" }}>About</Button>
          </Typography>

          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Person2Icon></Person2Icon> Mi Cuenta
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <CloseIcon></CloseIcon>Cerrar Sesion
                </MenuItem>
              </Menu>
              <div></div>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderNuevo;
