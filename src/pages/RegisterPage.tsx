import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Mail, Lock, User, ArrowRight } from "lucide-react";
import { registerUser, loginWithGoogle } from "../services/auth";
import { useAuthStore } from "../store/authStore";
import { toast } from "../store/toastStore";
import GoogleIcon from "../components/icons/GoogleIcon";

export default function RegisterPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the Terms & Privacy Policy to continue.");
      return;
    }
    setIsSubmitting(true);
    try {
      const user = await registerUser(email, password);
      login({
        uid: user.uid,
        email: user.email,
        displayName: name || user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      });
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Registration failed";
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
      toast.success("Signed up with Google!");
      navigate("/dashboard");
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Google sign-up failed";
      toast.error(msg);
    }
  };

  return (
    <div className="w-full bg-[#121217]/90 backdrop-blur-2xl rounded-3xl p-7 sm:p-9 border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.6)]">
      {/* Card Header */}
      <div className="mb-7">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 mb-4">
          <Sparkles size={12} className="text-[#2DD4BF]" />
          <span className="text-[10px] font-mono tracking-widest uppercase text-[#2DD4BF] font-semibold">
            Get Started
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-normal text-[#F4F1EA] tracking-tight">
          Create account
        </h1>
        <p className="text-xs text-[#8E8A82] mt-1.5 leading-relaxed">
          Unlock personalized celebration rendering with true facial likeness.
        </p>
      </div>

      {/* Google SSO Button */}
      <button
        type="button"
        onClick={handleGoogle}
        className="w-full py-2.5 px-4 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 rounded-xl flex items-center justify-center gap-2.5 text-xs font-semibold text-[#F4F1EA] transition-all cursor-pointer mb-5 shadow-sm"
      >
        <GoogleIcon className="w-4 h-4" />
        <span>Sign up with Google</span>
      </button>

      <div className="relative flex items-center justify-center mb-5">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.08]"></div>
        </div>
        <span className="relative px-3 bg-[#121217] text-[10px] uppercase font-mono tracking-widest text-[#8E8A82]">
          or register with email
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="register-name"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#8E8A82] mb-1.5"
          >
            Full Name
          </label>
          <div className="relative">
            <User
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8A82]"
            />
            <input
              id="register-name"
              type="text"
              required
              placeholder="Maya Chen"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.03] border border-white/10 focus:border-[#F5B24A]/60 rounded-xl text-xs font-medium text-[#F4F1EA] placeholder-[#8E8A82]/50 focus:outline-none focus:ring-1 focus:ring-[#F5B24A]/60 transition-all"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="register-email"
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
              id="register-email"
              type="email"
              required
              placeholder="maya@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.03] border border-white/10 focus:border-[#F5B24A]/60 rounded-xl text-xs font-medium text-[#F4F1EA] placeholder-[#8E8A82]/50 focus:outline-none focus:ring-1 focus:ring-[#F5B24A]/60 transition-all"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="block text-[11px] font-mono uppercase tracking-wider text-[#8E8A82] mb-1.5"
          >
            Password (min 6 characters)
          </label>
          <div className="relative">
            <Lock
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8E8A82]"
            />
            <input
              id="register-password"
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white/[0.03] border border-white/10 focus:border-[#F5B24A]/60 rounded-xl text-xs font-medium text-[#F4F1EA] placeholder-[#8E8A82]/50 focus:outline-none focus:ring-1 focus:ring-[#F5B24A]/60 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 pt-1 cursor-pointer">
          <input
            id="register-terms"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#F5B24A] focus:ring-[#F5B24A] accent-[#F5B24A] cursor-pointer"
          />
          <label htmlFor="register-terms" className="text-xs text-[#8E8A82] cursor-pointer select-none">
            I agree to the Terms of Service & Privacy Policy
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-2 bg-gradient-to-r from-[#F5B24A] to-[#E08B28] text-[#0A0A0C] text-xs font-bold rounded-xl transition-all shadow-[0_0_24px_rgba(245,178,74,0.3)] hover:shadow-[0_0_32px_rgba(245,178,74,0.5)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <span>{isSubmitting ? "Creating account..." : "Create Account & Start"}</span>
          <ArrowRight size={14} />
        </button>
      </form>

      <div className="mt-6 text-center pt-4 border-t border-white/[0.06]">
        <p className="text-xs text-[#8E8A82]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#F5B24A] font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
