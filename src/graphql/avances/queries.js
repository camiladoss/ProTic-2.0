import { gql } from "@apollo/client";

const GET_AVANCE = gql`
  query Avance($_id: String!) {
    Avance(_id: $_id) {
      proyecto {
        nombre
        _id
      }
      _id
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

const GET_FILTRARAVANCES = gql`
query FiltrarAvance($_id: String!) {
  filtrarAvance(_id: $_id) {
    _id
    proyecto {
      _id
      nombre
    }
    descripcion
    fecha
    creadoPor {
      nombre
      apellido
      _id
    }
  }
}
`;

export { GET_FILTRARAVANCES, GET_AVANCE };
