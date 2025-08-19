interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}


export type {ValidationResult}