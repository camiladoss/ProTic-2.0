import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INSCRIPCION } from "graphql/inscripciones/queries";
import { toast } from "react-toastify";
// import useFormData from 'hooks/useFormData';
import { EDITAR_INSCRIPCION } from "graphql/inscripciones/mutations";
import PrivateRoute from "components/PrivateRoute";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";


const CrearInscripcion = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({ mode: "onBlur" });
  const { _id } = useParams();

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_INSCRIPCION, {
    variables: { _id },
  });
  const [editarInscripcion, { error: mutationError }] =
    useMutation(EDITAR_INSCRIPCION);

  useEffect(() => {
    console.log("Data servidor", queryData);
  }, [queryData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultado inscripciones");
    }
    if (mutationError) {
      toast.error("Error modificado inscripciones");
    }
  }, [queryError, mutationError]);

  const onSubmit = (data) => {
    console.log(data);
    editarInscripcion({
      variables: { _id, ...data },
    });
    toast.success("Inscripcion modificado con exito");
    navigate("/GestionInscripcion");
  };

  if (queryLoading) {
    return <div>Cargando...</div>;
  }

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
      <PrivateRoute roleList={["ADMINISTRADOR", "ESTUDIANTE", "AUTORIZADO"]}>
        <form className="w-full items-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-5 gap-x-10 mx-3 mb-6 md:grid-cols-2 items-center">
            <div className="w-full md:mb-0 flex flex-col ">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-first-name"
              >
                Nombre del proyecto:
              </label>
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                defaultValue={queryData.Inscripcion.proyecto.nombre}
                placeholder="Nombre del proyecto"
                name="nombreProyecto"
                {...register("nombreProyecto", {
                  required: {
                    value: true,
                    massage: "El campo es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ\s-Z0-9_.+-,]{4,100}$/i,
                    massage: "El valor no es correcto",
                  },
                })}
              />
              {errors.nombreProyecto?.type === "required" && (
                <span className="text-red-600">"El nombre es requerido!"</span>
              )}
              {errors.nombreProyecto?.type === "pattern" && (
                <span className="text-red-600">
                  "El nombre solo puede llevar letras!"
                </span>
              )}
            </div>
            <div className="w-full md:mb-0 flex flex-col">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-objG"
              >
                ID del proyecto:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-objG"
                type="text"
                placeholder="ID del proyecto"
                defaultValue={queryData.Inscripcion.proyecto._id}
                disabled
                name="idProyecto"
              />
            </div>
            <div className="w-full md:mb-0 flex flex-col">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-objG"
              >
                ID del estudiante:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-objG"
                type="text"
                placeholder="ID del estudiante"
                defaultValue={queryData.Inscripcion.estudiante._id}
                name="idEstudiante"
                disabled
              />
            </div>
            <div className="w-full md:mb-0 flex flex-col">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-objG"
              >
                ID de la inscripción:
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-objG"
                type="text"
                placeholder="ID de la inscripción"
                defaultValue={queryData.Inscripcion._id}
                name="idInscripcion"
                disabled
              />
            </div>
            <div className="w-full md:mb-0 flex flex-col">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="dateIn"
              >
                Fecha de ingreso:
              </label>
              <input
                type="date"
                placeholder="Fecha de ingreso"
                defaultValue={queryData.Inscripcion.fechaIngreso}
                name="fechaIngreso"
                id="dateIn"
                {...register("fechaIngreso", {
                  required: {
                    value: true,
                    massage: "El campo es requerido",
                  },
                  pattern: {
                    value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i,
                    massage: "El valor no es correcto",
                  },
                })}
              />
              {errors.fechaIngreso?.type === "required" && (
                <span className="text-red-600">"La fecha es requerida!"</span>
              )}
              {errors.fechaIngreso?.type === "pattern" && (
                <span className="text-red-600">
                  "La fecha solo puede llevar dd/mm/yyyy!"
                </span>
              )}
            </div>

            <div className="w-full md:mb-0 flex flex-col">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="dateEg"
              >
                Fecha de egreso:
              </label>
              <input
                type="date"
                placeholder="Fecha de Egreso "
                defaultValue={queryData.Inscripcion.fechaEgreso}
                name="fechaEgreso"
                id="dateEg"
                {...register("fechaEgreso", {
                  required: {
                    value: true,
                    massage: "El campo es requerido",
                  },
                  pattern: {
                    value: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i,
                    massage: "El valor no es correcto",
                  },
                })}
              />
              {errors.fechaEgreso?.type === "required" && (
                <span className="text-red-600">"La fecha es requerida!"</span>
              )}
              {errors.fechaEgreso?.type === "pattern" && (
                <span className="text-red-600">
                  "La fecha solo puede llevar dd/mm/yyyy!"
                </span>
              )}
            </div>

            <div className="w-full  mb-6 md:mb-0">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-state"
              >
                Estado:
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  defaultValue={queryData.Inscripcion.estado}
                  name="estado"
                  {...register("estado", {
                    required: {
                      value: true,
                      massage: "El campo es requerido",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/i,
                      massage: "El valor no es correcto",
                    },
                  })}
                >
                  <option>ACEPTADA</option>
                  <option>RECHAZADA</option>
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
              {errors.estado?.type === "required" && (
                <span className="text-red-600">"La estado es requerido!"</span>
              )}
              {errors.estado?.type === "pattern" && (
                <span className="text-red-600">
                  "El estado no esta disponible!"
                </span>
              )}
            </div>
          </div>
          <div className="md:col-start-1 md:col-end-3 flex justify-center">
            <button
              className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded"
              type="submit"
            >
              Editar
            </button>
          </div>
        </form>
      </PrivateRoute>
    </div>
  );
};

export default CrearInscripcion;
