import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-2xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-white outline-none transition-all duration-300 placeholder:text-zinc-600 focus:border-[#ff6b00]/50 focus:bg-white/10 focus:ring-4 focus:ring-[#ff6b00]/10";

const actionButtonClassName =
  "w-full rounded-2xl py-4 text-[12px] font-bold uppercase tracking-[0.25em] transition-all duration-300 active:scale-[0.98]";

const SignUpPage = () => {
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

      <form className="space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              className={inputClasses}
            />
          </div>
          <div>
            <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
            Email Address
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            className={inputClasses}
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
          />
          <p className="mt-3 ml-1 text-[10px] text-zinc-500 italic">
            8+ characters with a mix of symbols.
          </p>
        </div>

        <div className="pt-4">
          <Button
            to="/auth/signin"
            type="submit"
            className={`${actionButtonClassName} bg-[#ff6b00] text-white shadow-[0_10px_20px_-10px_rgba(255,107,0,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(255,107,0,0.6)] hover:-translate-y-0.5`}
          >
            Create Account
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
