export interface RegistrationData {
  username: string;
  email: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface CreatePiggybankData {
  name: string;
  balance: number;
  userId: string;
}
