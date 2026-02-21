import { Spinner } from "./Spinner";

export const PageLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spinner size={32} />
    </div>
  );
};
