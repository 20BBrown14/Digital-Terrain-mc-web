import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  createStyles,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { Menu as MenuIcon } from '@material-ui/icons';

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
    }
  }),
);

function Header(): React.ReactElement {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button color="inherit" className={classes.loginButton}>Login</Button>
        </Toolbar>
      </AppBar>
  )
};

export default Header;