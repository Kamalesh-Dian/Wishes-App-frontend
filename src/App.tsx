import AppRoutes from "./routes/AppRoutes";
import { useTheme } from "./hooks/useTheme";
import ToastContainer from "./components/ui/ToastContainer";
import ConfirmModal from "./components/ui/ConfirmModal";
import UpgradeModal from "./components/ui/UpgradeModal";

function App() {
  useTheme(); // Initialize theme on mount
  return (
    <>
      <AppRoutes />
      <ToastContainer />
      <ConfirmModal />
      <UpgradeModal />
    </>
  );
}

export default App;
