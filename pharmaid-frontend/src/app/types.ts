export type Medication = {
  id: string;
  name: string;
  dosage: number;
  numOfDoses: number,
  startDate: Date,
  endDate: Date | null,
  isActive: boolean,
};

export type MedicationEntry = {
  id: string;
  medication: {
    medicationName: string;
  };
  dosage: number;
  numOfDoses: number;
  startDate: string;
  endDate: string | null;
  isActive: boolean;
};

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  pharmaId: string;
};

