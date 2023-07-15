import { MouseEventHandler } from "react";

type Props = {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  handleClick?: MouseEventHandler;
  notAllowed?: boolean | false;
  type?: "button" | "submit";
  className?: string;
};

const Button = ({
  title,
  leftIcon,
  rightIcon,
  handleClick,
  notAllowed,
  type,
  className,
}: Props) => (
  <button
    type={type || "button"}
    disabled={notAllowed || false}
    onClick={handleClick}
    className={`${className} p-3 text-sm rounded-lg transition-all duration-200 ${
      notAllowed ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {leftIcon && leftIcon}
    {title}
    {rightIcon && rightIcon}
  </button>
);

export default Button;
