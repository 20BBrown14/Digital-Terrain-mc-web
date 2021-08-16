import type { NextPage } from 'next'
import Header from '../src/components/Header';
import HomePageBody from '../src/HomePage/HomePageBody';
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <HomePageBody />
      </main>

      <footer className={styles.footer}>
        © 2020-2021 Copyright Digital Terrain
      </footer>
    </div>
  )
}

export default Home
