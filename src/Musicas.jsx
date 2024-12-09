import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Musicas.css';

export default function Musicas() {
    let apiKey = 'b19cdb5c459071ba668d0ef3d15e4e9d';
    const { artista, album } = useParams();
    const [musicas, setMusicas] = useState([]);

    useEffect(() => {
        musicasDoArtista();
    }, [])

    const musicasDoArtista = async () => {
        try {
            const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${artista}&album=${album}&format=json`;
            const response = await axios.get(url);
            console.log(response.data.album);
            setMusicas(response.data.album);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className='container'>
                <div className='container-voltar'>
                    <Link className='btnVoltar' to={'/'}>Voltar</Link>
                </div>

                <div className='container-musicas'>
                    <img src={musicas.image[2]?.['#text']} alt={musicas.name} />
                    <p>Nome: {musicas.name}</p>
                </div>
            </div>
        </>
    );
}
