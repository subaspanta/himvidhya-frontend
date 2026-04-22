"use client";

import { Button } from "../../ui/button";

type Props = {
  onLoginClick: () => void;
  onRegisterClick: () => void;
};

export const AuthButtons: React.FC<Props> = ({
  onLoginClick,
  onRegisterClick,
}) => {
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={onLoginClick}>
        Login
      </Button>
      <Button variant="secondary" onClick={onRegisterClick}>
        Register
      </Button>
    </div>
  );
};
