import { gql } from '@apollo/client'

const EDITAR_INSCRIPCION = gql`
    mutation EditarInscripcion($id: String!, $estudiante: String!, $proyecto: String!) {
        editarInscripcion(_id: $id, estudiante: $estudiante, proyecto: $proyecto) {
            _id
            proyecto {
                nombre
                _id
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
`

export { EDITAR_INSCRIPCION };