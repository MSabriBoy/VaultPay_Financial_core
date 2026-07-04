import { CircleUserRound, Landmark } from "lucide-react";

import LogoutButton from "../common/LogoutButton";

import useAuth from "../../hooks/useAuth";

import { getRoleLabel } from "../../utils/roleHelpers";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
        <Landmark
    size={38}
    className="text-blue-600"
  />
      
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            VaultPay
          </h1>

          <p className="text-sm text-slate-500">
            Financial Core
          </p>
        </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <CircleUserRound
              size={42}
              className="text-slate-500"
            />

            <div className="text-right">
              <p className="text-sm text-slate-500">
                Welcome,
              </p>

              <p className="font-semibold text-slate-900">
                {user?.name}
              </p>

              <p className="text-xs text-slate-500">
                {getRoleLabel(user?.role)}
              </p>
            </div>
          </div>

          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default Navbar;