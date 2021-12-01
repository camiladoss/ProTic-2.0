import React from 'react'
import { Link } from "react-router-dom";

const HistorialAvances = () => {
    return (
        <div className="flex flex-col items-center w-9/12 m-auto">
        <div className="flex self-end">
          <Link to="/GestionAvances">
            <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i>
        </Link>
          <button className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded">
            <Link to="/CrearAvances">
              Nuevo Avance
            </Link>
          </button>
        </div>
        <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">Avances</h2>
        <input  className="bg-gray-200 text-gray-700 border rounded py-2 px-2 mb-3 focus:outline-none focus:bg-white"
        placeholder="Buscar" />
        <table className="border-b border-blue-300 shadow">
          <thead className="bg-maximunBlue">
            <tr>
              <th className="px-6 py-2 text-md text-gray-700">Id</th>
              <th className="px-6 py-2 text-md text-gray-700">Descripción</th>
              <th className="px-6 py-2 text-md text-gray-700">Fecha</th>
              <th className="px-6 py-2 text-md text-gray-700">Ver</th>

            </tr>
          </thead>
          <tbody className="bg-columbiaBlue">
            <tr className="whitespace-nowrap">
              <td className="px-6 py-4 text-md text-gray-600">123455</td>
              <td className="px-6 py-4 text-md text-gray-600">sflkfnsadlkfnmsdlkfmsdlkfmds</td>
              <td className="px-6 py-4 text-md text-gray-600">12-2-21 </td>
              <td>
                    <button className="px-4 py-1 text-md mr-2 text-white bg-gray-600 rounded fas fa-eye"></button>
            </td>
            </tr>
          </tbody>
        </table>
        </div>
    )
}

export default HistorialAvances
