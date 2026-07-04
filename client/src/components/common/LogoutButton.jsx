import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import useAuth from "../../hooks/useAuth";

const LogoutButton = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logout();

    toast.success("Logged out successfully.");

    navigate("/", {
      replace: true,
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2 font-medium text-red-600 transition-all duration-200 hover:bg-red-100"
    >
      <LogOut size={18} />

      Logout
    </button>
  );
};

export default LogoutButton;