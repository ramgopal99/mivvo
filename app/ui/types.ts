export interface DesignElement {
  id: string
  type: 'rectangle' | 'circle' | 'text' | 'line'
  x: number
  y: number
  width: number
  height: number
  fill: string
  stroke: string
  strokeWidth: number
  text?: string
  fontSize?: number
  fontFamily?: string
  rotation?: number
}
