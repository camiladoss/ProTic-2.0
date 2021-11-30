import { gql } from "@apollo/client";

const GET_INSCRIPCION = gql`
  query Inscripcion($_id: String!) {
    Inscripcion(_id: $_id) {
      _id
      proyecto {
        _id
        nombre
      }
      fechaIngreso
      fechaEgreso
      estado
      estudiante {
        _id
        nombre
        apellido
      }
    }
  }
`;

const GET_FILTRARINSCRIPCION = gql`
  query FiltrarInscripcion($idProyecto: String!) {
    filtrarInscripcion(idProyecto: $idProyecto) {
      _id
      proyecto {
        _id
        nombre
      }
      fechaIngreso
      fechaEgreso
      estado
      estudiante {
        nombre
        apellido
      }
    }
  }
`;

export { GET_INSCRIPCION, GET_FILTRARINSCRIPCION };
