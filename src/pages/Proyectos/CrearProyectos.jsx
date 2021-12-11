import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PROYECTO } from "graphql/proyectos/queries";
import { toast } from "react-toastify";
import { CREAR_PROYECTO, EDITAR_PROYECTO } from "graphql/proyectos/mutations";
import { GET_LIDERES } from "graphql/usuarios/queries";
import { FECHA_EGRESO } from "graphql/inscripciones/mutations";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import PrivateRoute from "components/PrivateRoute";
import moment from "moment";
import { useUser } from "context/userContext";

const CrearProyecto = () => {
  const navigate = useNavigate();
  const { userData } = useUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset,
  } = useForm({ mode: "onBlur" });
  const { _id } = useParams();
  const [obj, setObj] = useState([]);
  const [objetivos, setObjetivos] = useState([]);
  const [fechaInit, setFechaInit] = useState();
  const [fechaFin, setFechaFin] = useState();
  var listaOptions = [];

  const {
    data: dataEstudiante,
    error: errorEstudiante,
    loading: LoadingEstudiante,
  } = useQuery(GET_LIDERES, { fetchPolicy: "no-cache" });

  const {
    data: queryData,
    error: queryError,
    loading: queryLoading,
  } = useQuery(GET_PROYECTO, {
    fetchPolicy: "no-cache",
    skip: !_id,
    variables: { _id },
    onCompleted: (data) => reset(data.Proyecto),
  });

  const [editarProyecto, { error: mutationError }] =
    useMutation(EDITAR_PROYECTO);

  const [crearProyecto, { error: mutationCreateError }] =
    useMutation(CREAR_PROYECTO);

  const [fechaEgreso, { error: mutationInscripcionError }] =
    useMutation(FECHA_EGRESO);


  useEffect(() => {
    console.log("Data servidor", queryData);
    if (queryData) {
      setObjetivos(
        queryData.Proyecto.objetivos.map((o) => {
          return { descripcion: o.descripcion };
        })
      );
    }
    if (queryData) {
      setFechaInit(
        moment(queryData.Proyecto.fechaInicio).utc().format("YYYY-MM-DD")
      );
      setFechaFin(
        moment(queryData.Proyecto.fechaFin).utc().format("YYYY-MM-DD")
      );
    }
  }, [queryData]);

  useEffect(() => {
    if (queryError) {
      toast.error("Error llamando la base de datos");
    }
    if (mutationError) {
      toast.error("Error editando proyecto");
    }
  }, [queryError, mutationError]);

  const options = [
    { value: "ACTIVO", label: "ACTIVO" },
    { value: "INACTIVO", label: "INACTIVO" },
  ];
  const options2 = [
    { value: "INICIADO", label: "INICIADO" },
    { value: "DESARROLLO", label: "DESARROLLO" },
    { value: "TERMINADO", label: "TERMINADO" },
    { value: "NULO", label: "NULO" },
  ];
  var estudianteOpciones = [];

  if (dataEstudiante) {
    estudianteOpciones = dataEstudiante.Lideres.map((e) => {
      return {
        value: e._id,
        label: e.nombre + " " + e.apellido + "- ID " + e.identificacion,
      };
    });
  }

  useEffect(() => {
    console.log(objetivos);
    setObj("");
  }, [objetivos]);

  const agregarObjetivos = () => {
    var item = {
      descripcion: obj,
    };
    setObjetivos([...objetivos, item]);
  };

  const deleteItem = (i) => {
    var index = i;
    objetivos.splice(index, 1);
    setObjetivos([...objetivos]);
  };

  useEffect(() => {
    console.log(obj);
  }, [obj]);

  const onSubmit = (data) => {
    console.log(data);
    if (_id) {
      editarProyecto({
        variables: {
          _id,
          nombre: data.nombre,
          presupuesto: data.presupuesto,
          estado: data.estado,
          objetivos: objetivos,
          fase: data.fase,
          lider: data.lider._id,
          objetivoGeneral: data.objetivoGeneral,
          fechaInicio: fechaInit,
          fechaFin: fechaFin,
        },
      });
      if(data.estado === "INACTIVO" || data.fase === "TERMINADO"){
        fechaEgreso({
          variables: {
            idProyecto:_id
          }
        })
        console.log(data.estado);
      }
      toast.success("Proyecto editado con exito");
      navigate("/GestionProyectos");
    } else {
      console.log(data);
      crearProyecto({
        variables: { _id, objetivos: objetivos, ...data },
      });
      toast.success("Proyecto editado con exito");
      navigate("/GestionProyectos");
      window.location.reload(false);
    }
  };

  if (queryLoading && LoadingEstudiante) {
    return <div> cargando...</div>;
  }
  return (
    <div className="flex flex-col items-center w-9/12 m-auto">
      <div className="flex self-start">
        <button className="">
          <Link to="/GestionProyectos">
            <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i>
          </Link>
        </button>
      </div>
      {_id ? (
        <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">
          Editar Proyecto
        </h2>
      ) : (
        <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">
          Crear Proyecto
        </h2>
      )}
      <form className="w-full items-center" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-y-5 gap-x-10 mx-3 mb-6 md:grid-cols-2 items-center">
          <div className="w-full md:mb-0 flex flex-col ">
            <label
              className="text-gray-700 text-md font-bold"
              htmlFor="grid-first-name"
            >
              Nombre:
            </label>
            <input
              className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Nombre del proyecto"
              name="nombre"
              {...register("nombre", {
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
            {errors.nombreProyecto?.type === "required" && (
              <span className="text-red-600">
                "El nombre del proyecto es requerido!"
              </span>
            )}
            {errors.nombreProyecto?.type === "pattern" && (
              <span className="text-red-600">"Valor invalido!"</span>
            )}
          </div>
          <div className="w-full md:mb-0 flex flex-col">
            <label
              className="text-gray-700 text-md font-bold"
              htmlFor="grid-num"
            >
              Presupuesto:
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="number"
              placeholder="$100000"
              id="grid-num"
              name="presupuesto"
              {...register("presupuesto", {
                required: {
                  value: true,
                  message: "El campo es requerido",
                },
                pattern: {
                  value: /^\d{4,10}$/i,
                  message: "El valor no es correcto",
                },
              })}
            />
            {errors.presupuesto?.type === "required" && (
              <span className="text-red-600">
                "El presupuesto es requerido!"
              </span>
            )}
            {errors.presupuesto?.type === "pattern" && (
              <span className="text-red-600">
                "El presupuesto tiene minimo 4 digitos y maximo 10!"
              </span>
            )}
          </div>
          <div className="w-full md:mb-0 flex flex-col">
            <label
              className="text-gray-700 text-md font-bold"
              htmlFor="grid-initDate"
            >
              Fecha de inicio:
            </label>
            <input
              id="grid-initDate"
              type="date"
              placeholder="Fecha de inicio"
              name="fechaInicio"
              defaultValue={fechaInit}
              onChange={(e) => {
                setFechaInit(e.target.value);
              }}
              disabled
            />
          </div>
          <div className="w-full md:mb-0 flex flex-col">
            <label
              className="text-gray-700 text-md font-bold"
              htmlFor="grid-FinDate"
            >
              Fecha de terminación:
            </label>
            <input
              id="grid-FinDate"
              type="date"
              placeholder="Fecha de terminación"
              name="fechaFin"
              defaultValue={fechaFin}
              onChange={(e) => {
                setFechaFin(e.target.value);
              }}
              disabled
            />
          </div>
          {_id ? (
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
                    // defaultValue={options.find(c => c.value === dataUsuario.estado)}
                    options={options}
                    value={options.find((c) => c.value === value)}
                    onChange={(val) => onChange(val.value)}
                    isDisabled={userData.rol === "LIDER"}
                  />
                )}
              />
            </div>
          ) : null}
          {_id ? (
            <div className="w-full mb-6 md:mb-0">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-fase"
              >
                Fase:
              </label>
              <Controller
                id="grid-fase"
                control={control}
                name="fase"
                render={({ field: { onChange, value } }) => (
                  <Select
                    // defaultValue={options.find(c => c.value === dataUsuario.estado)}
                    options={options2}
                    value={options2.find((c) => c.value === value)}
                    onChange={(val) => onChange(val.value)}
                    isDisabled={userData.rol === "LIDER"}
                  />
                )}
              />
            </div>
          ) : null}
          {dataEstudiante && !_id  ? (
            <div className="w-full mb-6 md:mb-0">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-lider"
              >
                Lider:
              </label>
              <Controller
                id="grid-lider"
                control={control}
                name="lider"
                render={({ field: { onChange, value } }) => (
                  <Select
                    options={estudianteOpciones}
                    value={estudianteOpciones.find((c) => c.value === value)}
                    onChange={(val) => onChange(val.value)}
                  />
                )}
              />
            </div>
          ) : null}
          {queryData ? (
          <div className="w-full md:mb-0 flex flex-col">
            <label
              className="text-gray-700 text-md font-bold"
              htmlFor="grid-FinDate"
            >
              Lider:
            </label>
            <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              defaultValue={queryData.Proyecto.lider.nombre + " " +
                    queryData.Proyecto.lider.apellido}
              onChange={(e) => {
                setFechaFin(e.target.value);
              }}
              disabled
            />
          </div>
          ) : null}
          <div className="w-full md:mb-0 flex flex-col ">
            <label
              className="text-gray-700 text-md font-bold"
              htmlFor="grid-obj-gen"
            >
              Objetivo General:
            </label>
            <input
              className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-obj-gen"
              type="text"
              placeholder="Objetivo General"
              name="objetivoGeneral"
              {...register("objetivoGeneral", {
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
            {errors.nombreProyecto?.type === "required" && (
              <span className="text-red-600">
                "El objectivo general es requerido!"
              </span>
            )}
            {errors.nombreProyecto?.type === "pattern" && (
              <span className="text-red-600">"Valor invalido!"</span>
            )}
          </div>
          <div className="w-full md:mb-0 flex flex-col ">
            <label
              className="text-gray-700 text-md font-bold"
              htmlFor="grid-obj-gen"
            >
              Objetivo Especifico:
            </label>
            <div className="flex flex-row">
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-obj-gen"
                type="text"
                placeholder="Objetivo Especifico"
                name="objetivoGeneral"
                onChange={(e) => {
                  setObj(e.target.value);
                }}
              />
              <button
                className="px-2 py-1 ml-2 mt-1 max-h-8  text-white bg-blue-400 rounded fas fa-plus"
                type="button"
                onClick={() => {
                  agregarObjetivos();
                }}
              ></button>
            </div>
          </div>
          <table className="border-b border-blue-300 shadow">
            <thead className="bg-maximunBlue">
              <tr>
                <th className="px-6 py-2 text-md text-gray-700">
                  Objetivos Especificos
                </th>
                <th className="px-6 py-2 text-md text-gray-700">Eliminar</th>
              </tr>
            </thead>
            <tbody className="bg-columbiaBlue">
              {objetivos &&
                objetivos.map((p, i) => {
                  return (
                    <tr key={i} className="whitespace-nowrap">
                      <td
                        key={i + "td1"}
                        className="px-6 py-4 text-md text-gray-600"
                      >
                        {p.descripcion}
                      </td>
                      <td className=" text-md text-center text-gray-600">
                        <button
                          className="px-4 py-1 text-md text-white bg-red-400 rounded fas fa-trash-alt"
                          type="button"
                          onClick={() => {
                            deleteItem(i);
                          }}
                        ></button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
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
    </div>
  );
};

export default CrearProyecto;
