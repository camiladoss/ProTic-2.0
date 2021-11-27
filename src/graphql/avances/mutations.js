import { gql } from '@apollo/client'

const EDITAR_AVANCE = gql`
mutation Mutation($id: String!, $proyecto: String!, $fecha: Date!, $descripcion: String!, $observaciones: [String] $creadoPor: String!) {
    editarAvance(_id: $id, proyecto: $proyecto, fecha: $fecha, descripcion: $descripcion, observaciones: $observaciones, creadoPor: $creadoPor) {
      _id
      proyecto
      fecha
      descripcion
      observaciones
      creadoPor

    }
  }
  
`

export {EDITAR_AVANCE};