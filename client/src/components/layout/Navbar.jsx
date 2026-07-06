import { CircleUserRound, Landmark } from "lucide-react";
import { NavLink, Link } from "react-router-dom";

import LogoutButton from "../common/LogoutButton";

import useAuth from "../../hooks/useAuth";

import { ROLES } from "../../constants/roles";
import { getRoleLabel } from "../../utils/roleHelpers";

const Navbar = () => {
  const { user } = useAuth();

  const navLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition ${isActive
      ? "bg-blue-100 text-blue-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}

        <div className="flex items-center gap-10">

          <div className="flex items-center gap-3">
            <Link
              to={
                user?.role === ROLES.ADMIN
                  ? "/admin"
                  : "/client"
              }
              className="flex items-center gap-3"
            >
              <Landmark
                size={38}
                className="text-blue-600"
              />

              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  VaultPay
                </h1>

                <p className="text-sm text-slate-500">
                  Powered by<br></br> Nexus Corporate Services
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}

          <nav className="flex items-center gap-2">

            {user?.role === ROLES.ADMIN && (
              <>
                <NavLink
                  to="/admin"
                  className={navLinkClass}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/admin/clients"
                  className={navLinkClass}
                >
                  Clients
                </NavLink>

                <NavLink
                  to="/admin/invoices"
                  className={navLinkClass}
                >
                  Invoices
                </NavLink>
              </>
            )}

            {user?.role === ROLES.CLIENT && (
              <>
                <NavLink
                  to="/client"
                  className={navLinkClass}
                >
                  Dashboard
                </NavLink>

                <NavLink
                  to="/client/invoices"
                  className={navLinkClass}
                >
                  My Invoices
                </NavLink>
              </>
            )}

          </nav>

        </div>

        {/* User */}

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