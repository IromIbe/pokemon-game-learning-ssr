import type { NextPage } from 'next'
import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

interface Pokemons{
id:number;
name:string;
image:string;
}

const Home: NextPage = () => {
  const [pokemon, setPokemon] = useState<Pokemons[]>([])



  useEffect(()=>{
    async function getPokemon() {
     const res = await fetch("https://jherr-pokemon.s3.us-west-1.amazonaws.com/index.json")
     const data = await res.json()
     setPokemon(data)
    }
getPokemon()
  },[])
  return (
    <div className={styles.container}>
<Head>
  <title>Pokemon List</title>
</Head>
<div className={styles.grid}>
 {pokemon.map((pokemon, i)=>(
  <div className={styles.card} key={pokemon.id}>
    <Link href={`pokemon/${pokemon.id}`}>
      <a>
        <img src={`https://jherr-pokemon.s3.us-west-1.amazonaws.com/${pokemon.image}`} alt={pokemon.name} />
        <h3>{pokemon.name}</h3>
      </a>
    </Link>
  </div>
 ))}
</div>
    </div>
  )
}

export default Home
