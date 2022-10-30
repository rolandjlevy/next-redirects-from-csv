import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        
        <h2 className={styles.title}>
           Next.js redirects built from a CSV file
        </h2>
        
        <p className={styles.description}>
          Redirect routes:
          <code className={styles.code}>
            <br />
            <a href="/cromwell">/cromwell</a>
            <br />
            <a href="/google">/google</a>
            <br />
            <a href="/next">/next</a>
            <br />
            <a href="/react">/react</a>
          </code>
        </p>

        <p className={styles.description}>
          Custom route:
          <code className={styles.code}>
            <br />
            <a href="/hello">/hello</a>
          </code>
        </p>

      
      </main>

      <footer className={styles.footer}>
        <a
          href="/__repl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Built on
          <span className={styles.logo}>
            <Image src="/replit.svg" alt="Replit Logo" width={20} height={18} />
          </span>
          Replit
        </a>
      </footer>
    </div>
  )
}

export default Home
