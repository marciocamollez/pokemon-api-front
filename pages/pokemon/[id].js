import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import Head from 'next/head';
import Menu from '../../components/Menu'



export default function Pokemon({pokemon}) {
    return (
        <div>
            <Head>
                <title>Pokemóns - {pokemon.name}</title>
                <meta name='robots' content='index,follow' />
                <meta name='description' content={pokemon.name} />
            </Head>

            <Menu />

            <div className="container">
                <h1>Nome: {pokemon.name}</h1>
                <p>Número na Pokedex: {pokemon.id}</p>
                <p>Felicidade: {pokemon.base_happiness}</p>
                <p>Taxa de Captura: {pokemon.capture_rate}</p>
                <p>Cor: {pokemon.color.name}</p>
                <p>Cadeia de evolução: {pokemon.evolution_chain.url}</p>
                <p>Habitat: {pokemon.habitat.name}</p>
                <p>Forma: {pokemon.shape.name}</p>
                <p>Geração: {pokemon.generation.name}</p>
                
                
                <Link href="/"><a>Voltar para Home</a></Link>
            </div>
            
        </div>

    )
}






export async function getStaticProps({ params }) {
    const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${params.id}`)
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
  
        throw new Error('Deu problema');
      })
      .then((respostaEmObjeto) => respostaEmObjeto);
  
    return {
      props: {
        pokemon,
      },
    };
  }



export async function getStaticPaths() { //Basicamente o mesmo código da Home, com diferença no return
    const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
      .then((respostaDoServer) => {
        if (respostaDoServer.ok) {
          return respostaDoServer.json();
        }
        throw new Error('Deu problema');
      })
      .then((respostaEmObjeto) => respostaEmObjeto.pokemon_entries);
    return {
      paths: pokemons.map((pokemon) => ({ //pra cada pokemon na resposta, um caminho sera gerado
        params: {
          id: pokemon.entry_number.toString(), //necessario usar o toString porque não aceita inteiro como caminho (path)
        },
      })),
      fallback: false,
    };
  }
  