import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import Head from 'next/head';
import Menu from '../../components/Menu'


export default function Itens({data}){
    return(
        <div>
            <Head>
                <title>Pokemóns - Tipos</title>
                <meta name='robots' content='index,follow' />
                <meta name='description' content="Tipos de Pokémons" />
            </Head>

            <Menu />

            <div className="container">
                <h1>Tipos</h1>

                <div className="row">
                    {data && data.map((data) => (
                        <div key={data.id} className="col-12 col-sm-4 col-md-3 col-lg-3">
                            <p>{data.name}</p>
                        </div>
                    ))}
                </div>

                <Link href="/"><a>Voltar para Home</a></Link>
            </div>
        </div>
    )
}


export async function getStaticProps({params}){
    const rest = await fetch(`https://pokeapi.co/api/v2/type/${params.id}`);
    const data = await rest.json();

    console.log(data);

    return{
        props: {
            data,
        },
    }
}

export async function getStaticPaths(){
    const rest = await fetch("https://pokeapi.co/api/v2/type/1");
    const data = await rest.json();

    
    const paths = data.map((data) => ({
        params: { id: data.id },
    }))


    return { paths, fallback: false }

}




