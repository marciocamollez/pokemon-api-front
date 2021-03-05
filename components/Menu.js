import React from 'react';
import Link from 'next/link';

export default function Menu(){
    return(
        <div>
            <div className="container">
                <ul>
                    <li><Link href="/"><a>Home</a></Link></li>
                </ul>
                
                
            </div>
        </div>
    )
}