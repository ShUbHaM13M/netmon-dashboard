import { InputHTMLAttributes, useState } from 'react';
import { dateFormatter } from '../../global';

interface DateInputProps extends InputHTMLAttributes<HTMLInputElement> {
  date: Date;
  onDateChange: (date: Date) => void;
}

const DateInput = ({ date, onDateChange: onChange, ...props }: DateInputProps) => {
  const formattedDate = dateFormatter.format(date);
  const [focused, setFocused] = useState(false);

  return (
    <div className='relative inline-block bg-transparent text-icon-grey focus:text-icon-white'>
      <input
        style={{
          colorScheme: 'dark',
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(new Date(e.target.value))}
        className='absolute opacity-0 inset-0 h-full w-full'
        value={date.toISOString().slice(0, 16)}
        type='datetime-local'
        {...props}
      />
      <span
        className={`${
          focused ? 'text-icon-white' : 'text-icon-grey'
        } transition-color ease-out duration-150`}
      >
        {formattedDate}
      </span>
    </div>
  );
};

export default DateInput;
