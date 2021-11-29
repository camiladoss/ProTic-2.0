import { gql } from '@apollo/client'

const GET_USUARIOS = gql`
    query Usuarios {
        Usuarios {
            _id
            nombre
            apellido
            correo
            estado
            identificacion
            rol
        }
    }
`;

const GET_USUARIO = gql`
    query Usuario ($_id: String!){
        Usuario (_id: $_id) {
        _id
        nombre
        apellido
        correo
        estado
        identificacion
        rol
        }
    }
`

const GET_ESTUDIANTES = gql`
query Estudiantes {
    Estudiantes {
    nombre
    apellido
    _id
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO, GET_ESTUDIANTES };