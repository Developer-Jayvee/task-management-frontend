import { useForm, type SubmitHandler } from "react-hook-form";
import { type RegisterFormData, registerSchema } from "../types/authTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../services/api/auth-api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function useRegister() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const registerMutation = useMutation({
    mutationFn: registerRequest,

    onSuccess: (data) => {
      toast.warning(data?.message);
      reset();
      navigate("/login");
    },
  });
  const onSubmit: SubmitHandler<RegisterFormData> = (
    data: RegisterFormData,
  ) => {
    registerMutation.mutate(data);
    if (registerMutation.isError) {
      toast.warning(registerMutation.error.message);
    }
  };
  return {
    handleSubmit,
    register,
    reset,
    errors,
    onSubmit,
  };
}
