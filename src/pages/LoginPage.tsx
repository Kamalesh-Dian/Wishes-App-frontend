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
    <div className="w-full bg-[#121217]/90 backdrop-blur-2xl rounded-3xl p-7 sm:p-9 border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
      {/* Card Header */}
      <div className="mb-7">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F5B24A]/10 border border-[#F5B24A]/30 mb-4">
          <Sparkles size={12} className="text-[#F5B24A]" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#F5B24A] font-semibold">
            Member Access
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#F4F1EA] tracking-tight">
          Welcome back
        </h1>
        <p className="text-xs text-[#8E8A82] mt-1.5 leading-relaxed">
          Sign in to synthesize celebrations and manage automated milestone greetings.
        </p>
      </div>

      {/* Google SSO Button */}
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full py-2.5 px-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-xl flex items-center justify-center gap-2.5 text-xs font-semibold text-[#F4F1EA] transition-all cursor-pointer mb-5 shadow-sm"
      >
        <GoogleIcon className="w-4 h-4" />
        <span>Continue with Google</span>
      </button>

      <div className="relative flex items-center justify-center mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.08]"></div>
        </div>
        <span className="relative px-3 bg-[#121217] text-[10px] uppercase font-mono tracking-widest text-[#8E8A82]">
          or with email
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="login-email"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#8E8A82] mb-1.5"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8A82]"
            />
            <input
              id="login-email"
              type="email"
              required
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.03] border border-white/10 focus:border-[#F5B24A]/60 rounded-xl text-xs font-medium text-[#F4F1EA] placeholder-[#8E8A82]/50 focus:outline-none focus:ring-1 focus:ring-[#F5B24A]/60 transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="login-password"
              className="block text-[11px] font-mono uppercase tracking-wider text-[#8E8A82]"
            >
              Password
            </label>
            <Link
              to="#"
              className="text-[11px] text-[#8E8A82] hover:text-[#F5B24A] transition-colors"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Lock
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8A82]"
            />
            <input
              id="login-password"
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.03] border border-white/10 focus:border-[#F5B24A]/60 rounded-xl text-xs font-medium text-[#F4F1EA] placeholder-[#8E8A82]/50 focus:outline-none focus:ring-1 focus:ring-[#F5B24A]/60 transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-2 bg-gradient-to-r from-[#F5B24A] to-[#E08B28] text-[#0A0A0C] text-xs font-bold rounded-xl transition-all shadow-[0_0_24px_rgba(245,178,74,0.3)] hover:shadow-[0_0_32px_rgba(245,178,74,0.5)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{isSubmitting ? "Signing in..." : "Sign in to Wishes AI"}</span>
          <ArrowRight size={14} />
        </button>
      </form>

      <div className="mt-6 text-center pt-4 border-t border-white/[0.06]">
        <p className="text-xs text-[#8E8A82]">
          Need an account?{" "}
          <Link
            to="/register"
            className="text-[#F5B24A] font-semibold hover:underline"
          >
            Create one in seconds
          </Link>
        </p>
      </div>
    </div>
  );
}
