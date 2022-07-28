import Image from 'next/image';
import type { GetStaticProps, NextPage } from 'next'

import { IPokemon } from '../interfaces/IPokemon';
import Link from 'next/link';
import Head from 'next/head';

interface IHome {
  pokemons: {name: string, img: string}[];
}

const Home: NextPage<IHome> = ({ pokemons }) => {

  return (
    <>
      <Head>
        <meta name='description' content='pokemon, pokedex, pokemons' />
        <meta name='robots' content='index, follow' />
        <meta name='author' content='Miguel Jara' />
        <title>Miguel Jara - Pokedex</title>
      </Head>
      <ul className='list-group mx-auto'>
        {pokemons.map((p, idx) => (
          <li key={p.name} className='list-group-item bg-dark'>
            <Image src={p.img} width={90} height={90} alt={p.name} />
            <Link href={`pokemon/${idx + 1}`}>
              <a>
                <h1 className='text-light text-uppercase'>{p.name}</h1>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {

  let pokemons: {name: string, img: string}[] = [];

  for(let i = 0; i < 151; i++) {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`);
    const data: IPokemon = await resp.json();
    pokemons.push({name: data.name, img: data.sprites.other!.dream_world.front_default});
  }
  
  return {
    props: {
      pokemons: pokemons
    }
  }
} 

export default Home;