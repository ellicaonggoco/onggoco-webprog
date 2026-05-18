import { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-[#ff6b00]/50 focus:bg-white/10 focus:ring-4 focus:ring-[#ff6b00]/10";

const actionButtonClassName =
  "w-full rounded-2xl py-4 text-[12px] font-bold uppercase tracking-[0.25em] transition-all duration-300 active:scale-[0.98]";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password
    ) {
      setError("All fields are required");
      setLoading(false);
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      // Note: backend defaults type to "viewer" (lowercase)
      const response = await createUser(formData);
      console.log("Registration success:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      }

      setSuccess("Registration successful! Redirecting to login...");
      setFormData({ firstName: "", lastName: "", email: "", password: "" });

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/auth/signin";
      }, 2000);
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8">
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Join <span className="text-[#ff6b00]">Us!</span>
        </h1>
        <p className="mt-4 text-base text-zinc-400">
          Start your journey with a modern monochrome experience.
        </p>
      </header>

      {error && (
        <div className="mb-6 rounded-2xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20">
          {error}
        </div>
      )}
      {success && (
        <div className="mb-6 rounded-2xl bg-green-500/10 p-4 text-sm text-green-400 border border-green-500/20">
          {success}
        </div>
      )}

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className={inputClasses}
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className={inputClasses}
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div>
          <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            className={inputClasses}
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className={inputClasses}
            value={formData.password}
            onChange={handleChange}
            required
          />
          <p className="mt-3 ml-1 text-[10px] text-zinc-500 italic">
            8+ characters with a mix of symbols.
          </p>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={loading}
            className={`${actionButtonClassName} bg-[#ff6b00] text-white shadow-[0_10px_20px_-10px_rgba(255,107,0,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(255,107,0,0.6)] hover:-translate-y-0.5 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </form>

      <footer className="mt-12 text-center">
        <p className="text-sm text-zinc-500">
          Already a member?{" "}
          <Link
            to="/auth/signin"
            className="font-bold text-white hover:text-[#ff6b00] transition"
          >
            Log In
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default SignUpPage;
