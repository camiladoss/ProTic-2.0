import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import Index from "pages/Index";
import Layout from "Layouts/PublicLayout";
import Home from "pages/Home";
import PrivateLayout from "Layouts/PrivateLayout";
import GestionProyectos from "pages/Proyectos/GestionProyectos";
import CrearProyectos from "pages/Proyectos/CrearProyectos";
import CrearInscripcion from "pages/inscripciones/CrearInscripcion";
import GestionInscripcion from "pages/inscripciones/GestionInscripciones";
import CrearAvances from "pages/avances/CrearAvances";
import GestionAvances from "pages/avances/GestionAvances";
import HistorialAvances from "pages/avances/HistorialAvances";
import Perfil from "pages/Perfil";
import IndexUsuarios from "pages/usuarios/IndexUsuarios";
import EditarUsuario from "pages/usuarios/EditarUsuario";
import AuthLayout from "Layouts/AuthLayout";
import Register from "pages/auth/Register";
import Login from "pages/auth/Login";
import MisProyectos from "pages/Proyectos/MisProyectos";
import PasswordReset from "pages/auth/PasswordReset";
import { AuthContext } from "context/authContext";
import { UserContext } from "context/userContext";
import { setContext } from "@apollo/client/link/context";
import jwt_decode from "jwt-decode";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = JSON.parse(localStorage.getItem("token"));
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

function App() {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState("");

  const setToken = (token) => {
    console.log("set token", token);
    setAuthToken(token);
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
    } else {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    if (authToken) {
      const decoded = jwt_decode(authToken);
      setUserData({
        _id: decoded._id,
        nombre: decoded.nombre,
        apellido: decoded.apellido,
        identificacion: decoded.identificacion,
        correo: decoded.correo,
        rol: decoded.rol,
        estado: decoded.estado,
      });
    }
  }, [authToken]);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ authToken, setAuthToken, setToken }}>
        <UserContext.Provider value={{ userData, setUserData }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Index />} />
              </Route>
              <Route path="/auth" element={<AuthLayout />}>
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="passwordReset" element={<PasswordReset />} />
              </Route>
              <Route path="/" element={<PrivateLayout />}>
                <Route path="/Home" element={<Home />} />
                <Route path="/Usuarios" element={<IndexUsuarios />} />
                <Route
                  path="/Usuarios/EditarUsuario/:_id"
                  element={<EditarUsuario />}
                />
                <Route
                  path="/Usuarios/CrearUsuario"
                  element={<EditarUsuario />}
                />
                <Route
                  path="/GestionProyectos"
                  element={<GestionProyectos />}
                />
                <Route path="/CrearProyectos" element={<CrearProyectos />} />
                <Route
                  path="/GestionProyectos/EditarProyecto/:_id"
                  element={<CrearProyectos />}
                />
                <Route
                  path="/Proyectos/MisProyectos"
                  element={<MisProyectos />}
                />
                <Route
                  path="/GestionInscripcion"
                  element={<GestionInscripcion />}
                />
                <Route
                  path="/Inscripciones/CrearInscripcion"
                  element={<CrearInscripcion />}
                />
                <Route
                  path="/Inscripciones/EditarInscripcion/:_id"
                  element={<CrearInscripcion />}
                />
                <Route path="/GestionAvances/:_id" element={<GestionAvances />} />
                <Route
                  path="/GestionAvances/EditarAvances/:_id"
                  element={<CrearAvances />}
                />
                <Route
                  path="/GestionAvances/CrearAvances/:_id"
                  element={<CrearAvances />}
                />
                <Route path="/Historial" element={<HistorialAvances />} />
                <Route path="/Perfil" element={<Perfil />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </UserContext.Provider>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
