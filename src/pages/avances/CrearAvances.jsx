import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AVANCE } from "graphql/avances/queries";
import { toast } from "react-toastify";
import { EDITAR_AVANCE, CREAR_AVANCE } from "graphql/avances/mutations";
import { useForm } from "react-hook-form";
import PrivateRoute from "components/PrivateRoute";
import { useUser } from "context/userContext";

const CrearAvances = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const { _id } = useParams();
  const { userData } = useUser();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_AVANCE, {
    variables: { _id },
    onCompleted: (data) => reset(data.Avance),
  });

  const [editarAvance, { error: mutationError }] = useMutation(EDITAR_AVANCE);

  const [crearAvance, { error: createError }] = useMutation(CREAR_AVANCE);

  useEffect(() => {
    console.log("Data servidor", queryData);
  }, [queryData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultado el avance");
    }
    if (mutationError) {
      toast.error("Error modificado el avance");
    }
  }, [queryError, mutationError]);

  const onSubmit = (data) => {
    if (queryData.Avance) {
      editarAvance({
        variables: { _id, ...data },
      });
      toast.success("Avance modificado con exito");
      navigate(`/GestionAvances/${data.proyecto._id}`);
    } else {
      crearAvance({
        variables: { proyecto: _id, creadoPor: userData._id, ...data },
      });
      toast.success("Avance creado con exito");
      navigate(`/GestionAvances/${_id}`);
    }
  };

  if (queryLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center w-9/12 m-auto">
      <div className="flex self-start">
        <Link to="/GestionAvances">
          {" "}
          <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i>
        </Link>
      </div>
      {queryData.Avance ? (
        <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">
          Editar Avance
        </h2>
      ) : (
        <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">
          Crear de Avance
        </h2>
      )}
      <PrivateRoute roleList={["LIDER", "ESTUDIANTE", "AUTORIZADO"]}>
        <form className="w-full items-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-5 gap-x-10 mx-3 mb-6 md:grid-cols-2 items-center">
            {queryData.Avance ? (
              <div className="w-full md:mb-0 flex flex-col ">
                <label
                  className="text-gray-700 text-md font-bold"
                  htmlFor="grid-project-name"
                >
                  Nombre Proyecto:
                </label>
                <input
                  className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-project-name"
                  type="text"
                  defaultValue={queryData.Avance.proyecto.nombre}
                  name="nombreProyecto"
                  disabled
                />
              </div>
            ) : null}
            {queryData.Avance ? (
              <div className="w-full md:mb-0 flex flex-col">
                <label
                  className="text-gray-700 text-md font-bold"
                  htmlFor="grid-IdProyect"
                >
                  ID Proyecto:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-IdProyect"
                  type="text"
                  defaultValue={queryData.Avance._id}
                  name="idProyecto"
                  disabled
                />
              </div>
            ) : null}
            {queryData.Avance ? (
              <div className="w-full md:mb-0 flex flex-col">
                <label
                  className="text-gray-700 text-md font-bold"
                  htmlFor="grid-Date-avance"
                >
                  Fecha de Avance:
                </label>
                <input
                  type="date"
                  value="2013-01-31"
                  id="grid-Date-avance"
                  disabled
                />
              </div>
            ) : null}
            {queryData.Avance ? (
              <div className="w-full md:mb-0 flex flex-col ">
                <label
                  className="text-gray-700 text-md font-bold"
                  htmlFor="grid-creadoPor-name"
                >
                  Creado por:
                </label>
                <input
                  className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-creadoPor-name"
                  defaultValue={
                    queryData.Avance.creadoPor.nombre +
                    " " +
                    queryData.Avance.creadoPor.apellido
                  }
                  type="text"
                  disabled
                  name="creadoPor"
                />
              </div>
            ) : null}
            <div className="w-full md:col-start-1 md:col-end-3 flex flex-col">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-desc"
              >
                Descripción:
              </label>
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-desc"
                type="text"
                placeholder="Descripción del avance"
                name="descripcion"
                {...register("descripcion", {
                  required: {
                    value: true,
                    message: "Campo requerido",
                  },
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ\s-Z0-9_.+-,]{4,100}$/i,
                    message: "Valor incorrecto",
                  },
                })}
              />
              {errors.descripcion?.type === "required" && (
                <span className="text-red-600">
                  "La descripción es requerida!"
                </span>
              )}
              {errors.descripcion?.type === "pattern" && (
                <span className="text-red-600">"Valores inválidos"</span>
              )}
            </div>

            {queryData.Avance ? (
              <div className="w-full md:col-start-1 md:col-end-3 flex flex-col ">
                <label
                  className="text-gray-700 text-md font-bold"
                  htmlFor="grid-obs"
                >
                  Observaciones:
                </label>
                <input
                  className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-obs"
                  type="text"
                  placeholder="Observaciones del lider"
                  name="observaciones"
                  {...register("observaciones", {
                    required: {
                      value: false,
                      message: "Campo requerido",
                    },
                    disabled: userData.rol === "ESTUDIANTE",
                    pattern: {
                      value: /^[a-zA-ZÀ-ÿ\s-Z0-9_.+-,]{4,100}$/i,
                      message: "Valor incorrecto",
                    },
                  })}
                />
              </div>
            ) : null}
            {queryData.Avance ? (
              <div className="md:col-start-1 md:col-end-3 flex justify-center">
              <button
                className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded"
                type="submit"
              >
                Editar
              </button>
            </div>
            ) : (
              <div className="md:col-start-1 md:col-end-3 flex justify-center">
              <button
                className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded"
                type="submit"
              >
                Crear
              </button>
            </div>
            )}
          </div>
        </form>
      </PrivateRoute>
    </div>
  );
};

export default CrearAvances;
