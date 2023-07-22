import Link from 'next/link';
import MovieCard from '../components/MovieCard';
import styles from '@/app/styles/common.module.css';

export default async function Page() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const url = process.env.RAPID_KEY;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '72954cf98fmsh555c023bda10b2bp1046cbjsn643e48ea5d53',
      'X-RapidAPI-Host': 'netflix54.p.rapidapi.com',
    },
  };

  const res = await fetch(url, options);
  const data = await res.json();
  const main_data = data.titles;
  // console.log(data);

  return (
    <>
      <section className={styles.movieSection}>
        <div className={styles.container}>
          <h1>Series & Movie</h1>
          <div className={styles.card_section}>
            {main_data.map((currItem) => (
              <MovieCard key={currItem.id} {...currItem} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
