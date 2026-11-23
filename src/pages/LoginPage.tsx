import { useState, type FormEvent } from "react";
import { useNavigate, useLocation, Link, Navigate } from "react-router-dom";
import { Sparkles, Mail, Lock, ArrowRight, Zap, Users, ShieldCheck } from "lucide-react";
import { loginUser, loginWithGoogle } from "../services/auth";
import { useAuthStore } from "../store/authStore";
import { DUMMY_ACCOUNTS } from "../store/subscriptionStore";
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

  const loginWithDemoAccount = (demoEmail: string) => {
    const account = DUMMY_ACCOUNTS[demoEmail];
    if (!account) return;

    login({
      uid: `demo_uid_${account.tier}`,
      email: account.email,
      displayName: account.displayName,
      photoURL: null,
      emailVerified: true,
      demoToken: `demo_token_${account.tier}`,
      tier: account.tier,
    });

    toast.success(`Signed in as ${account.displayName} (${account.label})`);
    navigate(from, { replace: true });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const normalizedEmail = email.trim().toLowerCase();
    if (DUMMY_ACCOUNTS[normalizedEmail]) {
      loginWithDemoAccount(normalizedEmail);
      setIsSubmitting(false);
      return;
    }

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

      {/* Demo Tier Test Accounts Box */}
      <div className="mb-6 p-4 rounded-2xl bg-slate-100/80 dark:bg-black/20 border border-[#0f2a2a]/10 dark:border-[#d9faf4]/10">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00bfa6] flex items-center gap-1.5">
            <ShieldCheck size={13} />
            <span>1-Click Demo Accounts (Test Tiers)</span>
          </span>
          <span className="text-[9px] font-mono text-[#0f2a2a]/50 dark:text-[#d9faf4]/50">Instant Test Mode</span>
        </div>

        <div className="grid grid-cols-1 gap-2">
          {/* Free Tier */}
          <button
            type="button"
            onClick={() => loginWithDemoAccount("free@wishes.ai")}
            className="w-full text-left p-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.04] hover:border-[#00bfa6] hover:bg-white dark:hover:bg-white/[0.08] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300">
                <Sparkles size={13} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0f2a2a] dark:text-[#d9faf4] group-hover:text-[#00bfa6] transition-colors">
                  Free Plan ($0) • free@wishes.ai
                </div>
                <div className="text-[10px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
                  5 Images • 3 Videos • No Event Scheduling • No OneDrive
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#00bfa6] opacity-0 group-hover:opacity-100 transition-opacity">
              Sign In →
            </span>
          </button>

          {/* $5 Pro Tier */}
          <button
            type="button"
            onClick={() => loginWithDemoAccount("pro@wishes.ai")}
            className="w-full text-left p-2.5 rounded-xl border border-[#00bfa6]/30 bg-teal-50/40 dark:bg-teal-950/20 hover:border-[#00bfa6] transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#00bfa6]/20 flex items-center justify-center text-[#00bfa6]">
                <Zap size={13} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0f2a2a] dark:text-[#d9faf4] group-hover:text-[#00bfa6] transition-colors">
                  Pro Plan ($5/mo) • pro@wishes.ai
                </div>
                <div className="text-[10px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
                  100 Generations (75 Images, 25 Videos) • Events Included • No OneDrive
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#00bfa6] opacity-0 group-hover:opacity-100 transition-opacity">
              Sign In →
            </span>
          </button>

          {/* $12 Ultimate Tier */}
          <button
            type="button"
            onClick={() => loginWithDemoAccount("ultimate@wishes.ai")}
            className="w-full text-left p-2.5 rounded-xl border border-purple-500/30 bg-purple-50/30 dark:bg-purple-950/20 hover:border-purple-400 transition-all flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Users size={13} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#0f2a2a] dark:text-[#d9faf4] group-hover:text-[#00bfa6] transition-colors">
                  Ultimate Plan ($12/mo) • ultimate@wishes.ai
                </div>
                <div className="text-[10px] text-[#0f2a2a]/60 dark:text-[#d9faf4]/60">
                  200 Generations (150 Images, 50 Videos) • No Restrictions • OneDrive Sync
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#00bfa6] opacity-0 group-hover:opacity-100 transition-opacity">
              Sign In →
            </span>
          </button>
        </div>
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
          or sign in with credentials
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
              placeholder="you@company.com or free@wishes.ai"
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
              placeholder="•••••••• (optional for demo accounts)"
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
