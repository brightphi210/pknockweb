import { useMutation } from "@tanstack/react-query";
import { post_requests } from "../helper/AxioHelper";

export const useRegistration = () => {
  const registrationMutation = useMutation({
    mutationFn: (data: any) => post_requests("accounts/register/", data),
  });

  return registrationMutation;
};


export const useLogin = () => {
  const loginMutation = useMutation({
    mutationFn: (data: any) => post_requests("accounts/login/", data),
  });

  return loginMutation;
};

