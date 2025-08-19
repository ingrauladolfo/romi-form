
type SymptomItem = {
  id: number
  key: string
  label: string
}

type FormState = {
  patientName: string
  age: number  // Campo para la edad
  email: string  // Campo para el email
  phone: string  // Campo para el celular
  onsetDate: string
  symptoms: Record<string, boolean>
  painLevel: Record<string, number>  // Cambiado a un objeto para manejar painLevel por síntoma
  notes: string
}


export type { SymptomItem, FormState }