import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTOS } from "graphql/proyectos/queries";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "context/userContext";
import { CREAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import PrivateComponent from "components/PrivateComponent";

const GestionProyectos = () => {
  const navigate = useNavigate();
  const { data, error, loading } = useQuery(GET_PROYECTOS, {
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    console.log("Data servidor", data);
  }, [data]);

  useEffect(() => {
    if (error) toast.error("Error consultado proyectos");
  }, [error]);

  const { userData } = useUser();
  const [inscripcion, { error: mutationError }] = useMutation(
    CREAR_INSCRIPCION,
    { errorPolicy: "all" }
  );
  useEffect(() => {
    if (error) {
      toast.error("Error consultado usuarios");
    }
    if (mutationError) {
      toast.error("Error modificado el usuario");
    }
  }, [error, mutationError]);

  const CrearInscripcion = (proyecto) => {
    console.log(userData._id);
    console.log(data.Proyectos);
    inscripcion({
      variables: { estudiante: userData._id, proyecto: proyecto },
    });
    toast.success("Inscripción realizada con éxito");
    window.location.reload(false);
  };

  const obj = userData._id;

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center w-9/12 m-auto">
      <PrivateComponent roleList={["LIDER", "AUTORIZADO"]}>
        <div className="flex self-end">
          <button className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded">
            <Link to="/CrearProyectos">Nuevo proyecto</Link>
          </button>
        </div>
      </PrivateComponent>
      <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">
        Todos los proyectos
      </h2>
      <input
        className="bg-gray-200 text-gray-700 border rounded py-2 px-2 mb-3 focus:outline-none focus:bg-white"
        placeholder="Buscar"
      />
      <table className="border-b border-blue-300 shadow">
        <thead className="bg-maximunBlue">
          <tr>
            <th className="px-6 py-2 text-md text-gray-700">Proyecto</th>
            <th className="px-6 py-2 text-md text-gray-700">Líder</th>
            <th className="px-6 py-2 text-md text-gray-700">Estado </th>
            <th className="px-6 py-2 text-md text-gray-700">Fase </th>
            {userData.rol === "LIDER" ? (
              <th className="px-6 py-2 text-md text-gray-700">Editar</th>
            ) : (
              <th className="px-6 py-2 text-md text-gray-700">Inscribirse</th>
            )}
          </tr>
        </thead>
        <tbody className="bg-columbiaBlue">
          {data &&
            data.Proyectos.map((p) => {
              return (
                <tr key={p._id} className="whitespace-nowrap">
                  <td className="px-6 py-4 text-md text-gray-600">
                    {p.nombre}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {p.lider.nombre} {p.lider.apellido}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    {p.estado}
                  </td>
                  <td className="px-6 py-4 text-md text-gray-600">{p.fase}</td>
                  <td className="px-6 py-4 text-md text-gray-600">
                    <PrivateComponent roleList={["LIDER", "AUTORIZADO"]}>
                      <button
                        className="px-4 py-1 text-md mr-2 text-white bg-green-400 rounded fas fa-pen"
                        onClick={() => {
                          navigate(`/GestionProyectos/EditarProyecto/${p._id}`);
                        }}
                      ></button>
                    </PrivateComponent>
                    {p.inscripciones
                      .map((i) => i.estudiante._id)
                      .includes(obj) ? null : (
                      <PrivateComponent roleList={["ESTUDIANTE", "AUTORIZADO"]}>
                        <button
                          className="px-4 py-1 text-md ml-2 text-white bg-blue-400 rounded fas fa-plus"
                          onClick={() => {
                            CrearInscripcion(p._id);
                          }}
                        ></button>
                      </PrivateComponent>
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

export default GestionProyectos;
