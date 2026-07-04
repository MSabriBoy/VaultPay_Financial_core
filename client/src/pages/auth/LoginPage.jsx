import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../layouts/AuthLayout";
import AuthForm from "../../components/forms/AuthForm";
import AuthFooter from "../../components/auth/AuthFooter";

import loginSchema from "../../utils/loginSchema";

import { login as loginApi } from "../../services/authApi";
import { ROLES } from "../../constants/roles";

import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const redirectUser = (role) => {
    navigate(
      role === ROLES.ADMIN ? "/admin" : "/client",
      {
        replace: true,
      }
    );
  };

  useEffect(() => {
    if (auth.isAuthenticated) {
      redirectUser(auth.user.role);
    }
  }, [auth.isAuthenticated, auth.user]);

  const onSubmit = async (data) => {
    try {
      const response = await loginApi(data);

      auth.login(response.data);

      toast.success(response.message);

      redirectUser(response.data.user.role);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed."
      );
    }
  };

  return (
    <AuthLayout>
      <AuthForm
        mode="login"
        title="Welcome Back"
        subtitle="Sign in to continue"
        buttonText="Sign In"
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
        footer={
          <AuthFooter
            text="Don't have an account?"
            linkText="Create Account"
            to="/register"
          />
        }
      />
    </AuthLayout>
  );
};

export default LoginPage;