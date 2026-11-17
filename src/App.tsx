import AppRoutes from "./routes/AppRoutes";
import { useTheme } from "./hooks/useTheme";
import ToastContainer from "./components/ui/ToastContainer";
import ConfirmModal from "./components/ui/ConfirmModal";

function App() {
  useTheme(); // Initialize theme on mount
  return (
    <>
      <AppRoutes />
      <ToastContainer />
      <ConfirmModal />
    </>
  );
}

export default App;
