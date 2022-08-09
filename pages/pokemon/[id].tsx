import Head from 'next/head'
import styles from '../../styles/Detail.module.css'
import Link from 'next/link';

export async function getServerSideProps ({params}:any) {
    const res = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${params.id}.json`)

    return{
      props: {
        pokemon: await res.json()
    }
}}

interface Details{
  name:string;
  type:[string];
  stats:[{name:string; value:number}];
  image:string;
}

export default function Details ({pokemon}:{pokemon:Details}) {


  if (!pokemon) {
    return null
  }
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
<div>
  <Link href="/">
    <a>Back to Home</a>
  </Link>
</div>
<div className={styles.layout}>
  <div>
    <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} className={styles.picture} alt={pokemon.name} />
  </div>
  <div>
    <h1 className={styles.name}>{pokemon.name}</h1>
    <div className={styles.type}>{pokemon.type.join(",")}</div>
    <table>
      <thead className={styles.header}>
        <tr>
          <th>Name</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        {pokemon.stats.map(({name, value}) => (
          <tr key={name}>
            <td className={styles.attribute}>{name}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </div>
  );
}
