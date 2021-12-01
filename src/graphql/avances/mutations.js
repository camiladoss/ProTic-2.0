import { gql } from '@apollo/client'

const EDITAR_AVANCE = gql`
mutation editarAvance($_id: String!, $descripcion: String!, $observaciones: [String]) {
    editarAvance(_id: $_id, descripcion: $descripcion, observaciones: $observaciones) {
      _id
      descripcion
      observaciones
      
    }
  }
  
`

export {EDITAR_AVANCE};