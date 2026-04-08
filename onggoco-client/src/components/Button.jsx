import { Link } from "react-router-dom";
const variantClasses = {
  primary: "bg-[#ff6b00] text-white hover:bg-[#e66000] border-transparent",
  secondary:
    "bg-transparent text-zinc-900 border-zinc-900 hover:bg-zinc-800 hover:text-white dark:text-white dark:border-zinc-700",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
}) => {
  const base =
    "inline-flex items-center justify-center rounded-lg border px-6 py-2.5 text-[12px] font-bold uppercase tracking-wider transition-all duration-200";
  const variantClass = variantClasses[variant] ?? variantClasses.secondary;
  const classes = `${base} ${variantClass} ${className}`.trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
