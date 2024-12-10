import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
    let apiKey = 'b19cdb5c459071ba668d0ef3d15e4e9d';
    const [nomeDoAlbum, setNomeDoAlbum] = useState('');
    const [albuns, setAlbuns] = useState([]);
    const [carregando, setCarregando] = useState(false);

    const buscarAlbuns = async () => {
        setCarregando(true);
        try {
            const url = `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${nomeDoAlbum}&api_key=${apiKey}&format=json`;
            const response = await axios.get(url);
            console.log(response.data.results.albummatches.album);
            setAlbuns(response.data.results.albummatches.album);
            setNomeDoAlbum('');
        } catch (error) {
            console.error(error);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <>
            <div className='container'>
                <div className='container-buscar'>
                    <input
                        type="text"
                        placeholder='Buscar álbum'
                        onChange={(nomeAlbum) => setNomeDoAlbum(nomeAlbum.target.value)}
                        value={nomeDoAlbum}
                    />

                    <button className='btnBuscar' onClick={buscarAlbuns}>Buscar</button>
                </div>

                <div className='container-albuns'>
                    {carregando ? (
                        <>
                            <div className='container-carregando'>
                                <h2>Carregando...</h2>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='albuns'>
                                <ul className='lista-albuns'>
                                    {albuns.map((album, key) => (
                                        <Link to={`/musicas/${album.artist}/${album.name}`} key={key}>
                                            <li className='item-album'>
                                                <div className='container-img'>
                                                    <img className='img' src={album.image[2]?.['#text']} alt={album.name} />
                                                </div>
                                                <div className='container-infos'>
                                                    <p className='p-nome'>{album.name}</p>
                                                    <p className='p-artista'>{album.artist}</p>
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
