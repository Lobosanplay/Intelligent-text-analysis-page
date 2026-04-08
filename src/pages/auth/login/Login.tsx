import { Link, useNavigate } from "react-router-dom";
import z from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useAuth } from "../../../shared/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
            Welcome back
          </h2>
          <p className="text-neutral-400 mt-2 text-sm">
            Login to continue to your account
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <input
            type="text"
            {...register("email")}
            placeholder="email"
            className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />

          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />
          {errors.password && (
            <div className="text-red-300 text-sm mt-2 font-medium bg-black px-3 py-2 rounded-sm border border-red-500">
              {errors.password.message}
            </div>
          )}
          <button
            disabled={isLoading}
            type="submit"
            className={`${isLoading ? "cursor-not-allowed" : "cursor-pointer"}  mt-1 w-full bg-purple-900/60 text-white font-semibold py-2 rounded-md hover:bg-purple-900 transition`}
          >
            {isLoading ? "Validando..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-neutral-700" />
          <span className="text-neutral-400 text-sm">or continue with</span>
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
          Don’t have an account?{" "}
          <Link
            to="/auth/register"
            className="text-white font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
