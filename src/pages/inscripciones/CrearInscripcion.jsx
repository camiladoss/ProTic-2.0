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
    fetchPolicy: "no-cache",
    variables: { _id },
    onCompleted: (data) => reset(data.Inscripcion),
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
      variables: { _id, proyecto:data.proyecto_id, estudiante:data.estudiante._id, estado:data.estado },
    });
    toast.success("Inscripcion modificado con exito");
    navigate(`/GestionInscripcion/${data.proyecto._id}`);
  };
  const options = [
    { value: "ACEPTADA", label: "ACEPTADA" },
    { value: "RECHAZADA", label: "RECHAZADA" },
    { value: "PENDIENTE", label: "PENDIENTE" }
  ];

  if (queryLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center w-9/12 m-auto">
      <div className="flex self-start">
        <button className="" onClick={() => {navigate(`/GestionInscripcion/${queryData.Inscripcion.proyecto._id}`)}}>
          <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i>
        </button>
      </div>

      <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">
        Inscripción a proyectos
      </h2>
      <PrivateRoute roleList={["LIDER", "AUTORIZADO"]}>
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
                disabled
                register
              />
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Fecha de ingreso"
                name="fechaIngreso"
                id="dateIn"
                disabled
                {...register("fechaIngreso", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
                pattern: {
                  value: /^[a-zA-ZÀ-ÿ\s-Z0-9_.+-,]{4,100}$/i,
                  message: "El valor no es correcto",
                },
              })}
              />
            </div>

            <div className="w-full md:mb-0 flex flex-col">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="dateEg"
              >
                Fecha de egreso:
              </label>
              <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text"
                placeholder="Fecha de Egreso "
                defaultValue={queryData.Inscripcion.fechaEgreso}
                name="fechaEgreso"
                id="dateEg"
                disabled
              />
            </div>
            {queryData ? (
            <div className="w-full mb-6 md:mb-0">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-estado"
              >
                Estado:
              </label>
              <Controller
                id="grid-estado"
                control={control}
                name="estado"
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={options}
                    value={options.find((c) => c.value === value)}
                    onChange={(val) => onChange(val.value)}
                  />
                )}
              />
            </div>
          ) : null}
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
