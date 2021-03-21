import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import SportsIcon from '@material-ui/icons/Sports';
import { Avatar, Typography, AppBar, Toolbar, IconButton } from '@material-ui/core'
import { AuthContext } from '../Auth/AuthProvider'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}))

export const NavBar = (props) => {

  const history = useHistory();

  const classes = useStyles();
  const [menuOpen, setMenuOpen] = React.useState(false);

  const { getProfile, profile } = useContext(AuthContext)

  useEffect(() => {
    getProfile()
  }, [])

  const toggleDrawer = (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return;
    }

    setMenuOpen(!menuOpen);
  };

  return (
        <React.Fragment>
            {
                profile && profile.user &&

                <div className={classes.root}>
                  <AppBar position="static" elevation={4} color="default">
                    <Toolbar>
                      <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="h6" className={classes.title}>
                        Practice Pal
                      </Typography>
                      <Avatar id="target" src={profile.profile_image} alt={profile.user.username} className={classes.large} />
                    </Toolbar>
                  </AppBar>
                </div>
            }
          <Drawer open={menuOpen} onClose={toggleDrawer}>
            <List>
                <ListItem button onClick={() => {
                  history.push('/')
                  setMenuOpen(false)
                }}>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem button onClick={() => {
                  history.push('/songlist')
                  setMenuOpen(false)
                }}>
                    <ListItemIcon><LibraryMusicIcon /></ListItemIcon>
                    <ListItemText>Works</ListItemText>
                </ListItem>
                <ListItem button onClick={() => {
                  history.push('/')
                  setMenuOpen(false)
                }}>
                    <ListItemIcon><QueueMusicIcon /></ListItemIcon>
                    <ListItemText>Sections</ListItemText>
                </ListItem>
                <ListItem button onClick={() => {
                  history.push('/')
                  setMenuOpen(false)
                }}>
                    <ListItemIcon><SportsIcon /></ListItemIcon>
                    <ListItemText>Competitions</ListItemText>
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button onClick={() => {
                                        localStorage.removeItem("pp_token")
                                        history.push('/')
                                    }}>
                    <ListItemIcon><AccountCircleIcon /></ListItemIcon>
                    <ListItemText>Edit Profile</ListItemText>
                </ListItem>
                <ListItem button onClick={() => {
                                        localStorage.removeItem("pp_token")
                                        history.push('/')
                                    }}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText>Logout</ListItemText>
                </ListItem>
            </List>
          </Drawer>
        </React.Fragment>
  );
}
