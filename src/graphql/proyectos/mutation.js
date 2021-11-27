import { gql } from '@apollo/client'

const CREAR_PROYECTO = gql`
mutation CrearProyecto($nombre: String!, $presupuesto: Float!, $fechaInicio: Date!, $fechaFin: Date!, $estado: Enum_EstadoProyecto!, $fase: Enum_FaseProyecto!, $lider: String!, $objetivos: [crearObjetivo]!) {
    crearProyecto(nombre: $nombre, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, estado: $estado, fase: $fase, lider: $lider, objetivos: $objetivos) {
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

export { CREAR_PROYECTO };