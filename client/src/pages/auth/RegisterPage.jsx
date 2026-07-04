import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthLayout from "../../layouts/AuthLayout";
import AuthForm from "../../components/forms/AuthForm";
import AuthFooter from "../../components/auth/AuthFooter";

import registerSchema from "../../utils/registerSchema";

import { register as registerApi } from "../../services/authApi";

import { ROLES } from "../../constants/roles";

const RegisterPage = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(registerSchema),

        defaultValues: {
            role: ROLES.CLIENT,
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await registerApi(data);

            toast.success(response.message);

            navigate("/", {
                replace: true,
            });
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Registration failed."
            );
        }
    };

    return (
        <AuthLayout>
            <AuthForm
                mode="register"
                title="Create Account"
                subtitle="Create your VaultPay account"
                buttonText="Create Account"
                register={register}
                errors={errors}
                isSubmitting={isSubmitting}
                onSubmit={handleSubmit(onSubmit)}
                footer={
                    <AuthFooter
                        text="Already have an account?"
                        linkText="Sign In"
                        to="/"
                    />
                }
            >
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Role
                    </label>

                    <select
                        {...register("role")}
                        className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                    >
                        <option value={ROLES.CLIENT}>
                            Client
                        </option>

                        <option value={ROLES.ADMIN}>
                            Admin
                        </option>
                    </select>

                    {errors.role && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.role.message}
                        </p>
                    )}
                </div>
            </AuthForm>
        </AuthLayout>
    );
};

export default RegisterPage;