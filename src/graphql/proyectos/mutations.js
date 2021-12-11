import { gql } from '@apollo/client'

const CREAR_PROYECTO = gql`
mutation CrearProyecto($nombre: String!, $presupuesto: String!, $fechaInicio: Date, $lider: String!, $objetivoGeneral: String!, $objetivos: [crearObjetivo]!) {
  crearProyecto(nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, lider: $lider, objetivoGeneral: $objetivoGeneral, objetivos: $objetivos) {
    nombre
    presupuesto
    estado
    fase
  }
}
  `
  const EDITAR_PROYECTO=gql`
    mutation EditarProyecto($_id: String!, $nombre: String, $presupuesto: String, $fechaInicio: Date, $fechaFin: Date, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto, $lider: String, $objetivoGeneral: String, $objetivos: [crearObjetivo]) {
      editarProyecto(_id: $_id, nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, estado: $estado, fase: $fase, lider: $lider, objetivoGeneral: $objetivoGeneral, objetivos: $objetivos) {
        nombre
        presupuesto
        fechaInicio
        fechaFin
        objetivos {
          descripcion
        }
        objetivoGeneral
        fase
        estado
        lider {
          _id
        }
    }
  }
  `

export { CREAR_PROYECTO, EDITAR_PROYECTO };