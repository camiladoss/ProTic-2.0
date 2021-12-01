import { gql } from '@apollo/client'

const CREAR_PROYECTO = gql`
mutation CrearProyecto( $_id: String!, $nombre: String!, $presupuesto: String!, $fechaInicio: Date!, $fechaFin: Date!, $lider: String!, $fase: Enum_FaseProyecto, $estado: Enum_EstadoProyecto, $objetivos: [crearObjetivo]) {
  crearProyecto( _id:$_id,nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, lider: $lider, fase: $fase, estado: $estado, objetivos: $objetivos) {
    _id 
    nombre 
     presupuesto
     fechaInicio
     fechaFin
     estado
     fase
     lider 
     objectivos
    }
  }
  `
  const EDITAR_PROYECTO=gql`
  mutation EditarProyecto($_id: String!, $nombre: String, $presupuesto: String, $fechaInicio: Date, $fechaFin: Date, $estado: Enum_EstadoProyecto, $fase: Enum_FaseProyecto) {
    editarProyecto(_id: $_id, nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, estado: $estado, fase: $fase) {
      _id
      nombre
      presupuesto
      fechaInicio
      fechaFin
      estado
      fase
    }
  }
  `

export { CREAR_PROYECTO, EDITAR_PROYECTO };