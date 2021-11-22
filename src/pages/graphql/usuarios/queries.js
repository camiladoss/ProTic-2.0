import {gql} from '@apollo/client';

const GET_USUARIOS = gql`
    query Usuarios {
        Usuarios {
            _id
            nombre
            apellido
            identificacion
            correo
            estado
            rol
        }
    }

`
const GET_USUARIO = gql`
    query Query($id: String!) {
        Usuario(_id: $id) {
            _id
            nombre
            apellido
            identificacion
            correo
            estado
            rol
        }
    }

`

export {GET_USUARIOS, GET_USUARIO};