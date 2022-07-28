import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { IPokemon } from "../../interfaces/IPokemon";
import Head from "next/head";

interface IPokemonPage {
  pokemon: {name: string, img: string, id: string | number}
}

const PokemonPage: NextPage<IPokemonPage> = ({ pokemon }) => {

  return (
    <>
      <Head>
        <title>{pokemon.id}# {pokemon.name}</title>
        <meta name="pokemon" content={pokemon.name} />
        <meta name="pokedex" content={`${pokemon.id}`} />
        <meta name="robots" content="index, follow"/>
      </Head>
      <Image src={pokemon.img} alt={pokemon.name} width='100%' height='500px' />
      <h1>{pokemon.id}# {pokemon.name}</h1>
      <button className='btn btn-primary'>
        <Link href='/'>
          <a className='text-decoration-none text-white'>Volver</a>
        </Link>
      </button>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  let paths: {params: {id: string}}[] = [];
  for(let i = 0; i < 151; i++) paths.push({params: {id: `${i + 1}`}}); 
  
  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  
  const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${ctx.params?.id}`);
  const data: IPokemon = await resp.json();
  const poke = {name: data.name, id: data.id, img: data.sprites.other?.dream_world.front_default}

  return {
    props: {
      pokemon: poke
    }
  }
}

export default PokemonPage;