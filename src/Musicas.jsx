import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './Musicas.css';

export default function Musicas() {
    let apiKey = 'b19cdb5c459071ba668d0ef3d15e4e9d';
    const { artista, nomeDoAlbum } = useParams();
    const [musicas, setMusicas] = useState([]);
    const [informacoesDoAlbum, setInformacoesDoAlbum] = useState({});
    const [tags, setTags] = useState([]);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {
        musicasDoArtista();
    }, [])

    const musicasDoArtista = async () => {
        setCarregando(true);
        try {
            const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${artista}&album=${nomeDoAlbum}&format=json`;
            const response = await axios.get(url);
            console.log(response.data.album.tracks.track);
            setMusicas(response.data.album.tracks.track || []);
            setInformacoesDoAlbum(response.data.album);
            setTags(response.data.album.tags.tag || []);
        } catch (error) {
            console.error(error);
        } finally {
            setCarregando(false);
        }
    }

    return (
        <>
            <div className='container'>
                <div className='container-voltar'>
                    <Link className='btnVoltar' to={'/'}>Voltar</Link>
                </div>

                <div className='container-musicas'>
                    {carregando ? (
                        <>
                            <div className='container-carregando'>
                                <h2>Carregando...</h2>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='info-album'>
                                <img className='img' src={informacoesDoAlbum.image?.[2]?.['#text']} alt={informacoesDoAlbum.name} />
                                <h2>{informacoesDoAlbum.name}</h2>
                                <p className='p-artista'>{informacoesDoAlbum.artist}</p>

                                <div className='container-tags'>
                                    {tags?.length > 0 ? (
                                        tags.map((tag, key) =>
                                            <span className='tag' key={key}>{tag.name}</span>
                                        )
                                    ) : (
                                        <p>Nenhuma tag encontrada!</p>
                                    )
                                    }
                                </div>
                            </div>

                            <div className='musicas'>
                                <ul className='lista-musicas'>
                                    {musicas?.length > 0 ? (
                                        musicas.map((musica, key) =>
                                            <li className='item-musica' key={key}>
                                                <p>{musica['@attr'].rank}.</p>
                                                <p>{musica.name}</p>
                                            </li>
                                        )
                                    ) : (
                                        <p>Nenhuma música encontrada!</p>
                                    )}
                                </ul>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
