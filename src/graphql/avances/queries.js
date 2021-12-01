import { gql } from "@apollo/client";

const GET_AVANCE = gql`
query Avance($_id: String!) {
  Avance(_id: $_id) {
    _id
    proyecto {
      _id
      nombre
    }
    fecha
    descripcion
    creadoPor {
      nombre
      apellido
    }
    observaciones
  }
}
`;

const GET_FILTRARAVANCES = gql`
  query FiltrarAvance($idProyecto: String!) {
    FiltrarAvance(idProyecto: $idProyecto) {
      _id
      proyecto {
        nombre
        _id
      }
      fecha
      descripcion
      observaciones
      creadoPor {
        nombre
        apellido
        _id
      }
    }
  }
`;

export { GET_FILTRARAVANCES, GET_AVANCE };
