import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FILTRARAVANCES } from "graphql/avances/queries";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GestionAvances = () => {
  const navigate = useNavigate();
  const idProyecto = "61a15557c6e7bb5f2b79f6c3";

  const { data, error, loading } = useQuery(GET_FILTRARAVANCES, {variables:{idProyecto}});

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando los avances");
    }
  });

  if (loading) {
    return <div>Cargando...</div>;
  }

  
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
      <input
        className="bg-gray-200 text-gray-700 border rounded py-2 px-2 mb-3 focus:outline-none focus:bg-white"
        placeholder="Buscar"
      />
      <table className="border-b border-blue-300 shadow">
        <thead className="bg-maximunBlue">
          <tr>
            <th className="px-6 py-2 text-md text-gray-700">Proyecto</th>
            <th className="px-6 py-2 text-md text-gray-700">Avances</th>
            <th className="px-6 py-2 text-md text-gray-700">Creado por</th>
            <th className="px-6 py-2 text-md text-gray-700">Fecha</th>
            <th className="px-6 py-2 text-md text-gray-700">Editar avance</th>
          </tr>
        </thead>
        <tbody className="bg-columbiaBlue">
          {data &&
            data.FiltrarAvance.map((a) => {
              //let Date = (a.fecha)
              //let newDate = Date.toDateString()

              
              return (
                <tr className="whitespace-nowrap" key={a._id}>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {a.proyecto.nombre}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {a.descripcion}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">{a.creadoPor.nombre}{" "}{a.creadoPor.apellido}</td>
                  <td className="px-6 py-4 text-md text-gray-600">{a.fecha}</td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    <button
                      onClick={() => {
                        navigate(
                          `/GestionAvances/EditarAvances/${a._id}`
                        );
                      }}
                      className="px-4 py-1 text-md mr-2 text-white bg-green-400 rounded fas fa-plus"
                      to="/Historial"
                    ></button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default GestionAvances;
