import { forwardRef, useEffect } from 'react';
import { IconClose } from '../../assets/icons';
import Button from '../button/Button';

interface IDropDownModal {
  children: React.ReactNode;
  showModal: boolean;
  title: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDownModal = forwardRef<HTMLDivElement, IDropDownModal>(function DropDownModal(
  props,
  ref,
) {
  useEffect(() => {
    if (props.showModal) {
      document.body.style.overflow = 'hidden';
      return;
    }

    document.body.style.overflow = 'auto';
  }, [props.showModal]);

  if (props.showModal) {
    return (
      <div
        ref={ref}
        role='presentation'
        onMouseDown={(e) => {
          e.stopPropagation();
        }}
        onClick={(e) => {
          e.stopPropagation();
          props.setShowModal(false);
        }}
        className={`fixed top-0 left-0 h-screen w-full bg-[#2E2F33CC] z-30 block sm:hidden ${
          props.showModal ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          role='presentation'
          onClick={(e) => e.stopPropagation()}
          className={`flex flex-col gap-4 
          px-4 pt-4 
          border-t-white border-opacity-20 border-t absolute 
          w-full left-0 
          transition-all ease-out duration-200 bg-card-dark bottom-0
          ${props.fullScreen ? 'h-screen rounded-none' : 'h-2/4 translate-y-0 rounded-t-xl'}
          `}
        >
          <div className='flex justify-between items-center text-white'>
            <span className='caps-1'>{props.title}</span>
            {props.fullScreen ? (
              <button
                onClick={() => {
                  props.setFullScreen(false);
                }}
              >
                <IconClose />
              </button>
            ) : (
              <Button onClick={() => props.setShowModal(false)} primary>
                Apply
              </Button>
            )}
          </div>
          <hr className='bg-icon-grey border-icon-grey' />
          {props.children}
        </div>
      </div>
    );
  }
  return null;
});

export default DropDownModal;
