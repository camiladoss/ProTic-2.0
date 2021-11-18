import React from 'react'
import { Link } from "react-router-dom";

const CrearAvances = () => {
    return (
        <div className="flex flex-col items-center w-9/12 m-auto">
            <div className="flex self-start">
                <Link to="/GestionAvances"> <i className="fas fa-arrow-circle-left text-3xl p-4 text-indigoDye "></i></Link>
            </div>
            <h2 className="font-bold text-2xl mb-4 text-gray-700 flex">Creación de Avance</h2>
            <form className="w-full items-center">
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
                            disabled
                        />
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
                            disabled
                        />
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
                        />
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
                            required
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
