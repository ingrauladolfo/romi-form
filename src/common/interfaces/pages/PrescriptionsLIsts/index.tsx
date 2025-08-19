import type { Symptom } from "../shared";

interface Prescription {
  id: string;
  patientName: string;
  age: number;
  email: string;
  phone: string;
  onsetDate: string;
  symptoms: { key: string; label: string; level: number }[];
  notes: string;
  createdAt: string;
}

interface PrescriptionProps {
  prescriptions: Prescription[];
  symptoms: Symptom[];
  lang: 'es' | 'en'; // <- aquí está la clave
  theme: string;
}

export type { Prescription, PrescriptionProps  }