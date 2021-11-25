import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Index from 'pages/Index'
import Layout from 'Layouts/PublicLayout'
import Home from 'pages/Home'
import PrivateLayout from 'Layouts/PrivateLayout'
import GestionProyectos from "pages/Proyectos/GestionProyectos";
import CrearProyectos from "pages/Proyectos/CrearProyectos";
import CrearAvances from "pages/CrearAvances";
import GestionAvances from "pages/GestionAvances";
import Inscripciones from "pages/Inscripciones";
import HistorialAvances from "pages/HistorialAvances";
import Perfil from "pages/Perfil";
import IndexUsuarios from "pages/usuarios/IndexUsuarios";
import EditarUsuario from "pages/usuarios/EditarUsuario";
import AuthLayout from 'Layouts/AuthLayout'
import Register from 'pages/auth/Register'
import Login from "pages/auth/Login";
import PasswordReset from "pages/auth/PasswordReset";

const client = new ApolloClient({
  uri:"http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route  path="/" element={<Layout/>}>
            <Route path="/" element={<Index/>} />
          </Route>
          <Route  path="/auth" element={<AuthLayout/>}>
            <Route path="register" element={<Register/>} />
            <Route path="login" element={<Login/>} />
            <Route path="passwordReset" element={<PasswordReset/>} />
          </Route>
          <Route  path="/" element={<PrivateLayout/>}>
            <Route path="/home" element={<Home/>} />
            <Route path="/Usuarios" element={<IndexUsuarios/>} />
            <Route path="/Usuarios/EditarUsuario/:_id" element={<EditarUsuario/>} />
            <Route path="/Proyectos/GestionProyectos" element={<GestionProyectos/>} />
            <Route path="/Proyectos/CrearProyectos" element={<CrearProyectos/>} />
            <Route path="/GestionAvances" element={<GestionAvances/>} />
            <Route path="/CrearAvances" element={<CrearAvances/>} />
            <Route path="/Inscripciones" element={<Inscripciones/>} />
            <Route path="/Historial" element={<HistorialAvances/>} />
            <Route path="/Perfil" element={<Perfil/>} />
            <Route path="/GestionAvances" element={<GestionAvances/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
