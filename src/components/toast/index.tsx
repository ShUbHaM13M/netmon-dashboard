import { useState, useEffect, useCallback } from 'react';
import { Criticality } from '../../global';

export type ToastType = {
  id: string;
  title?: string;
  description: string;
  criticality: Criticality;
};

interface ToastProps {
  toastList: ToastType[];
  autoDeleteTime?: number;
}

const Toast = ({ toastList, autoDeleteTime = 1000 }: ToastProps) => {
  const [list, setList] = useState(toastList);

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
  }, [toastList, autoDeleteTime, list]);

  const deleteToast = useCallback(
    (id: string) => {
      const listItemIndex = list.findIndex((e) => e.id === id);
      const toastListItem = toastList.findIndex((e) => e.id === id);
      list.splice(listItemIndex, 1);
      toastList.splice(toastListItem, 1);
      setList([...list]);
    },
    [list, toastList],
  );

  return (
    <div className='fixed bottom-4 right-4 transition-transform ease-out duration-300 animate-in-right z-50'>
      {list.map((toast, index) => (
        <div
          key={index}
          className={`transition-all ease-out duration-300 relative overflow-hidden w-80 animate-in-right my-2 rounded-md border border-transparent shadow-sm font-semibold text-icon-white
					`}
          style={{
            backgroundColor: toast.criticality === Criticality.CRITICAL ? '#6a0912' : '#003919',
            borderColor: toast.criticality,
          }}
        >
          <div className='flex justify-between p-3'>
            <div>
              {toast.title && <p className='text-lg'>{toast.title}</p>}
              <p className='text-sm'>{toast.description}</p>
            </div>
            <button
              className='stroke-icon-white hover:stroke-icon-dark-grey'
              onClick={() => deleteToast(toast.id)}
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M2.66675 13.3346L13.3334 2.66797M2.66675 2.66797L13.3334 13.3346'
                  stroke='inherit'
                  className='transition-colors ease-out duration-200'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
