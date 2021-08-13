import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Digital Terrain</title>
        <meta name="description" content="Website for the Digital Terrain Minecraft server." />
        <link rel="icon" href="/bee.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Digital Terrain
        </h1>
      </main>

      <footer className={styles.footer}>
        © 2020-2021 Copyright Digital Terrain
      </footer>
    </div>
  )
}

export default Home
