import { useRouter } from 'next/router';
import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Detail.module.css'
import Link from 'next/link';


export default function Details () {
  const {
    query:{id}
  } = useRouter()

interface Details{
  name:string;
  type:[string];
  stats:[{name:string; value:number}];
  image:string;
}

  const [pokemon, setPokemon] = useState<null | Details>(null)




  useEffect(()=>{
    async function getPokemon() {
     const res = await fetch(`https://jherr-pokemon.s3.us-west-1.amazonaws.com/pokemon/${id}.json`)
     const data = await res.json()
     setPokemon(data)
    }
    if (id) {
getPokemon()
    }
  },[id])

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