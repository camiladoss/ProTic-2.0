import React from "react";
import { Link } from "react-router-dom";

const Inscripciones = () => {
  return (
    <div className="flex flex-col items-center w-9/12 m-auto">
      <div className="flex self-start">
        <button className="">
          <Link to="/GestionProyectos"></Link>
          <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i>
        </button>
      </div>

      <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">
        Inscripción a proyectos
      </h2>
      <form className="w-full items-center">
        <div className="grid grid-cols-1 gap-y-5 gap-x-10 mx-3 mb-6 md:grid-cols-2 items-center">
          <div className="w-full md:mb-0 flex flex-col ">
            <label
              className="text-gray-700 text-md font-bold"
              for="grid-first-name"
            >
              Nombre del proyecto:
            </label>
            <input
              className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Nombre del proyecto"
            />
          </div>
          <div className="w-full md:mb-0 flex flex-col">
            <label className="text-gray-700 text-md font-bold" for="grid-objG">
              ID del proyecto:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-objG"
              type="text"
              placeholder="ID del proyecto"
            />
          </div>
          <div className="w-full md:mb-0 flex flex-col">
            <label className="text-gray-700 text-md font-bold" for="grid-objG">
              ID del estudiante:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-objG"
              type="text"
              placeholder="ID del estudiante"
              required
            />
          </div>
          <div className="w-full md:mb-0 flex flex-col">
            <label className="text-gray-700 text-md font-bold" for="grid-objG">
              ID de la inscripción:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-objG"
              type="text"
              placeholder="ID de la inscripción"
            />
          </div>
          <div className="w-full md:mb-0 flex flex-col">
            <label className="text-gray-700 text-md font-bold">
              Fecha de ingreso:
            </label>
            <input type="date" placeholder="Fecha de ingreso" value="2021-11-17"   />
          </div>

          <div className="w-full md:mb-0 flex flex-col">
            <label className="text-gray-700 text-md font-bold">
              Fecha de egreso:
            </label>
            <input type="date" placeholder="Fecha de Egreso " value="2021-11-17"   />
          </div>

          <div className="w-full  mb-6 md:mb-0">
            <label className="text-gray-700 text-md font-bold" for="grid-state">
              Estado:
            </label>
            <div className="relative">
              <select
                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-state"
                
              >
                <option value="" disabled selected>
                  Seleccione un estado
                </option>
                <option>Aceptada</option>
                <option>Rechazada</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-start-1 md:col-end-3 flex justify-center">
          <button
            className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded"
            type="submit">
            Inscribirme
          </button>
        </div>
      </form>
    </div>
  );
};

export default Inscripciones;
