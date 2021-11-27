import { gql } from "@apollo/client";

const GET_AVANCES = gql`
  query Avances {
    Avances {
      _id
      descripcion
      creadoPor {
        nombre
        apellido
      }
      proyecto {
        nombre
        _id
      }
      fecha
    }
  }
`;

const GET_AVANCE = gql`
  query FiltrarAvance($idProyecto: String!) {
    filtrarAvance(idProyecto: $idProyecto) {
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

export { GET_AVANCES, GET_AVANCE };
