import { ButtonHTMLAttributes, forwardRef } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IButtonProps>(function Button(
  { children, primary = false, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      onClick={props.onClick}
      className={`py-3 px-5 text-xs sm:text-base rounded-md text-white 
        ${primary ? 'bg-brand-orange' : 'bg-brand-sky-blue'}
        disabled:bg-disabled disabled:text-icon-grey disabled:cursor-not-allowed
      `}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
