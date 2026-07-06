import { Link } from "react-router-dom";

const StatCard = ({
  title,
  value,
  subtitle,
  icon,
  to,
}) => {
  const content = (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold text-slate-900">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}
        </div>

        {icon && (
          <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
            {icon}
          </div>
        )}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to}>
        {content}
      </Link>
    );
  }

  return content;
};

export default StatCard;