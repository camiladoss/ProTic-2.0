import { gql } from "@apollo/client";

const EDITAR_INSCRIPCION = gql`
  mutation EditarInscripcion(
    $_id: String!
    $proyecto: String
    $fechaIngreso: Date
    $fechaEgreso: Date
    $estado: Enum_EstadoInscripcion
    $estudiante: String
  ) {
    editarInscripcion(
      _id: $_id
      proyecto: $proyecto
      fechaIngreso: $fechaIngreso
      fechaEgreso: $fechaEgreso
      estado: $estado
      estudiante: $estudiante
    ) {
      fechaIngreso
      fechaEgreso
      estado
      _id
    }
  }
`;

const CREAR_INSCRIPCION = gql`
  mutation Mutation($proyecto: String!, $estudiante: String!) {
    crearInscripcion(proyecto: $proyecto, estudiante: $estudiante) {
      proyecto {
        _id
      }
      estado
      estudiante {
        _id
      }
    }
  }
`;

export { EDITAR_INSCRIPCION, CREAR_INSCRIPCION };
