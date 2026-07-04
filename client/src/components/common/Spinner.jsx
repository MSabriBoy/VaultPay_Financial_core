import { LoaderCircle } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <LoaderCircle
        size={40}
        className="animate-spin text-blue-600"
      />
    </div>
  );
};

export default Spinner;