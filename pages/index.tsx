import type { NextPage } from 'next'
import {createStyles, Grid} from '@material-ui/core';
import Header from '../src/components/Header';
import HomePageBody from '../src/HomePage/HomePageBody';
import styles from '../styles/Home.module.css'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    headerGrid: {
      position: 'fixed',
      top: 0,
      width: '100%',
    },
    bodyGrid: {
      paddingTop: '35px'
    },
  })
)

const Home: NextPage = () => {
  const classes = useStyles();

  return (
    <div className={styles.container}>
      <Grid container>
        <Grid item sm={12} className={classes.headerGrid}>
          <Header />
        </Grid>
        <Grid item sm={12} className={classes.bodyGrid}>
          <main className={styles.main}>
            <HomePageBody />
          </main>
        </Grid>
        <Grid item sm={12}>
          <footer className={styles.footer}>
            © 2020-2021 Copyright Digital Terrain
          </footer>
        </Grid>
      </Grid>
    </div>
  )
}

export default Home
