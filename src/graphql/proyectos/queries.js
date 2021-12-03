import { gql } from "@apollo/client";

const GET_PROYECTOS = gql`
  query Proyectos {
    Proyectos {
      _id
      nombre
      estado
      fase
      lider {
        nombre
        apellido
      }
      inscripciones {
        estudiante {
          _id
        }
      }
    }
  }
`;

const GET_PROYECTO = gql`
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
`;

const GET_MIS_PROYECTOS = gql`
  query MisProyectos {
    MisProyectos {
      nombre
      presupuesto
      estado
      fase
    }
  }
`;

export { GET_PROYECTO, GET_PROYECTOS, GET_MIS_PROYECTOS};
