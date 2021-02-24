import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Menu from '../components/Menu'



export async function getStaticProps() {
  const pokemons = await fetch('https://pokeapi.co/api/v2/pokedex/2/')
    .then((respostaDoServer) => {
      if (respostaDoServer.ok) {
        return respostaDoServer.json();
      }

      throw new Error('Deu problema');
    })
    .then((respostaEmObjeto) => respostaEmObjeto.pokemon_entries);

  return {
    props: {
      pokemons,
    },
  };
}

export default function Home(props) {
  const { pokemons } = props;

  return (
    <div>
        <Head>
            <title>Pokemóns - Lista</title>
            <meta name='robots' content='index,follow' />
            <meta name='description' content='Lista de Pokémons' />
        </Head>
        
        <Menu />

        
        <div className="container">
            <h1>Lista de Pokemons</h1>
            <div className="lista-titulo">
                <div className="row">
                    {pokemons.map((pokemon) => (
                        <div key={pokemon.entry_number} className="col-12 col-sm-4 col-md-3 col-lg-3">
                            <Link href={`/pokemon/${pokemon.entry_number}`}>
                            <a>
                                {pokemon.pokemon_species.name}<br />
                               
                            </a>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        
          </div>
    </div>
  );
}