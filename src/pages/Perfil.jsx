import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import anuser from "../assets/anuser.png";
import { useUser } from "context/userContext";
import { EDITAR_PERFIL, EDITAR_USUARIO } from "../graphql/usuarios/mutations";
import { GET_USUARIO } from "../graphql/usuarios/queries";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

const Perfil = () => {
  const { userData } = useUser();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ mode: "onBlur" });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_USUARIO, {
    skip: !userData,
    variables: { _id: userData._id },
    onCompleted: (data) => reset(data.Usuario),
  });

  const [editarPerfil, { error: mutationError }] = useMutation(EDITAR_PERFIL);
  const [editarUsuario, { error: mutaError }] = useMutation(EDITAR_USUARIO);

  useEffect(() => {
    console.log("Data servidor", queryData);
  }, [queryData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error consultado usuario");
    }
    if (mutationError) {
      toast.error("Error modificado el perfil");
    }
  }, [queryError, mutationError]);

  const onSubmit = (data) => {
    if(data.password === ''){
      editarUsuario({
        variables: { _id: userData._id, ...data},
      });
      toast.success("Usuario modificado con exito");
    }else{
      editarPerfil({
        variables: { _id: userData._id, ...data },
      });
      toast.success("Usuario modificado con exito");
    }
  };

  if (queryLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex flex-col items-center w-8/12 m-auto">
      <div className="flex self-start">
        <button className="">
          <Link to="/GestionProyectos"></Link>
          <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i>
        </button>
      </div>
      <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">Perfil</h2>

      <div className="flex items-center">
        <img
          className="w-15 h-10 rounded-full mr-4"
          src={anuser}
          alt="Avatar of Jonathan Reinink"
        />
        <div className="text-sm">
          <p className="text-gray-900 leading-none">{queryData.Usuario.nombre}{" "}{queryData.Usuario.apellido}</p>
          <p className="text-gray-600">{queryData.Usuario.rol}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-20 pt-6 pb-8 mb-"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Nombre
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="nombre"
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Apellido
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="apellido"
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
          {errors.nombre?.type === "required" && (
            <span className="text-red-600">"El nombre es requerido!"</span>
          )}
          {errors.nombre?.type === "pattern" && (
            <span className="text-red-600">
              "El nombre solo puede llevar letras!"
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Identificación
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="identificacion"
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
            <span className="text-red-600">"La identificación es requerida!"</span>
          )}
          {errors.identificacion?.type === "pattern" && (
            <span className="text-red-600">
              "La identificación sólo puede llevar números!"
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="usuariox"
          >
            Correo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="correo"
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
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Rol
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            name="rol"
            disabled
            {...register("rol", {
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
          {errors.rol?.type === "required" && (
            <span className="text-red-600">"El rol es requerido!"</span>
          )}
          {errors.rol?.type === "pattern" && (
            <span className="text-red-600">
              "El rol solo puede llevar letras!"
            </span>
          )}
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            {...register("password", {
              required: {
                value: false,
                massage: "El campo es requerido",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+$/i,
                massage: "El valor no es correcto",
              },
            })}
          />
          {errors.password?.type === "required" && (
            <span className="text-red-600">"La contraseña es requerida!"</span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-red-600">
              "La contraseña no tiene el formato requerido!"
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Perfil;
