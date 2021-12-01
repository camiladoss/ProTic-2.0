import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Index from 'pages/Index'
import Layout from 'Layouts/PublicLayout'
import Home from 'pages/Home'
import PrivateLayout from 'Layouts/PrivateLayout'
import GestionProyectos from "pages/GestionProyectos";
import CrearProyectos from "pages/CrearProyectos";
import CrearAvances from "pages/CrearAvances";
import GestionAvances from "pages/GestionAvances";
import CrearInscripcion from "pages/inscripciones/CrearInscripcion";
import GestionInscripcion from "pages/inscripciones/GestionInscripciones"
import HistorialAvances from "pages/HistorialAvances";
import Perfil from "pages/Perfil";
import IndexUsuarios from "pages/usuarios/IndexUsuarios";
import EditarUsuario from "pages/usuarios/EditarUsuario";
import AuthLayout from 'Layouts/AuthLayout'
import Register from 'pages/auth/Register'
import Login from "pages/auth/Login";
import MisProyectos from 'pages/Proyectos/MisProyectos'
import PasswordReset from "pages/auth/PasswordReset";
import { AuthContext } from 'context/authContext'
import { UserContext } from 'context/userContext';
import { setContext } from '@apollo/client/link/context';
import jwt_decode from "jwt-decode";

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem('token'));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState('');

  const setToken = (token) => {
    console.log('set token', token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem('token', JSON.stringify(token));
    }else{
      localStorage.removeItem('token');
    }
  };

  useEffect(()=>{
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
        estado:decoded.estado,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
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
                <Route path="/Usuarios/CrearUsuario" element={<EditarUsuario/>} />
                <Route path="/GestionProyectos" element={<GestionProyectos/>} />
                <Route path="/CrearProyectos" element={<CrearProyectos/>} />
                <Route path="/GestionAvances" element={<GestionAvances/>} />
                <Route path="/CrearAvances" element={<CrearAvances/>} />
                <Route path="/GestionInscripcion" element={<GestionInscripcion/>} />
                <Route path="/Inscripciones/CrearInscripcion" element={<CrearInscripcion/>} />
                <Route path="/Proyectos/MisProyectos" element={<MisProyectos/>} />
                <Route path="/Inscripciones/EditarInscripcion/:_id" element={<CrearInscripcion/>} />
                <Route path="/Historial" element={<HistorialAvances/>} />
                <Route path="/Perfil" element={<Perfil/>} />
                <Route path="/GestionAvances" element={<GestionAvances/>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
