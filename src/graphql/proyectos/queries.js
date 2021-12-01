import { gql } from '@apollo/client'

const GET_PROYECTOS = gql`
query Proyectos {
  
  Proyectos {
    nombre
    estado
    fase
    lider {
      nombre
      apellido
    }
    _id
  }
}
`;

const GET_PROYECTO=gql `
query Proyecto($_id: String!) {
    Proyecto(_id: $_id) {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
      lider {
        nombre
        apellido
        _id
      }
      objetivos {
        descripcion
        tipo
      }
    }
  }
`

export {GET_PROYECTO, GET_PROYECTOS}
