type ModalTheme = "transparent" | "dark";

const themeClasses: Record<ModalTheme, string> = {
  transparent: "bg-white/70 backdrop-blur-sm",
  dark: "bg-jet_black",
};

export const modalContentContainerClass = "h-[90%]";

export const modalFooterClass =
  "w-full flex justify-between absolute bottom-0 h-full items-center";

export const modalFooterNavButtonClass =
  "h-full w-[50px] bg-jet_black transition-colors duration-200 hover:bg-ultrasonic_blue";

export const modalWrapperClass =
  "bg-white w-[500px] h-[600px] rounded-[15px] p-5 z-modal";

export const headerClass = "flex justify-end text-[25px]";

export const bodyClass = "pt-[10px]";

export const overlayClass =
  "fixed inset-0 p-[100px] z-overlay flex justify-center items-center bg-black/30";

export const buildModalDivClasses = ({
  widthClass = "w-[70%]",
  heightClass = "h-screen",
  theme = "dark",
  fullHeight = false,
  extraClass = "",
}: {
  widthClass?: string;
  heightClass?: string;
  theme?: ModalTheme;
  fullHeight?: boolean;
  extraClass?: string;
}) =>
  [
    "relative overflow-hidden flex justify-center items-center",
    themeClasses[theme],
    widthClass,
    heightClass,
    fullHeight ? "max-lg:h-full max-lg:w-full max-lg:rounded-none" : "",
    extraClass,
  ]
    .filter(Boolean)
    .join(" ");

export const buildModalCrossProps = ({
  top,
  right,
  left,
  extraClass = "",
}: {
  top?: string;
  right?: string;
  left?: string;
  extraClass?: string;
}) => ({
  className: [
    "absolute p-2 z-10 cursor-pointer rounded-full h-8 w-8",
    "bg-ultrasonic_blue text-white flex items-center justify-center",
    extraClass,
  ]
    .filter(Boolean)
    .join(" "),
  style: { top, right, left },
});
