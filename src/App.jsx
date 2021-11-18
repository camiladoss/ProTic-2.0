import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Index from 'pages/Index'
import Layout from 'Layouts/PublicLayout'
import Home from 'pages/Home'
import PrivateLayout from 'Layouts/PrivateLayout'
import GestionProyectos from "pages/GestionProyectos";
import CrearProyectos from "pages/CrearProyectos";
import CrearAvances from "pages/CrearAvances";
import Perfil from "pages/Perfil";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route  path="/" element={<Layout/>}>
          <Route path="/" element={<Index/>} />
        </Route>
        <Route  path="/" element={<PrivateLayout/>}>
          <Route path="/home" element={<Home/>} />
          <Route path="/GestionProyectos" element={<GestionProyectos/>} />
          <Route path="/CrearProyectos" element={<CrearProyectos/>} />
          <Route path="/CrearAvances" element={<CrearAvances/>} />
          <Route path="/Perfil" element={<Perfil/>} />
        </Route>

      </Routes>     
  </BrowserRouter>
  );
}

export default App;
