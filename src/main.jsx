import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import Home from './Home.jsx';
import Musicas from './Musicas.jsx';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/musicas/:artista/:nomeDoAlbum', element: <Musicas /> }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
