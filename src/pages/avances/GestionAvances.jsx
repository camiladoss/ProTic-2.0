import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_FILTRARAVANCES } from "graphql/avances/queries";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import PrivateComponent from "components/PrivateComponent";
import { ACCESO_ESTUDIANTE } from "graphql/inscripciones/queries";

const GestionAvances = () => {
  const navigate = useNavigate();
  const { _id } = useParams();

  useEffect(() => {
    console.log(_id);
  }, [_id]);

  const { data:querydata, loading:loadingData } = useQuery(GET_PROYECTO, {
    variables: { _id },
  });

  const { data, error, loading } = useQuery(GET_FILTRARAVANCES, {
    variables: { _id },
    fetchPolicy: "no-cache",
  });

  const { data: queryData, loading:queryLoading } = useQuery(ACCESO_ESTUDIANTE,{
    variables: { _id },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error("Error consultando los avances");
    }
  });

  useEffect(() => {
    console.log("Data servidor", queryData);
  }, [queryData]);

  if (loading && loadingData && queryLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center w-9/12 m-auto">
      <div className="flex justify-between w-full ">
        <div className="">
          <Link to="/Proyectos/MisProyectos">
            {" "}
            <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i>
          </Link>
        </div>
        {querydata !== undefined && querydata.Proyecto.estado !== "INACTIVO" && querydata.Proyecto.fase !== "TERMINADO" ? (
            <PrivateComponent roleList={["ESTUDIANTE", "AUTORIZADO"]}>
              <button
                className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded"
                onClick={() => {
                  navigate(`/GestionAvances/CrearAvances/${_id}`);
                }}
              >
                Nuevo Avance
              </button>
            </PrivateComponent>
        ) : (
          null
        )}
      </div>
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
            data.filtrarAvance.map((a) => {
              return (
                <tr className="whitespace-nowrap" key={a._id}>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {a.proyecto.nombre}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {a.descripcion}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {a.creadoPor.nombre} {a.creadoPor.apellido}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">{a.fecha}</td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {a.proyecto.estado === "INACTIVO" ||
                    a.proyecto.fase === "TERMINADO" ? null : (
                      <button
                        onClick={() => {if (queryData.FiltroEstudiante.length){  navigate(`/GestionAvances/EditarAvances/${a._id}`); }else{           toast.error("Error consultado inscripciones")}
                        }}
                        className="px-4 py-1 text-md mr-2 text-white bg-green-400 rounded fas fa-pen"
                        to="/Historial"
                      ></button>
                    )}
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
