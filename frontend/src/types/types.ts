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
  username: string;
}

export interface CreateTransactionData {
  piggyBankId: string;
  name: string;
  description: string;
  amount: number;
  sender: string;
  receiver: string;
  userName: string;
}
