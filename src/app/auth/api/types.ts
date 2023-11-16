export type UserType = "client" | "coach";

export type GenerateOtpRequest = {
  phone_number: string;
};

export type GenerateOtpResponse = {
  is_success: boolean;
  message: string | null;

  //ONLY FOR TESTING
  phone_number: string;
  otp: string;
};

export type GenerateOtpMutationArgs = {
  onSuccess: (data: GenerateOtpResponse) => void;
  onError: (error: any) => void;
};

export type VerifyOtpRequest = {
  phone_number: string;
  otp: string;
};

export type VerifyOtpResponse = {
  is_success: boolean;
  message: string | null;
};

export type VerifyOtpMutationArgs = {
  onSuccess: (data: VerifyOtpResponse) => void;
  onError: (error: any) => void;
};

export type LoginRequest = {
  phone_number: string;
  otp: string;
};

export type LoginResponse = {
  created_at: string;
  expiry: string;
  is_diet_history_added: boolean;
  is_profile_updated: boolean;
  is_success: boolean;
  message: string | null;
  token: string;
  user_type: UserType;
};

export type LoginMutationArgs = {
  onSuccess: (data: LoginResponse) => void;
  onError: (error: any) => void;
};
