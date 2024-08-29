'use client';
import Image from "next/image";
import styles from "./page.module.css";
import Nasdaq from "../components/MainPage"

export default function Home() {
  return (
    <>
    <main className={styles.main}>
    
    <Nasdaq/>
    </main>
  </>
  );
}
