import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/src/zod.js";
import { useAuth } from "../../../shared/hooks/useAuth";
import { useState } from "react";

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
    message: "password do not match",
    path: ["confirmpassword"],
  });

type registerFormFields = z.infer<typeof registerFormSchema>;

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<registerFormFields>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<registerFormFields> = async ({
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
            : "Algo salio mal, revisa las credenciales",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="min-h-screen bg-black flex items-center justify-center">
      <Link
        to="/"
        className="absolute top-6 left-6 text-sm text-neutral-400 hover:text-white transition"
      >
        ← Back to home
      </Link>
      <div className="w-full max-w-md border border-neutral-800 rounded-xl p-8 shadow-xl">
        <div className="mb-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Create account
          </h2>
          <p className="text-neutral-400 mt-2 text-sm">
            Sign up to start using the platform
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />

          <input
            type="email"
            placeholder="Email"
            {...register("email")}
            className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />

          <input
            type="password"
            placeholder="Password"
            {...register("password")}
            className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />

          <input
            type="password"
            placeholder="Confirm password"
            {...register("confirmpassword")}
            className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />
          {errors.confirmpassword && (
            <div className="text-red-300 text-sm mt-2 font-medium bg-black px-3 py-2 rounded-sm border border-red-500">
              {errors.confirmpassword.message}
            </div>
          )}
          {errors.password && (
            <div className="text-red-300 text-sm mt-2 font-medium bg-black px-3 py-2 rounded-lg border border-red-500">
              {errors.password.message}
            </div>
          )}

          <button
            disabled={isLoading}
            type="submit"
            className="mt-1 w-full bg-purple-900/60 text-white font-semibold py-2 rounded-md hover:bg-purple-900 transition"
          >
            Create account
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-neutral-400 text-sm">or sign up with</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>

        <div className="flex flex-col gap-3">
          <button
            disabled
            className="w-full cursor-not-allowed border border-neutral-700 text-white py-2 rounded-md hover:bg-neutral-800 transition"
          >
            Continue with Google
          </button>
        </div>

        <p className="text-center text-neutral-400 text-sm mt-8">
          Already have an account?{" "}
          <Link to="/login" className="text-white font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
