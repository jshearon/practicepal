import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Grid, Avatar, Typography } from '@material-ui/core'
import { AuthContext } from '../auth/AuthProvider'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

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

                <Grid container spacing={0} justify="space-around" alignItems="center">
                    <Grid item xs={6} spacing={3}>
                        <Button onClick={toggleDrawer}><MenuIcon /></Button>
                    </Grid>
                    <Grid item xs={3} align="right" p={3}>
                        <Typography>{profile.user.first_name + ' ' + profile.user.last_name}</Typography>
                    </Grid>
                    <Grid item xs={3} align="right" p={3}>
                    <Avatar id="target" src={profile.profile_image} alt={profile.user.username} className={classes.large} />
                    </Grid>
                </Grid>
            }
          <Drawer open={menuOpen} onClose={toggleDrawer}>
            <List>
                <ListItem button>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText>Profile</ListItemText>
                </ListItem>
            </List>
            <Divider />
            <List>
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
