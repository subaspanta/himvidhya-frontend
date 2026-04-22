// "use client";

// import { useRouter } from "next/navigation";
// import type { AuthModal } from "../types/ui.types";

// type Mode = "page" | "modal";

// export const useAuthNavigation = (mode: Mode) => {
//   const router = useRouter();

//   const goTo = (target: AuthModal) => {
//     if (!target) return;
//     if (mode === "page") {
//       router.replace(`/${target}`);
//     } else {
//       router.push(`/${target}`);
//     }
//   };

//   const close = () => {
//     if (mode === "page") {
//       router.replace("/");
//     } else {
//       router.back();
//     }
//   };

//   return {
//     navigation: {
//       goToLogin: () => goTo("login"),
//       goToRegister: () => goTo("register"),
//       goToForgotPassword: () => goTo("forgot-password"),
//       close,
//     },
//   };
// };
