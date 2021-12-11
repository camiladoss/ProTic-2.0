import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USUARIO, GET_ESTUDIANTES } from "graphql/usuarios/queries";
import { toast } from "react-toastify";
import { EDITAR_USUARIO } from "graphql/usuarios/mutations";
import { Controller, useForm } from "react-hook-form";
import PrivateRoute from "components/PrivateRoute";
import Select from "react-select";

const EditarUsuario = () => {
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
    data: dataEstudiante,
    error: errorEstudiante,
    loading: LoadingEstudiante,
  } = useQuery(GET_ESTUDIANTES, { fetchPolicy: "no-cache" });
  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    skip: !_id,
    variables: { _id },
    onCompleted: (data) => reset(data.Usuario),
  });
  const [editarUsuario, { error: mutationError }] = useMutation(
    EDITAR_USUARIO
  );

  useEffect(() => {
    console.log("Data servidor", queryData);
    console.log("Data servidor2", dataEstudiante);
  }, [queryData, dataEstudiante]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultado usuarios");
    }
    if (mutationError || errorEstudiante) {
      toast.error("Error modificado el usuario");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryError, mutationError]);

  const onSubmit = (data) => {
    console.log(data);
    editarUsuario({
      variables: { _id, ...data },
    });
    toast.success("Usuario modificado con exito");
    navigate("/Usuarios");
  };
  const options = [
    { value: "AUTORIZADO", label: "AUTORIZADO" },
    { value: "PENDIENTE", label: "PENDIENTE" },
    { value: "NO_AUTORIZADO", label: "NO AUTORIZADO" },
  ];
  const options2 = [
    { value: "ESTUDIANTE", label: "ESTUDIANTE" },
    { value: "LIDER", label: "LIDER" },
    { value: "ADMINISTRADOR", label: "ADMINISTRADOR" },
  ];

  if (queryLoading || LoadingEstudiante) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center w-9/12 m-auto">
      <div className="flex self-start">
        <Link to="/Usuarios">
          {" "}
          <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i>
        </Link>
      </div>
      {_id ? (
        <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">
          Editar Usuario
        </h2>
      ) : (
        <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">
          Crear Usuario
        </h2>
      )}
      <PrivateRoute roleList={["ADMINISTRADOR", "LIDER", "AUTORIZADO"]}>
        <form className="w-full items-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-5 gap-x-10 mx-3 mb-6 md:grid-cols-2 items-center">
            <div className="w-full md:mb-0 flex flex-col ">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-user-name"
              >
                Nombre:
              </label>
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-user-name"
                type="text"
                name="nombre"
                disabled
                {...register("nombre", {
                  required: {
                    value: true,
                    massage: "El campo es requerido",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    massage: "El valor no es correcto",
                  },
                })}
              />
              {errors.nombre?.type === "required" && (
                <span className="text-red-600">"El nombre es requerido!"</span>
              )}
              {errors.nombre?.type === "pattern" && (
                <span className="text-red-600">
                  "El nombre solo puede llevar letras!"
                </span>
              )}
            </div>
            <div className="w-full md:mb-0 flex flex-col ">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-user-lastname"
              >
                Apellido:
              </label>
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-user-lastname"
                type="text"
                name="apellido"
                disabled
                {...register("apellido", {
                  required: {
                    value: true,
                    massage: "El campo es requerido",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/i,
                    massage: "El valor no es correcto",
                  },
                })}
              />
              {errors.apellido?.type === "required" && (
                <span className="text-red-600">
                  "El apellido es requerido!"
                </span>
              )}
              {errors.apellido?.type === "pattern" && (
                <span className="text-red-600">
                  "El apellido solo puede llevar letras!"
                </span>
              )}
            </div>
            {_id ? (
              <div className="w-full md:mb-0 flex flex-col">
                <label
                  className="text-gray-700 text-md font-bold"
                  htmlFor="grid-IdProyect"
                >
                  ID Usuario:
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-IdProyect"
                  value={_id}
                  type="text"
                  name="_id"
                  disabled
                />
              </div>
            ) : null}
            <div className="w-full md:mb-0 flex flex-col ">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-user-email"
              >
                Correo:
              </label>
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-user-email"
                type="text"
                name="correo"
                disabled
                {...register("correo", {
                  required: {
                    value: true,
                    massage: "El campo es requerido",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i,
                    massage: "El valor no es correcto",
                  },
                })}
              />
              {errors.correo?.type === "required" && (
                <span className="text-red-600">"El correo es requerido!"</span>
              )}
              {errors.correo?.type === "pattern" && (
                <span className="text-red-600">
                  "El correo tiene un formato erroneo!"
                </span>
              )}
            </div>
            <div className="w-full md:mb-0 flex flex-col ">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-user-Id"
              >
                Identificación:
              </label>
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-user-Id"
                type="text"
                name="identificacion"
                disabled
                {...register("identificacion", {
                  required: {
                    value: true,
                    massage: "El campo es requerido",
                  },
                  pattern: {
                    value: /^\d{4,10}$/i,
                    massage: "El valor no es correcto",
                  },
                })}
              />
              {errors.identificacion?.type === "required" && (
                <span className="text-red-600">
                  "La identificación es requerida!"
                </span>
              )}
              {errors.identificacion?.type === "pattern" && (
                <span className="text-red-600">
                  "La identificación sólo puede llevar números!"
                </span>
              )}
            </div>
            {queryData ? (
              <div className="w-full mb-6 md:mb-0 hidden">
                <label
                  className="text-gray-700 text-md font-bold"
                  htmlFor="grid-rol"
                >
                  Rol:
                </label>
                <Controller
                  id="grid-rol"
                  control={control}
                  name="rol"
                  render={({ field: { onChange, value } }) => (
                    <Select
                      className=""
                      // defaultValue={options2.find(c => c.value === dataUsuario.rol)}
                      options={options2}
                      value={options2.find((c) => c.value === value)}
                      onChange={(val) => onChange(val.value)}
                    />
                  )}
                />
              </div>
            ) : null}
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
            {_id ? (
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

export default EditarUsuario;
