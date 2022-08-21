import cn from 'classnames';
import { ForwardedRef, forwardRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IInputProps } from './Input.interfase';

const Input = forwardRef(
  ({ className, error, ...props }: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    useEffect(() => {
      if (error) {
        toast.error(error.message);
      }
    }, [error]);

    return <input className={cn(className, { error })} ref={ref} {...props} />;
  },
);

export default Input;
