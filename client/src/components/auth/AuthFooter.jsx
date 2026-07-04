import { Link } from "react-router-dom";

const AuthFooter = ({
  text,
  linkText,
  to,
}) => {
  return (
    <p className="text-center text-sm text-slate-600">
      {text}{" "}
      <Link
        to={to}
        className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
      >
        {linkText}
      </Link>
    </p>
  );
};

export default AuthFooter;