import type { NextPage } from 'next'
import Header from '../src/components/Header';
import styles from '../styles/Home.module.css'

const Map: NextPage = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Map!
        </h1>
      </main>

      <footer className={styles.footer}>
        © 2020-2021 Copyright Digital Terrain
      </footer>
    </div>
  )
}

export default Map
