import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";

const Providers = ({ children }) => {
  return (
    <AuthProvider>
          <Toaster position="top-right" />
      {children}
    </AuthProvider>
  );
};

export default Providers;