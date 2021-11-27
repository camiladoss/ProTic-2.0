import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_AVANCE } from "graphql/avances/queries";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GestionAvances = () => {
  const navigate = useNavigate();
  const idProyecto = "6196cab23f6ee60be0d3e4ed";

  const { data, error, loading } = useQuery(GET_AVANCE, {variables:{idProyecto}});

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
            <th className="px-6 py-2 text-md text-gray-700">Fecha</th>
            <th className="px-6 py-2 text-md text-gray-700">Editar avance</th>
          </tr>
        </thead>
        <tbody className="bg-columbiaBlue">
          {data &&
            data.filtrarAvance.map((a) => {
              return (
                <tr className="whitespace-nowrap" key={a._id}>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {a.proyecto.nombre}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {a.descripcion}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">{a.fecha}</td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    <button
                      onClick={() => {
                        navigate(
                          `/GestionAvances/EditarAvances/${a.proyecto._id}`
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
