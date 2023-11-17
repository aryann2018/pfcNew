import { useMutation } from "@tanstack/react-query";
import { GENERATE_OTP, LOGIN } from "./constants";
import {
  GenerateOtpRequest,
  GenerateOtpMutationArgs,
  GenerateOtpResponse,
  LoginRequest,
  LoginMutationArgs,
  LoginResponse,
} from "./types";
import { post } from "../../utilities/api";

export const useGenerateOtp = ({
  onSuccess,
  onError,
}: GenerateOtpMutationArgs) => {
  const mutation = useMutation({
    mutationFn: async (request: GenerateOtpRequest) => {
      const res = await post<GenerateOtpRequest, GenerateOtpResponse>(
        GENERATE_OTP,
        request
      );
      return res!.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
};

export const useLogin = ({ onSuccess, onError }: LoginMutationArgs) => {
  const mutation = useMutation({
    mutationFn: async (request: LoginRequest) => {
      const res = await post<LoginRequest, LoginResponse>(LOGIN, request);
      return res!.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
};
