import React from 'react'
import { Link } from "react-router-dom";

const GestionAvances = () => {
    return (
        <div className="flex flex-col items-center w-9/12 m-auto">
      {/* <div className="flex self-end">
        <button className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded">
          <Link to="/CrearAvances">
            Nuevo proyecto
          </Link>
        </button>
      </div> */}
      <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">Avances</h2>
      <input  className="bg-gray-200 text-gray-700 border rounded py-2 px-2 mb-3 focus:outline-none focus:bg-white"
      placeholder="Buscar" />
      <table className="border-b border-blue-300 shadow">
        <thead className="bg-maximunBlue">
          <tr>
            <th className="px-6 py-2 text-md text-gray-700">Proyecto</th>
            <th className="px-6 py-2 text-md text-gray-700">Avances</th>
            <th className="px-6 py-2 text-md text-gray-700">Fecha</th>
            <th className="px-6 py-2 text-md text-gray-700">Agregar avance</th>
          </tr>
        </thead>
        <tbody className="bg-columbiaBlue">
          <tr className="whitespace-nowrap">
            <td className="px-6 py-4 text-md text-gray-600">Parkinson's disease</td>
            <td className="px-6 py-4 text-md text-gray-600">Se investigan las señales</td>
            <td className="px-6 py-4 text-md text-gray-600">12-11-2021</td>
            <td className="px-6 py-4 text-md text-gray-600">
                <Link className="px-4 py-1 text-md mr-2 text-white bg-green-400 rounded fas fa-plus" to="/Historial"></Link>
            </td>
          </tr>
          <tr className="whitespace-nowrap">
            <td className="px-6 py-4 text-md text-gray-600">Web development</td>
            <td className="px-6 py-4 text-md text-gray-600">Camila Dossman</td>
            <td className="px-6 py-4 text-md text-gray-600">543245</td>
            <td className="px-6 py-4 text-md text-gray-600">
                <Link className="px-4 py-1 text-md mr-2 text-white bg-green-400 rounded fas fa-plus" to="/Historial"></Link>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    )
}

export default GestionAvances
