import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormData, loginSchema } from "../types/authTypes";
import { loginRequest, registerDevice } from "../services/api/auth-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// import { loginMutation } from "../services/loginQuery";
export default function useLogin() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  
  
  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      navigate(`/${data?.tenant}`);
    }
  });
  const setCookie = useQuery({
    queryKey:['set-cookie-device'],
    queryFn:registerDevice,
    enabled:false
  })
  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    setCookie.refetch();
    loginMutation.mutate(data);

    if (loginMutation.isError) {
      toast.warning(loginMutation.error.message)
      reset()
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
  };
}
