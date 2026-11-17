import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import HeroSection from "../components/home/HeroSection";
import WorkflowSection from "../components/home/WorkflowSection";
import FeaturesSection from "../components/home/FeaturesSection";
import CTASection from "../components/home/CTASection";
import PageLoader from "../components/home/PageLoader";
import AppShell from "../components/nova/AppShell";

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(() => {
    try {
      return Boolean(sessionStorage.getItem("nova_home_loaded"));
    } catch {
      return true;
    }
  });
  const [showLoader, setShowLoader] = useState(() => {
    try {
      return !sessionStorage.getItem("nova_home_loaded");
    } catch {
      return false;
    }
  });

  const handleLoaderComplete = () => {
    try {
      sessionStorage.setItem("nova_home_loaded", "true");
    } catch {
      // ignore
    }
    setIsLoaded(true);
    setTimeout(() => setShowLoader(false), 1000); // Allow fade out
  };

  return (
    <div className="relative min-h-screen text-slate-900 dark:text-white overflow-hidden transition-colors">
      {showLoader && <PageLoader onComplete={handleLoaderComplete} />}

      {isLoaded && (
        <>
          <AppShell>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            <HeroSection />
            <WorkflowSection />
            <FeaturesSection />
            <CTASection />
          </motion.div>
          </AppShell>
        </>
      )}
    </div>
  );
}
