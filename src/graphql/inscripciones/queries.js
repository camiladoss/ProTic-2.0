import { gql } from '@apollo/client'

const GET_INSCRIPCIONES = gql`
    query Inscripciones {
        Inscripciones {
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

export { GET_INSCRIPCIONES, GET_FILTRARINSCRIPCION};