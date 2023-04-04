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

const DropDownModal = ({
  children,
  title,
  showModal,
  setShowModal,
  fullScreen,
  setFullScreen,
}: IDropDownModal) => {
  if (showModal) {
    return (
      <div
        role='presentation'
        onClick={(e) => {
          e.stopPropagation();
          setShowModal(false);
        }}
        className={`fixed top-0 left-0 h-screen w-full bg-black bg-opacity-25 block sm:hidden ${
          showModal ? 'opacity-100' : 'opacity-0'
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
          ${fullScreen ? 'h-screen rounded-none' : 'h-2/4 translate-y-0 rounded-t-xl'}
          `}
        >
          <div className='flex justify-between items-center text-white'>
            <span className='caps-1'>{title}</span>
            {fullScreen ? (
              <button
                onClick={() => {
                  setFullScreen(false);
                }}
              >
                <IconClose />
              </button>
            ) : (
              <Button onClick={() => setShowModal(false)} primary>
                Apply
              </Button>
            )}
          </div>
          <hr className='bg-icon-grey border-icon-grey' />
          {children}
        </div>
      </div>
    );
  }
  return null;
};

export default DropDownModal;
