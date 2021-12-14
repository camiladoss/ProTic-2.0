import { gql } from '@apollo/client'

const EDITAR_AVANCE = gql`
mutation editarAvance($_id: String!, $descripcion: String, $observaciones: String) {
    editarAvance(_id: $_id, descripcion: $descripcion, observaciones: $observaciones) {
      _id
      descripcion
      observaciones
    }
  }
`;
const CREAR_AVANCE = gql`
  mutation CrearAvance($descripcion: String!, $creadoPor: String!, $proyecto: String!) {
    crearAvance(descripcion: $descripcion, creadoPor: $creadoPor, proyecto: $proyecto) {
      descripcion
      observaciones
      fecha
    }
  }
`;
export {EDITAR_AVANCE, CREAR_AVANCE};