import { AlertCircle } from "lucide-react";

const EmptyState = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
      <div className="mb-4 text-slate-400">
        {icon ?? <AlertCircle size={48} />}
      </div>

      <h2 className="text-xl font-semibold text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-2 max-w-md text-sm text-slate-500">
          {description}
        </p>
      )}
    </div>
  );
};

export default EmptyState;