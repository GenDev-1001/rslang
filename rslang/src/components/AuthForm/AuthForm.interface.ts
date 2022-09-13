export interface IAuthFormProps {
  isRegister: boolean;
  handleLogin: () => void;
  navigate: () => void;
  hideModal: () => void;
}

export interface IAuthForm {
  name: string;
  email: string;
  password: string;
}

export interface IAuthFormSentResponse {
  message: string;
}
