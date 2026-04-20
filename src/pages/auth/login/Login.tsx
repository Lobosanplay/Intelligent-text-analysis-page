import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../shared/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import AuthLayout from "../components/AuthLayout";

const loginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

type loginFormFields = z.infer<typeof loginFormSchema>;

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormFields>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<loginFormFields> = async ({
    email,
    password,
  }) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await signIn(navigate, email, password);
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
    <AuthLayout
      title="MultiSense AI"
      subtitle="Access your workspace and automate your time with our free topic extraction system."
    >
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.15)] p-8 rounded-2xl flex flex-col">
        <div className="mb-6 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white">
            Welcome back
          </h2>
          <p className="text-neutral-400 mt-2 text-sm">
            Login to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <input
            type="text"
            {...register("email")}
            placeholder="Email"
            className="w-full p-3 bg-neutral-900 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-3 bg-neutral-900 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
          />

          {errors.password && (
            <div className="text-red-300 text-sm bg-black px-3 py-2 rounded border border-red-500">
              {errors.password.message}
            </div>
          )}

          <button
            disabled={isLoading}
            type="submit"
            className="mt-2 w-full bg-purple-600 hover:bg-purple-500 cursor-pointer transition text-white py-3 rounded-md font-semibold"
          >
            {isLoading ? "validating..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-neutral-400 text-sm">or continue with</span>
          <div className="flex-1 h-px bg-neutral-700" />
        </div>

        <button
          disabled
          className="w-full cursor-not-allowed border border-neutral-700 text-white py-3 rounded-md hover:bg-neutral-800 transition"
        >
          Continue with Google
        </button>

        <p className="text-center text-neutral-400 text-sm mt-6">
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-white font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
