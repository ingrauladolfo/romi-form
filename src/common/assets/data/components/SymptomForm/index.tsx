// textSymptomForm.ts
const textSymptomForm = {
 es: {
  title:'Registrar síntomas',
    patientName: 'Nombre del paciente',
    age: 'Edad',
    onsetDate: 'Fecha de registro',
    email: 'Correo electrónico',
    phone: 'Celular',
    symptoms: 'Síntomas',
    painLevelLabel: 'Nivel de dolor',
    submit: 'Enviar',
    submitting: 'Enviando...',
    clear: 'Limpiar',
    requiredHint: 'Campos requeridos: nombre, fecha y un síntoma o nivel de dolor',
    fetchError: 'No se pudieron cargar los síntomas.',
    submitSuccess: 'Registro enviado correctamente.',
    submitError: 'Error al enviar. Verifica que json-server esté corriendo.',
    recordSent: 'Registro enviado',
    notes: 'Notas / Observaciones',
    backButton:'Regresar'
  },
  en: {
    title:'Register Symptoms',
    patientName: 'Patient name',
    age: 'Age',
    onsetDate: 'Registration date',
    email: 'Email',
    phone: 'Phone',
    symptoms: 'Symptoms',
    painLevelLabel: 'Pain level',
    submit: 'Submit',
    submitting: 'Submitting...',
    clear: 'Clear',
    requiredHint: 'Required: name, date and at least one symptom or pain level',
    fetchError: "Couldn't load symptoms.",
    submitSuccess: 'Record sent successfully.',
    submitError: 'Error sending. Check json-server is running.',
    recordSent: 'Record sent',
    notes: 'Notes / Observations',
        backButton:'Go back'

  }
}

export { textSymptomForm }
