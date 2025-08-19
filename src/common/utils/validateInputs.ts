import { validationMessages } from "../assets/data/utils";
import type { FormState } from "../interfaces/components/SymptomForm";
import type { ValidationResult } from "../interfaces/utils";


export function validateInputs(form: FormState, lang: 'en' | 'es'): ValidationResult {
  const errors: Record<string, string> = {};

  // Nombre
  if (!form.patientName.trim()) {
    errors.patientName = validationMessages.patientName[lang] || validationMessages.patientName.en;
  }

  // Edad
  if (typeof form.age !== 'number' || isNaN(form.age) || !Number.isInteger(form.age)) {
    errors.age = validationMessages.age[lang] || validationMessages.age.en;
  } else if (form.age === 0) {
    errors.age = validationMessages.ageZero[lang] || validationMessages.ageZero.en;
  } else if (form.age < 0) {
    errors.age = validationMessages.ageNegative[lang] || validationMessages.ageNegative.en;
  }

  // Email
  if (!form.email.trim()) {
    errors.email = validationMessages.email[lang] || validationMessages.email.en;
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = validationMessages.emailInvalid[lang] || validationMessages.emailInvalid.en;
  }

  // Celular
  if (!form.phone.trim()) {
    errors.phone = validationMessages.phone[lang] || validationMessages.phone.en;
  } else if (!/^\d+$/.test(form.phone)) {
    errors.phone = validationMessages.phoneInvalid[lang] || validationMessages.phoneInvalid.en;
  } else if (parseInt(form.phone, 10) < 0) {
    errors.phone = validationMessages.phoneNegative[lang] || validationMessages.phoneNegative.en;
  }

  // Fecha
  if (!form.onsetDate) {
    errors.onsetDate = validationMessages.onsetDate[lang] || validationMessages.onsetDate.en;
  }

  // Síntomas y niveles de dolor
  const anySymptom = Object.values(form.symptoms || {}).some(Boolean);
  const anyPainLevel = Object.values(form.painLevel || {}).some(level => Number(level) > 0);

  if (!anySymptom && !anyPainLevel) {
    errors.symptoms = validationMessages.symptoms[lang] || validationMessages.symptoms.en;
  }

  Object.entries(form.painLevel || {}).forEach(([key, value]) => {
    const num = Number(value);
    if (isNaN(num) || num < 0 || num > 10) {
      errors[`painLevel-${key}`] = validationMessages.painLevel[lang] || validationMessages.painLevel.en;
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
