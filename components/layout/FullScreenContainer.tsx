export function FullScreenContainer({
  backgroundOverlay,
  children,
  backdropFilter,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const bgStyle = backgroundOverlay || "var(--overlay)";
  const blurStyle = backdropFilter || "blur(1px)";

  return (
    <div
      className="fixed inset-0 w-screen h-screen z-100 flex justify-center items-center backdrop-blur-[1px]"
      style={{
        background: bgStyle,
        boxShadow: "var(--shadow-xl)",
        backdropFilter: blurStyle,
        WebkitBackdropFilter: "blur(2px)",
      }}
    >
      {children}
    </div>
  );
}
