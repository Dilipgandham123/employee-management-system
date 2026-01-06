export interface Employee {
  id: string;
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  state: string;
  profileImage: string;
  isActive: boolean;
  createdAt: string;
}

export interface EmployeeFormData {
  fullName: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  state: string;
  profileImage: string;
  isActive: boolean;
}