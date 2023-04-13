import { ButtonHTMLAttributes } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
}

const Button = ({ children, primary = false, ...props }: IButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`py-3 px-5 text-xs sm:text-base rounded-md text-white 
        ${props.disabled ? 'bg-disabled cursor-not-allowed' : ''}
        ${primary ? 'bg-brand-orange' : 'bg-brand-sky-blue'}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
