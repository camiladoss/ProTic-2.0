import React from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "context/authContext";
import PrivateComponent from "./PrivateComponent";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const { authToken, setToken } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    setActive(!active);
  };

  const deleteToken = () => {
    setToken(null);
    navigate("/");
  };
  return (
    <nav className="flex items-center flex-wrap p-3 bg-indigoDye  ">
      <a href="/" className="inline-flex items-center p-2 mr-4 ">
        <span className="text-xl text-white font-bold tracking-wide">
          ProTic 2.0
        </span>
      </a>
      <button
        className=" inline-flex p-3 rounded lg:hidden text-white ml-auto outline-none hover:bg-carolinaBlue "
        onClick={handleClick}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <div
        className={`${
          active ? "" : "hidden"
        }   w-full lg:inline-flex lg:flex-grow lg:w-auto`}
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          <NavLink
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white "
            to="Home"
          >
            Inicio
          </NavLink>
          <NavLink
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white "
            to="Perfil"
          >
            Perfil
          </NavLink>
          <PrivateComponent
            roleList={["ESTUDIANTES", "AUTORIZADO", "AUTORIZADO"]}
          >
            <NavLink
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white "
              to="Inscripciones"
            >
              Inscripciones
            </NavLink>
          </PrivateComponent>
          <PrivateComponent roleList={["LIDER", "ADMINISTRADOR", "ESTUDIANTE", "AUTORIZADO"]}>
            <NavLink
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white "
              to="/GestionProyectos"
            >
              Proyectos
            </NavLink>
          </PrivateComponent>
          <PrivateComponent roleList={["ESTUDIANTE", "LIDER", "AUTORIZADO"]}>
            <NavLink
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white "
              to="/Proyectos/MisProyectos"
            >
              Mis Proyectos
            </NavLink>
          </PrivateComponent>
          <PrivateComponent roleList={["ADMINISTRADOR", "AUTORIZADO"]}>
            <NavLink
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white "
              to="Usuarios"
            >
              Usuarios
            </NavLink>
          </PrivateComponent>
          {authToken ? (
            <button
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white"
              onClick={() => {
                deleteToken();
              }}
            >
              Logout
            </button>
          ) : (
            <NavLink
              className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-white font-bold items-center justify-center buttonsNavBar hover:text-white "
              to="/auth/login"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
