"use client"
import Image from 'next/image'
import styles from './page.module.css'
import Chart from './Chart.js'

export default function Home() {
  return (
    <main className={styles.main}>
     <Chart/>
    </main>
  )
}
