import { useState, type FormEvent } from "react";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { Sparkles, Mail, Lock, ArrowRight } from "lucide-react";
import { loginUser, loginWithGoogle } from "../services/auth";
import { useAuthStore } from "../store/authStore";
import { toast } from "../store/toastStore";
import GoogleIcon from "../components/icons/GoogleIcon";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const login = useAuthStore((s) => s.login);
  const currentUser = useAuthStore((s) => s.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (currentUser) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const user = await loginUser(email, password);
      login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      });
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Failed to sign in. Please check your credentials.";
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    try {
      const user = await loginWithGoogle();
      login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      });
      toast.success("Signed in with Google");
      navigate(from, { replace: true });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Google sign-in failed";
      toast.error(msg);
    }
  };

  return (
    <div className="w-full bg-white/85 dark:bg-[#143838]/85 backdrop-blur-2xl rounded-3xl p-7 sm:p-9 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10 shadow-[0_20px_50px_rgba(15,42,42,0.15)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.6)] transition-colors duration-300">
      {/* Card Header */}
      <div className="mb-7">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00bfa6]/15 border border-[#00bfa6]/30 mb-4">
          <Sparkles size={12} className="text-[#00bfa6]" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#00bfa6] font-bold">
            Member Access
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#0f2a2a] dark:text-[#d9faf4] tracking-tight">
          Welcome back
        </h1>
        <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 mt-1.5 leading-relaxed">
          Sign in to synthesize celebrations and manage automated milestone greetings.
        </p>
      </div>

      {/* Google SSO Button */}
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full py-2.5 px-4 bg-white/70 dark:bg-white/[0.04] hover:bg-white dark:hover:bg-white/[0.08] border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 hover:border-[#00bfa6] rounded-xl flex items-center justify-center gap-2.5 text-xs font-semibold text-[#0f2a2a] dark:text-[#d9faf4] transition-all cursor-pointer mb-5 shadow-sm"
      >
        <GoogleIcon className="w-4 h-4" />
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10"></div>
        </div>
        <span className="relative px-3 bg-white dark:bg-[#143838] text-[10px] uppercase font-mono tracking-widest text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 font-semibold">
          or with email
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="login-email"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 mb-1.5 font-bold"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0f2a2a]/50 dark:text-[#d9faf4]/50"
            />
            <input
              id="login-email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#d9faf4]/40 dark:bg-[#0f2a2a]/50 border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 focus:border-[#00bfa6] rounded-xl text-xs font-medium text-[#0f2a2a] dark:text-[#d9faf4] placeholder-[#0f2a2a]/40 dark:placeholder-[#d9faf4]/40 focus:outline-none focus:ring-1 focus:ring-[#00bfa6] transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="block text-[11px] font-mono uppercase tracking-wider text-[#0f2a2a]/70 dark:text-[#d9faf4]/70 font-bold"
            >
              Password
            </label>
            <Link
              to="#"
              className="text-[11px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60 hover:text-[#00bfa6] transition-colors"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0f2a2a]/50 dark:text-[#d9faf4]/50"
            />
            <input
              id="login-password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#d9faf4]/40 dark:bg-[#0f2a2a]/50 border border-[#0f2a2a]/15 dark:border-[#d9faf4]/15 focus:border-[#00bfa6] rounded-xl text-xs font-medium text-[#0f2a2a] dark:text-[#d9faf4] placeholder-[#0f2a2a]/40 dark:placeholder-[#d9faf4]/40 focus:outline-none focus:ring-1 focus:ring-[#00bfa6] transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-2 bg-[#00bfa6] text-[#0f2a2a] text-xs font-bold rounded-xl transition-all shadow-[0_0_24px_rgba(0,191,166,0.35)] hover:shadow-[0_0_32px_rgba(0,191,166,0.6)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{isSubmitting ? "Signing in..." : "Sign in to Wishes AI"}</span>
          <ArrowRight size={14} />
        </button>
      </form>

      <div className="mt-6 text-center pt-4 border-t border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
        <p className="text-xs text-[#0f2a2a]/70 dark:text-[#d9faf4]/70">
          Need an account?{" "}
          <Link
            to="/register"
            className="text-[#00bfa6] font-bold hover:underline"
          >
            Create one in seconds
          </Link>
        </p>
      </div>
    </div>
  );
}
