export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  bloodGroup: string;
  treatmentType: string;
  diagnosis: string;
  transfusionInterval: number;
  lastTransfusion: string;
  nextTransfusion: string;
  riskLevel: 'Low' | 'Medium' | 'High';
  notes: string;
  contactNumber: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string[];
  transfusionHistory: TransfusionRecord[];
}

export interface TransfusionRecord {
  id: string;
  date: string;
  bloodType: string;
  volume: number;
  reactions: string;
  notes: string;
  doctorName: string;
}

export interface ScheduledTransfusion {
  id: string;
  patientId: string;
  patientName: string;
  bloodType: string;
  scheduledDate: string;
  scheduledTime: string;
  stage: string;
  status: 'Scheduled' | 'Overdue' | 'Completed' | 'Cancelled';
  priority: 'Low' | 'Medium' | 'High';
}

export const mockPatients: Patient[] = [
  {
    id: 'TH001',
    name: 'Sarah Mitchell',
    age: 28,
    gender: 'Female',
    bloodGroup: 'B+',
    treatmentType: 'Regular Transfusion',
    diagnosis: 'Beta Thalassemia Major',
    transfusionInterval: 21,
    lastTransfusion: '2024-01-15',
    nextTransfusion: '2024-02-05',
    riskLevel: 'Medium',
    notes: 'Responds well to treatment. Monitor iron levels.',
    contactNumber: '+1-555-0123',
    address: '123 Oak Street, Medical City',
    emergencyContact: 'John Mitchell (Husband) - +1-555-0124',
    medicalHistory: ['Iron overload', 'Splenectomy 2019'],
    transfusionHistory: [
      {
        id: 'TR001',
        date: '2024-01-15',
        bloodType: 'B+',
        volume: 350,
        reactions: 'None',
        notes: 'Routine transfusion completed successfully',
        doctorName: 'Dr. Anderson'
      }
    ]
  },
  {
    id: 'TH002',
    name: 'Michael Chen',
    age: 34,
    gender: 'Male',
    bloodGroup: 'A-',
    treatmentType: 'Chelation + Transfusion',
    diagnosis: 'Beta Thalassemia Major',
    transfusionInterval: 28,
    lastTransfusion: '2024-01-10',
    nextTransfusion: '2024-02-07',
    riskLevel: 'High',
    notes: 'High iron levels. Increase chelation therapy.',
    contactNumber: '+1-555-0234',
    address: '456 Pine Avenue, Healthcare District',
    emergencyContact: 'Lisa Chen (Wife) - +1-555-0235',
    medicalHistory: ['Cardiac complications', 'Diabetes Type 2'],
    transfusionHistory: [
      {
        id: 'TR002',
        date: '2024-01-10',
        bloodType: 'A-',
        volume: 400,
        reactions: 'Mild fever',
        notes: 'Pre-medication with antihistamines helped',
        doctorName: 'Dr. Rodriguez'
      }
    ]
  },
  {
    id: 'TH003',
    name: 'Emma Rodriguez',
    age: 19,
    gender: 'Female',
    bloodGroup: 'O+',
    treatmentType: 'Regular Transfusion',
    diagnosis: 'Beta Thalassemia Intermedia',
    transfusionInterval: 35,
    lastTransfusion: '2024-01-20',
    nextTransfusion: '2024-02-24',
    riskLevel: 'Low',
    notes: 'Stable condition. Regular monitoring required.',
    contactNumber: '+1-555-0345',
    address: '789 Elm Drive, University Quarter',
    emergencyContact: 'Maria Rodriguez (Mother) - +1-555-0346',
    medicalHistory: ['Bone deformities (mild)'],
    transfusionHistory: [
      {
        id: 'TR003',
        date: '2024-01-20',
        bloodType: 'O+',
        volume: 300,
        reactions: 'None',
        notes: 'Excellent tolerance to treatment',
        doctorName: 'Dr. Williams'
      }
    ]
  },
  {
    id: 'TH004',
    name: 'James Wilson',
    age: 42,
    gender: 'Male',
    bloodGroup: 'AB+',
    treatmentType: 'Intensive Chelation',
    diagnosis: 'Beta Thalassemia Major',
    transfusionInterval: 14,
    lastTransfusion: '2024-01-25',
    nextTransfusion: '2024-02-08',
    riskLevel: 'High',
    notes: 'Critical iron overload. Requires immediate attention.',
    contactNumber: '+1-555-0456',
    address: '321 Maple Road, Central District',
    emergencyContact: 'Nancy Wilson (Sister) - +1-555-0457',
    medicalHistory: ['Heart complications', 'Liver dysfunction', 'Endocrine disorders'],
    transfusionHistory: [
      {
        id: 'TR004',
        date: '2024-01-25',
        bloodType: 'AB+',
        volume: 450,
        reactions: 'Chest tightness',
        notes: 'Monitored closely during procedure',
        doctorName: 'Dr. Thompson'
      }
    ]
  }
];

export const mockScheduledTransfusions: ScheduledTransfusion[] = [
  {
    id: 'ST001',
    patientId: 'TH001',
    patientName: 'Sarah Mitchell',
    bloodType: 'B+',
    scheduledDate: '2024-02-05',
    scheduledTime: '09:00',
    stage: 'Pre-transfusion',
    status: 'Scheduled',
    priority: 'Medium'
  },
  {
    id: 'ST002',
    patientId: 'TH002',
    patientName: 'Michael Chen',
    bloodType: 'A-',
    scheduledDate: '2024-02-03',
    scheduledTime: '10:30',
    stage: 'Blood matching',
    status: 'Overdue',
    priority: 'High'
  },
  {
    id: 'ST003',
    patientId: 'TH004',
    patientName: 'James Wilson',
    bloodType: 'AB+',
    scheduledDate: '2024-02-08',
    scheduledTime: '14:00',
    stage: 'Scheduled',
    status: 'Scheduled',
    priority: 'High'
  },
  {
    id: 'ST004',
    patientId: 'TH003',
    patientName: 'Emma Rodriguez',
    bloodType: 'O+',
    scheduledDate: '2024-02-24',
    scheduledTime: '11:15',
    stage: 'Scheduled',
    status: 'Scheduled',
    priority: 'Low'
  }
];