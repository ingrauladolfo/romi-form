// translations/validation.ts
const validationMessages = {
    patientName: {
        es: 'Nombre es requerido.',
        en: 'Name is required.'
    },
    age: {
        es: 'La edad debe ser un número entero.',
        en: 'Age must be an integer.'
    },
    ageZero: {
        es: 'La edad no puede ser 0.',
        en: 'Age cannot be 0.'
    },
    ageNegative: {
        es: 'La edad no puede ser negativa.',
        en: 'Age cannot be negative.'
    },
    email: {
        es: 'Email es requerido.',
        en: 'Email is required.'
    },
    emailInvalid: {
        es: 'Email inválido.',
        en: 'Invalid email.'
    },
    phone: {
        es: 'Celular es requerido.',
        en: 'Phone number is required.'
    },
    phoneInvalid: {
        es: 'Celular debe contener solo números.',
        en: 'Phone must contain only numbers.'
    },
    phoneNegative: {
        es: 'Celular no puede tener números negativos.',
        en: 'Phone cannot have negative numbers.'
    },
    onsetDate: {
        es: 'Fecha de inicio es requerida.',
        en: 'Onset date is required.'
    },
    symptoms: {
        es: 'Seleccione al menos un síntoma.',
        en: 'Select at least one symptom.'
    },
    painLevel: {
        es: 'Nivel de dolor debe estar entre 0 y 10.',
        en: 'Pain level must be between 0 and 10.'
    }
}
export { validationMessages }