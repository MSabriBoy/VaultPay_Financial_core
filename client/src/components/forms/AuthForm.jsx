import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const AuthForm = ({
  mode,
  title,
  subtitle,
  buttonText,
  register,
  errors,
  isSubmitting,
  onSubmit,
  children,
  footer,
}) => {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-slate-500">
          {subtitle}
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-5"
      >
        {mode === "register" && (
          <div>
            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              {...register("name")}
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <div className="relative">
            <input
              {...register("password")}
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Enter your password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>
        {children}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting
            ? "Please wait..."
            : buttonText}
        </button>
        
        {footer && (
          <div className="mt-6 border-t border-slate-200 pt-6">
            {footer}
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;