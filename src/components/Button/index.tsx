import React from "react";

import "./Button.scss";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
}

const Button = ({ onClick, children, ...btnProps }: ButtonProps) => {
  return (
    <button
      {...btnProps}
      className="c-Button bg-lighter-blue txt-off-white o-Flex o-Flex-ai-c o-Flex-jc-c"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
