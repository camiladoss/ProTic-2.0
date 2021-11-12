import React from "react";
import { Link } from "react-router-dom";

const GestionProyectos = () => {
  return (
    <main className="mainContainerTable">
      <div>
        <button>
          <Link className="link-boton" to="/CrearVentas">
            Crear venta
          </Link>
        </button>
      </div>

      <h2 className="tituloGestionVentas">Todas las ventas</h2>
      <input className="inputBusqueda" placeholder="Buscar" />
      <table>
        <th>
          <tr>
            <td>Nombre del cliente</td>
            <td>Documento del cliente</td>
            <td>Id compra</td>
            <td>Editar</td>
          </tr>
        </th>
        <tbody>
          <tr>
            <td>nombre</td>
            <td>apellido</td>
            <td>documento</td>
            <td>
              <button className="iconSide edit"></button>
              <button className="iconSide trash"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default GestionProyectos;
