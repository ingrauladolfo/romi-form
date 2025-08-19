// components/PrescriptionsTable.tsx
import React from 'react';
import type { Prescription, PrescriptionProps } from '../../interfaces/pages/PrescriptionsLIsts';
import { formatDateTime } from '../../utils/formatDateTime';
import { prescriptionsTableText } from '../../assets/data/components/PrescriptionsTable';

const PrescriptionsTable: React.FC<PrescriptionProps> = ({ prescriptions, symptoms, lang }) => {
  const t = prescriptionsTableText[lang] ?? prescriptionsTableText.en;

  const getSymptomLabel = (key: string) => {
    const symptom = symptoms.find((s) => s.key === key);
    return symptom ? symptom.label : key;
  };

  const getSymptomPainLevelText = (prescription: Prescription) => {
    return (prescription.symptoms || [])
      .map((symptom) => {
        const painLevel = symptom.level;
        return `${getSymptomLabel(symptom.key)}: ${painLevel ?? 'N/A'}`;
      })
      .join(', ');
  };

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr className="bg-gray-200 text-gray-800">
          <th className="p-3 border">{t.id}</th>
          <th className="p-3 border">{t.patientName}</th>
          <th className="p-3 border">{t.age}</th>
          <th className="p-3 border">{t.email}</th>
          <th className="p-3 border">{t.phone}</th>
          <th className="p-3 border">{t.onsetDate}</th>
          <th className="p-3 border">{t.symptomsAndPain}</th>
          <th className="p-3 border">{t.notes}</th>
          <th className="p-3 border">{t.createdAt}</th>
        </tr>
      </thead>

      <tbody>
        {prescriptions.map(({ id, patientName, age, email, phone, onsetDate, symptoms: presSymptoms, notes, createdAt }) => (
          <tr key={id} className="text-gray-700 hover:bg-gray-100">
            <td className="p-3 border">{id}</td>
            <td className="p-3 border">{patientName}</td>
            <td className="p-3 border">{age}</td>
            <td className="p-3 border">{email}</td>
            <td className="p-3 border">{phone}</td>
            <td className="p-3 border">{formatDateTime(onsetDate, lang)}</td>
            <td className="p-3 border">{getSymptomPainLevelText({ id, patientName, age, email, phone, onsetDate, symptoms: presSymptoms, notes, createdAt })}</td>
            <td className="p-3 border">{notes || t.notesText}</td>
            <td className="p-3 border">{formatDateTime(createdAt, lang)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PrescriptionsTable;
