import React,{useEffect} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_AVANCE } from 'graphql/avances/queries'
import { toast } from 'react-toastify';
// import useFormData from 'hooks/useFormData';
import { EDITAR_AVANCE } from 'graphql/avances/mutations';
import { useForm } from "react-hook-form";

const CrearAvances = () => {

    const navigate = useNavigate()
    const {register, formState:{errors}, handleSubmit} = useForm()
    const {_id} = useParams()
    const {data:queryData, error:queryError, loading:queryLoading} = useQuery(GET_AVANCE, {variables:{_id}})
    const [editarAvance, {error:mutationError}] = useMutation(EDITAR_AVANCE)

    useEffect(() => {
        console.log(queryData)
    },[queryData])

    useEffect(() => {
        if (queryError){
            toast.error("Error consultando el avance")
        }

        if (mutationError){
            toast.error("Error editando el avance")
        }
    }, [mutationError, queryError])

    const onSubmit = data => {
        console.log(data)
        editarAvance({
            variables:{_id,...data}
        })
        toast.success("Avance modificado con exito!")
        navigate("/GestionAvances")

    }
    return (
        <div className="flex flex-col items-center w-9/12 m-auto">
            {/* <div className="flex self-start">
                <Link to="/GestionAvances"> <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i></Link>
            </div> */}
            <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">Creación de Avance</h2>
            <form className="w-full items-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 gap-y-5 gap-x-10 mx-3 mb-6 md:grid-cols-2 items-center">
                    <div className="w-full md:mb-0 flex flex-col ">
                        <label
                            className="text-gray-700 text-md font-bold"
                            for="grid-project-name">
                            Nombre Proyecto:
                        </label>
                        <input
                            className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-project-name"
                            value="Proyecto 1"
                            type="text"
                            defaultValue={queryData.filtrarAvance.proyecto.nombre}
                            name="nombreProyecto"
                            {...register("nombreProyecto", {
                                required:{
                                    value:true,
                                    message:"Campo requerido"

                                }, 
                                pattern:{
                                    value:/^[A-Za-z]+$/i,
                                    message:"Valor incorrecto"
                                }
                            })}
                        />
                        {errors.nombreProyecto?.type==="required" && <span className= "text-red-600">"El nombre del proyecto es requerido!"</span> }
                        {errors.nombreProyecto?.type==="pattern" && <span className= "text-red-600">"Valores inválidos"</span> }

                    </div>
                    <div className="w-full md:mb-0 flex flex-col">
                        <label
                            className="text-gray-700 text-md font-bold"
                            for="grid-IdProyect">
                            ID Proyecto:
                        </label>
                        <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-IdProyect"
                            value="10698746"
                            type="text"
                            defaultValue={queryData.filtrarAvance.proyecto._id}
                            name="idProyecto"
                            disabled
                            {...register("idProyecto", {
                                required:{
                                    value:true,
                                    message:"Campo requerido"
                                }, 
                                
                            })}
                        />
                        {errors.idProyecto?.type==="required" && <span className= "text-red-600">"El id del proyecto es requerido!"</span> }
                    </div>
                    <div className="w-full md:mb-0 flex flex-col">
                        <label className="text-gray-700 text-md font-bold" for="grid-Date-avance">Fecha de Avance:</label>
                        <input type="date" value="2013-01-31" id="grid-Date-avance" disabled/>
                    </div>
                    <div className="w-full md:col-start-1 md:col-end-3 flex flex-col">
                        <label
                            className="text-gray-700 text-md font-bold"
                            for="grid-desc">
                            Descripción:
                        </label>
                        <input
                            className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-desc"
                            type="text"
                            placeholder="Descripción del avance"
                            required
                            defaultValue={queryData.filtrarAvance.descripcion}
                            name="descripcion"
                            {...register("descripcion", {
                                required:{
                                    value:true,
                                    message:"Campo requerido"

                                }, 
                                pattern:{
                                    value:/^[A-Za-z]+$/i,
                                    message:"Valor incorrecto"
                                }
                            })}
                        />
                        {errors.descripcion?.type==="required" && <span className= "text-red-600">"La descripción es requerida!"</span> }
                        {errors.descripcion?.type==="pattern" && <span className= "text-red-600">"Valores inválidos"</span> }
                        
                    </div>
                    <div className="w-full md:col-start-1 md:col-end-3 flex flex-col ">
                        <label
                            className="text-gray-700 text-md font-bold"
                            for="grid-obs">
                            Observaciones:
                        </label>
                        <input
                            className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-obs"
                            type="text"
                            placeholder="Observaciones del lider"
                            defaultValue={queryData.filtrarAvance.observaciones}
                            name="observaciones"
                            
                            {...register("observaciones", {
                                required:{
                                    value:false,
                                    message:"Campo requerido"

                                }, 
                                pattern:{
                                    value:/^[A-Za-z]+$/i,
                                    message:"Valor incorrecto"
                                }
                            })}
                        />
                        
                    </div>
                    <div className="md:col-start-1 md:col-end-3 flex justify-center">
                        <button
                            className="shadow bg-indigoDye hover:bg-carolinaBlue focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 m-4 rounded"
                            type="submit">
                            Crear
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CrearAvances
