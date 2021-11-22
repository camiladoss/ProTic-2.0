import React, {useEffect} from 'react'
import { useQuery } from '@apollo/client'
import {GET_USUARIOS} from '../graphql/usuarios/queries'
import { toast } from 'react-toastify';

const IndexUsuarios = () => {
    const {data, error, loading } = useQuery(GET_USUARIOS);

    useEffect(() => {
        if(error){
            toast.error("Error consultando los usuarios")
        }
    },[error])

    useEffect(() => {
        console.log("data servidor", data)
    }, [data]);

    // if (loading) return <div>Cargando...</div>

    
    
    return (
        <div className="flex flex-col items-center w-9/12 m-auto">
            <h1 className="font-bold text-2xl mb-4 text-gray-700 flex m-4">Usuarios</h1>
            <table className="border-b border-blue-300 shadow">
            <thead className="bg-maximunBlue">
            <tr>
                <th className="px-6 py-2 text-md text-gray-700">Nombre</th>
                <th className="px-6 py-2 text-md text-gray-700">Apellidos</th>
                <th className="px-6 py-2 text-md text-gray-700">Correo </th>
                <th className="px-6 py-2 text-md text-gray-700">Identificacion</th>
                <th className="px-6 py-2 text-md text-gray-700">Rol</th>
                <th className="px-6 py-2 text-md text-gray-700">Editar</th>
            </tr>
            </thead>
            <tbody className="bg-columbiaBlue">
                {data &&
                    data.Usuarios.map((u) =>{
                        return(
                            <tr className="whitespace-nowrap" key={u._id}>
                                <td className="px-6 py-4 text-md text-gray-600">{u.nombre}</td>
                                <td className="px-6 py-4 text-md text-gray-600">{u.apellido}</td>
                                <td className="px-6 py-4 text-md text-gray-600">{u.correo}</td>
                                <td className="px-6 py-4 text-md text-gray-600">{u.identificacion}</td>
                                <td className="px-6 py-4 text-md text-gray-600">{u.rol}</td>
                                <td className="px-6 py-4 text-md text-gray-600">
                                    <button className="px-4 py-1 text-md mr-2 text-white bg-green-400 rounded fas fa-pen"></button>
                                    <button className="px-4 py-1 text-md ml-2 text-white bg-blue-400 rounded fas fa-plus"></button>
                                </td>
                            </tr>
                        );
                    })

                };
            </tbody>
        </table>
      </div>
    )
}

export default IndexUsuarios
