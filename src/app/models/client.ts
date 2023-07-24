export interface Client {
    clientId: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  emergencyPhoneNumber: string;
  birthday: Date;
  gender: Gender;
  isActive: boolean;
  streetAddress: string;
  addressNumber: string;
  colony: string;
  city: string;
  state: string;
  zipCode: string;
}

export enum Gender {
    M = 'M',
    F = 'F',
    O = 'O',
  }