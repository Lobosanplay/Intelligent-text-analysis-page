import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

const registerFormSchema = z
  .object({
    email: z.email("Invalid email"),
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/, "At least one uppercase letter")
      .regex(/[a-z]/, "At least one lowercase letter")
      .regex(/[0-9]/, "At least one number")
      .regex(/[^A-Za-z0-9]/, "At least one special character"),
    username: z.string().min(3, "Username too short"),
    confirmpassword: z.string(),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match",
    path: ["confirmpassword"],
  });

type RegisterFormFields = z.infer<typeof registerFormSchema>;

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormFields> = async ({
    email,
    password,
    username,
  }) => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await signUp(navigate, email, password, username);
    } catch (error) {
      setError("password", {
        message:
          error instanceof Error
            ? error.message
            : "Algo salió mal, revisa las credenciales",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your experience with us at no cost"
    >
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.15)] p-8 rounded-2xl flex flex-col">
        <div className="mb-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Create account
          </h2>
          <p className="text-neutral-400 mt-2 text-sm">
            Sign up to start using the platform
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full p-3 bg-neutral-900 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-3 bg-neutral-900 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-3 bg-neutral-900 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmpassword")}
            className="w-full p-3 bg-neutral-900 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          {errors.confirmpassword && (
            <div className="text-red-300 text-sm bg-black px-3 py-2 rounded border border-red-500">
              {errors.confirmpassword.message}
            </div>
          )}

          {errors.password && (
            <div className="text-red-300 text-sm bg-black px-3 py-2 rounded border border-red-500">
              {errors.password.message}
            </div>
          )}

          <button
            disabled={isLoading}
            type="submit"
            className="mt-2 w-full bg-purple-600 hover:bg-purple-500 transition text-white py-3 rounded-md font-semibold"
          >
            {isLoading ? "Validando..." : "Create account"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-neutral-400 text-sm">or sign up with</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>

        <button
          disabled
          className="w-full border border-neutral-700 text-white py-3 rounded-md hover:bg-neutral-800 transition"
        >
          Continue with Google
        </button>

        <p className="text-center text-neutral-400 text-sm mt-6">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-white font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
