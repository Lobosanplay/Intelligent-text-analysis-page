import { Link } from "react-router-dom";

export default function Login() {
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

        <form className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Username or email"
            className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 bg-neutral-800 text-white rounded-md border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/20 transition"
          />
          <button
            type="submit"
            className="mt-1 w-full bg-purple-900/60 text-white font-semibold py-2 rounded-md hover:bg-purple-900 transition"
          >
            Login
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
            to="/register"
            className="text-white font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </section>
  );
}
