import Head from 'next/head';
import { useState } from 'react';
import styles from './index.module.css';

export default function Home() {
  const [animalInput, setAnimalInput] = useState('');
  const [result, setResult] = useState();

  async function onSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ animal: animalInput })
      });

      const data = await response.json();

      if (response.status !== 200) {
        console.error(data.error || `Request failed with status ${response.status}`);
        return;
      }

      setResult(data.result);
      setAnimalInput('');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={styles.body}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <img src="/favicon.ico" alt="" className={styles.icon} />
        <h3>Name My Pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            value={animalInput}
            onChange={e => {
              setAnimalInput(e.target.value);
            }}
            placeholder="Enter an animal"
          />
          <input
            type="submit"
            value="Generate names"
          />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}
