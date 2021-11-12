import React from "react";
import { Link } from "react-router-dom";

const CrearProyectos = () => {
  return (
    <div className="">
      <main>
        <button className="botonVolver">
          <Link to="/ventas"></Link>
        </button>
        <h2 className="tituloGestionVentas">Registro de venta</h2>
        <form className="w-full max-w-lg">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0 flex flex-row">
            <label className="block tracking-wide text-gray-700 text-md font-bold mr-2 mt-2" for="grid-first-name">Nombre:</label>
            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="nombre" />
          </div>

          <div>
            <label>Objetivos generales:</label>
            <input type="text" placeholder="objetivos generales" />
          </div>

          <div>
            <label>Objetivos específicos:</label>
            <input type="text" placeholder="Objetivos específicos" />
          </div>

          <div>
            <label>Presupuesto:</label>
            <input type="number" placeholder="$$$" />
          </div>

          <div>
            <label>Fecha de inicio:</label>
            <input type="date" placeholder="Fecha de inicio" />
          </div>

          <div>
            <label>Fecha de terminación:</label>
            <input type="date" placeholder="Fecha de terminación" />
          </div>

          <div>
            <label>Nombre lider:</label>
            <label>ID lider:</label>
          </div>

          <label>Estado:</label>
          <div>
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option>Activo</option>
              <option>Inactivo</option>
            </select>
          </div>

          <label>Fase del proyecto:</label>
          <div>
            <select
              class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state"
            >
              <option>Iniciado</option>
              <option>En desarrollo</option>
              <option>Terminado</option>
            </select>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CrearProyectos;
