import React from 'react';
import {useRouter} from 'next/router';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Menu as MenuIcon } from '@material-ui/icons';
import NAVIGATION_KEYS from '../constants/navigationKeys';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      backgroundColor: 'var(--digital-terrain-primary-color)',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'var(--digital-terrain-secondary-color)',
    },
    title: {
      flexGrow: 1,
      color: 'var(--digital-terrain-secondary-color)',
    },
    loginButton: {
      color: 'var(--digital-terrain-secondary-color)',
    },
  }),
);

function Header(): React.ReactElement {
  const classes = useStyles();
  const router = useRouter();
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuIconClick = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setMenuAnchorEl(null);
  }

  const activeNavKey = Object.values(NAVIGATION_KEYS).find((navKey) => {
    return navKey.path === router.pathname;
  });

  const menuItems = Object.values(NAVIGATION_KEYS).map((navKey) => {
    return (
      <MenuItem
        key={`${navKey.name}_nav_menu_item`}
        onClick={() => {router.push(navKey.path)}}
      >
        {navKey.name}
      </MenuItem>
    )
  })

  return (
    <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={handleMenuIconClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            id="navigation-menu"
            anchorEl={menuAnchorEl}
            keepMounted={true}
            open={Boolean(menuAnchorEl)}
            onClose={handleClose}
          >
            {menuItems}
          </Menu>
          <Typography variant="h6" className={classes.title}>
            {activeNavKey?.name}
          </Typography>
          <Button color="inherit" className={classes.loginButton}>Login</Button>
        </Toolbar>
      </AppBar>
  )
};

export default Header;