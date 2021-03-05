import React from 'react'
import Link from 'next/link';
import Head from 'next/head';
import Menu from '../../components/Menu'



export async function getStaticProps({ params }) {
  const pokemons = await fetch(`http://localhost:3000/pokemons/${params.id}`)
  const posts = await pokemons.json()

  console.log(posts.evolution)

      
  return {
    props: {
      posts,
    },
  };
}



export async function getStaticPaths() { //Basicamente o mesmo código da Home, com diferença no return
    const pokemons = await fetch('http://localhost:3000/pokemons/1/')
    const posts = await pokemons.json()
        
    //console.log(posts.evolution);

    return {
      paths: [
        { params: { id: '1' } },
        { params: { id: '2' } },
        { params: { id: '3' } }
      ],
      fallback: false,
    };
  }
  

  export default function Pokemon({ posts }) {

    return (
        <div>
            <Head>
                <title>Pokemóns - {posts.name} </title>
                <meta name='robots' content='index,follow' />
                <meta name='description'  />
            </Head>

            <Menu />

            <div className="container">
                <h1>Nome: {posts.name}</h1>
                <img src={posts.image} />
                <p>Nível de Evolução: {posts.level_evolution}</p>
                
                
                
              
                
                <Link href="/"><a>Voltar para Home</a></Link>
            </div>
            
        </div>

    );
}
