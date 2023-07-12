import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [count, setCount] = useState(0);
  const [animalInput, setAnimalInput] = useState('');

  async function onSubmit(e) {
    e.preventDefault();

    if (count === 10) {
      return console.log('you have reached your limit');
    }

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
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      setCount(prev => prev + 1);
      setAnimalInput('');
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <img src="/favicon.ico" alt="" />
          <h3>Name My Pet</h3>
          <p>You have used this app {count} times</p>
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
        </main>
      </div>
    </>
  );
}
