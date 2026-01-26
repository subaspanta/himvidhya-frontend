import { useState } from "react";

type ModalType = "login" | "register" | null;

export const useModal = () => {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const openLoginModal = () => setOpenModal("login");
  const openRegisterModal = () => setOpenModal("register");
  const closeModal = () => setOpenModal(null);

  return {
    openModal,
    openLoginModal,
    openRegisterModal,
    closeModal,
  };
};
