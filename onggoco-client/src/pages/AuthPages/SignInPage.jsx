import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-[#ff6b00]/50 focus:bg-white/10 focus:ring-4 focus:ring-[#ff6b00]/10";

const actionButtonClassName =
  "w-full rounded-2xl py-4 text-[12px] font-bold uppercase tracking-[0.25em] transition-all duration-300 active:scale-[0.98]";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await loginUser({ email, password });
      console.log("Login success:", data);

      // Store user data & token (adjust keys based on your backend response)
      localStorage.setItem("token", data.token);
      localStorage.setItem("userInfo", JSON.stringify(data));
      // If your backend returns firstName, type, etc. store them
      if (data.firstName) localStorage.setItem("firstName", data.firstName);
      if (data.type) localStorage.setItem("type", data.type);

      // Navigate to dashboard or users page
      navigate("/dashboard");
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Welcome <span className="text-[#ff6b00]">Back!</span>
        </h1>
        <p className="mt-4 text-base text-zinc-400">
          Enter your credentials to access your dashboard.
        </p>
      </header>

      {/* Display error message if any */}
      {error && (
        <div className="mb-6 rounded-2xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
          {error}
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Email Address, Username, or Phone Number"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember-me"
              className="h-4 w-4 rounded border-white/10 bg-white/5 text-[#ff6b00] focus:ring-0 focus:ring-offset-0"
            />
            <label
              htmlFor="remember-me"
              className="text-xs font-medium text-zinc-400 cursor-pointer select-none"
            >
              Remember me
            </label>
          </div>

          <button
            type="button"
            className="text-xs font-bold text-[#ff6b00] hover:text-white transition-colors"
          >
            Forgot Password?
          </button>
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className={`${actionButtonClassName} bg-[#ff6b00] text-white shadow-[0_10px_20px_-10px_rgba(255,107,0,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(255,107,0,0.6)] hover:-translate-y-0.5 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </div>

        <div className="relative flex items-center py-4">
          <div className="flex-grow border-t border-white/5"></div>
          <span className="mx-4 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">
            Or Continue With
          </span>
          <div className="flex-grow border-t border-white/5"></div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/10"
          >
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-2xl border border-white/5 bg-white/5 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/10"
          >
            Apple
          </button>
        </div>
      </form>

      <footer className="mt-12 text-center">
        <p className="text-sm text-zinc-500">
          Don't have an account?{" "}
          <Link
            to="/auth/signup"
            className="font-bold text-white hover:text-[#ff6b00] transition"
          >
            Create Account
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default SignInPage;
