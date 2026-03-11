export const Spinner = ({ size = 16 }: { size?: number }) => {
  return (
    <div
      style={{ width: size, height: size }}
      className="border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin mx-auto"
    />
  );
};
