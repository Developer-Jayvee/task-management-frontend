import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginFormData, loginSchema } from "../types/authTypes";
import { loginRequest, registerDevice } from "../services/api/auth-api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/useAuthStore";
import type { UserResponseData } from "@/features/user-management/types/user-types";
// import { loginMutation } from "../services/loginQuery";
export default function useLogin() {
  const navigate = useNavigate();
  const authStore = useAuthStore((state) => state.setUserData);
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
      if (!data) throw new Error('Error found upon login');
      
      authStore(data.user as UserResponseData)
      navigate(`/${data?.tenant}`);
    },
    retry:false
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
