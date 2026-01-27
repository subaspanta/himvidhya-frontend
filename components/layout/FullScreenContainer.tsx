export function FullScreenContainer({
  backgroundOverlay,
  children,
  backdropFilter,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const bgStyle = backgroundOverlay || "rgba(0, 0, 0, 0.5)";
  const blurStyle = backdropFilter || "blur(5.1px)";

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-100 flex justify-center items-center backdrop-blur-[5.1px]"
      style={{
        background: bgStyle,
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: blurStyle,
        WebkitBackdropFilter: "blur(5.1px)",
      }}
    >
      {children}
    </div>
  );
}
