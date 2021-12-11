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
const GET_FILTRARESTUDIANTE = gql`
  query FiltrarEstudiate($estudiante: String!) {
    filtrarEstudiate(estudiante: $estudiante) {
      fechaEgreso
      proyecto {
        _id
      }
      _id
    }
  }
`


export { GET_INSCRIPCION, GET_FILTRARINSCRIPCION, GET_FILTRARESTUDIANTE };
