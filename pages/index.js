import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Menu from '../components/Menu'



export async function getStaticProps() {
  const pokemons = await fetch('http://localhost:3000/pokemons')
  const posts = await pokemons.json()
      
  return {
    props: {
      posts,
    },
  };
}

export default function Home({ posts }) {
 
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
                  {posts.map((post) => (
                        <div key={post.id} className="col-12 col-sm-4 col-md-3 col-lg-3">
                            <Link href={`/pokemon/${post.id}`}>
                            <a>
                              <img src={post.image} />
                              {post.name}<br />
                               
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