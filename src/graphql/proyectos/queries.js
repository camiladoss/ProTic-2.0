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
        fechaEgreso
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
    nombre
    presupuesto
    estado
    fase
    lider {
      _id
      nombre
      apellido
    }
    objetivoGeneral
    objetivos {
      descripcion
    }
    fechaInicio
    fechaFin
  }
}
`;

const GET_MIS_PROYECTOS = gql`
  query MisProyectos {
    MisProyectos {
      _id
      nombre
      presupuesto
      estado
      fase
    }
  }
`;

export { GET_PROYECTO, GET_PROYECTOS, GET_MIS_PROYECTOS};
