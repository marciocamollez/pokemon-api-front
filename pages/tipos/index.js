import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Menu from '../../components/Menu'


export async function getStaticProps(){
    const res = await fetch("https://pokeapi.co/api/v2/type"); //Chama a URL da API
    const data = await res.json(); //Transforma em JSON

    //console.log(data.results); //Exibe no console para mostrar que puxou

    return{
        props: {
            data, //transforma tudo em uma variável DATA
        },
    };
}

export default function Tipos({ data }){ //Puxa a variável pra cá

    const dados = data.results; //Armazena em outra chamado dados, pois dentro do json nesse caso tem um array chamado RESULTS. Precisa colocar data.results pra acessar especificamente a lista

    return(
        <div>
            <Head>
                <title>Pokemóns - Lista</title>
                <meta name='robots' content='index,follow' />
                <meta name='description' content='Tipos de Pokémons' />
            </Head>

            <Menu />

            <div className="container">
                <h1>Tipos de Pokémons</h1>

                <div className="row">
                    {dados && dados.map((dados) => (
                        <div key={dados.name} className="col-12 col-sm-4 col-md-3 col-lg-3">
                            <Link href={`/tipos/${dados.id}`}>{dados.name}</Link>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}