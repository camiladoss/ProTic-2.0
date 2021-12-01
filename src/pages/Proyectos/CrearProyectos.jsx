import React,{useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_PROYECTO } from 'graphql/proyectos/queries'
import { toast } from 'react-toastify';
import { CREAR_PROYECTO, EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import { useForm } from "react-hook-form";


const CrearProyecto = () => {
  
    const navigate = useNavigate ();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { _id } = useParams();

    // const idProyecto="61a15557c6e7bb5f2b79f6c3"

    const {data:queryData,error:queryError,loading:queryLoading} = useQuery(GET_PROYECTO,{
        variables:{_id}
    });
    const [editarProyecto, {error: mutationError}] = useMutation(EDITAR_PROYECTO);

    useEffect(() => {
        console.log("Data servidor", queryData);
    }, [queryData]);

    useEffect(() => {
      if(queryError){
          toast.error('Error editando proyecto')
      }
      if(mutationError){
          toast.error('Error editando proyecto')
      }
  }, [queryError, mutationError]);
  
  const onSubmit = data =>{
    console.log(data);
    editarProyecto({
          variables:{_id, ...data}
    });
    toast.success('Proyecto editado con exito');
    navigate("/GestionProyectos");
}

const idLider="61a1511fb0349d0d05ef57d6"
if(queryLoading) {
  return <div> cargando...</div>
}
  return (
    <div className="flex flex-col items-center w-9/12 m-auto">
        <div className="flex self-start">
          <button className="">
            <Link to="/Proyectos/CrearProyectos"></Link>
            <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i>
          </button>
        </div>
        <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">Creación proyectos</h2>
        <form className="w-full items-center" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-y-5 gap-x-10 mx-3 mb-6 md:grid-cols-2 items-center">
            <div className="w-full md:mb-0 flex flex-col ">
              <label
                className="text-gray-700 text-md font-bold"
                htmlFor="grid-first-name">
                Nombre:
              </label>
              <input
                className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                defaultValue={queryData.Proyecto.nombre}
                type="text"
                placeholder="Nombre del proyecto"
                required
                name="nombre"
                {...register("nombre", {
                  required:{
                    value:true,
                    message:"El campo es requerido"
                  },
                  pattern:{ 
                    value:/^[A-Za-z]+$/i,
                    message:"El valor no es correcto" 
                    }
                })}
              />
              {errors.nombreProyecto?.type==="required"&&<span className="text-red-600">"El nombre del proyecto es requerido!"</span>}
              {errors.nombreProyecto?.type==="pattern"&&<span className="text-red-600">"Valor invalido!"</span>}
            </div>

            {/* <div className="w-full md:mb-0 flex flex-col">
              <label className="text-gray-700 text-md font-bold" htmlFor="grid-objG" >Objetivos generales:</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-objG"
                type="text"
                defaultValue={queryData.Proyecto.objetivos.descripcion}
                placeholder="Objetivos Generales"
                name="objetivosGenerales"
                {...register("objetivosGenerales", {
                  required:{
                    value:true,
                    message:"El campo es requerido"
                  },
                  pattern:{ 
                    value:/^[A-Za-z]+$/i,
                    message:"El valor no es correcto" 
                    }
                })}
              />
        
           </div>

            <div className="w-full md:mb-0 flex flex-col">
              <label className="text-gray-700 text-md font-bold" htmlFor="grid-objE">Objetivos específicos:</label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-objE"
                type="text"
                defaultValue={queryData.Proyecto.objetivos.descripcion}
                required
              />
            </div> */}
            </div>

            <div className="w-full md:mb-0 flex flex-col">
              <label className="text-gray-700 text-md font-bold" htmlFor="grid-num">Presupuesto:</label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="number"
              defaultValue={queryData.Proyecto.presupuesto} 
              placeholder="$$$" 
              id="grid-num"
              name="presupuesto"
                
              {...register("presupuesto", {
                required:{
                  value:true,
                  message:"El campo es requerido"
                },
                pattern:{ 
                  value:/^\d{4,10}$/i,
                  message:"El valor no es correcto" 
                  }
              })} 
               />
            </div>

            <div className="w-full md:mb-0 flex flex-col">
              <label className="text-gray-700 text-md font-bold">Fecha de inicio:</label>
              <input type="date" placeholder="Fecha de inicio" value="2021-11-17" disabled  />
            </div>

            <div className="w-full md:mb-0 flex flex-col">
              <label className="text-gray-700 text-md font-bold">Fecha de terminación:</label>
              <input type="date" placeholder="Fecha de terminación" value="2021-11-17"  disabled />
            </div>

            {/* <div className="w-full md:mb-0 flex flex-col">
              <label className="text-gray-700 text-md font-bold" htmlFor="grid-nameLid">Nombre lider:</label>
              <select
                class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-nameLid"
                name="nombreLider"
                defaultValue={queryData.Proyecto.lider.nombre}
                {...register("nombreLider",{
                  required: {
                  value:true,
                  massage: "El campo es requerido"
                  },
                  pattern: {
                    value: /^[a-zA-ZÀ-ÿ\s-Z0-9_.+-,]{4,100}$/,
                    massage: "El valor no es correcto",
                    }
                  })}
              >
                <option>{idLider}</option>
                
              </select>
            </div> */}

              {/* <div className="w-full md:mb-0 flex flex-col">
                <label className="text-gray-700 text-md font-bold" for="grid-idLid">ID lider:</label>
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-idLid"
                  name="idLider"
                  {...register("idLider",{
                    required: {
                    value:true,
                    massage: "El campo es requerido"
                    },
                    pattern: {
                      value: /^\d{4,10}$/i,
                      massage: "El valor no es correcto",
                      }
                    })}
                >
                
                  <option>132213</option>
                  <option>42342424</option>
                  <option>546745756</option>
                </select>
              </div> */}

            {/* <div className="w-full  mb-6 md:mb-0">
              <label className="text-gray-700 text-md font-bold" htmlFor="grid-state">Estado:</label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                >
                  <option value="" disabled selected >Seleccione un estado</option>
                  <option>ACTIVO</option>
                  <option>INACTIVO</option>
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
            </div> */}

            <div className="w-full mb-6 md:mb-0" >
                            <label className="text-gray-700 text-md font-bold" htmlFor="grid-estado">Estado:</label>
                            <div className="relative">
                                <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-estado"
                                defaultValue={queryData.Proyecto.estado}
                                name="estado"
                                {...register("estado",{
                                    required: {
                                        value:true,
                                        massage: "El campo es requerido"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        massage: "El valor no es correcto",
                                    }
                                })}
                                >
                                    <option>INACTIVO</option>
                                    <option>ACTIVO</option>
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
                            {errors.estado?.type === 'required' && <span className="text-red-600">"El estado es requerido!"</span>}
                            {errors.estado?.type === 'pattern' && <span className="text-red-600">"El estado no esta disponible!"</span>}
                        </div> 

                        
            <div className="w-full mb-6 md:mb-0" >
                            <label className="text-gray-700 text-md font-bold" htmlFor="grid-fase">Fase:</label>
                            <div className="relative">
                                <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                id="grid-fase"
                                defaultValue={queryData.Proyecto.estado}
                                name="fase"
                                {...register("fase",{
                                    required: {
                                        value:true,
                                        massage: "El campo es requerido"
                                    },
                                    pattern: {
                                        value: /^[A-Za-z]+$/i,
                                        massage: "El valor no es correcto",
                                    }
                                })}
                                >
                                    <option>INICIADO</option>
                                    <option>DESARROLLO</option>
                                    <option>TERMINADO</option>
                                    <option>NULO</option>
                                    
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
                            {errors.fase?.type === 'required' && <span className="text-red-600">"La fase es requerido!"</span>}
                            {errors.fase?.type === 'pattern' && <span className="text-red-600">"La fase no esta disponible!"</span>}
                        </div>

            {/* <div className="w-full mb-6 md:mb-0 " >
              <label className="text-gray-700 text-md font-bold" htmlFor="grid-fase">Fase del proyecto:</label>

              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-fase" 
                >
                  <option value="" disabled selected >Seleccione una estado</option>
   
                  <option>INICIADO</option>
                  <option>DESARROLLO</option>
                  <option>TERMINADO</option>
                  <option>NULO</option>
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
            </div>
          </div> */}
            <div className="md:col-start-1 md:col-end-3 flex justify-center">
              <button
                className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded"
                type="submit">
                Editar
              </button>
            </div>
        </form>
      
    </div>
  );
};

export default CrearProyecto;
