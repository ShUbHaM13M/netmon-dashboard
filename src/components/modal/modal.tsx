import { useCallback } from 'react';

type ModalType = 'danger' | 'safe';

export interface ModalState {
  title: string;
  description: string;
  modalType?: ModalType;
  primaryLabel?: string;
  onPrimaryActionClick?: () => void;
}

interface ModalProps extends ModalState {
  onCancelCallback?: () => void;
}

const Modal = ({
  title,
  description,
  modalType = 'danger',
  primaryLabel,
  onPrimaryActionClick,
  onCancelCallback,
}: ModalProps) => {
  const onBackgroundClick = useCallback(() => {
    onCancelCallback && onCancelCallback();
  }, [onCancelCallback]);

  return (
    <div
      onClick={onBackgroundClick}
      role='presentation'
      className='fixed inset-0 bg-[#2E2F33CC] h-full w-full grid place-items-center z-50'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role='presentation'
        style={{ maxWidth: '340px' }}
        className='absolute m-auto flex flex-col bg-card-grey text-icon-white p-4 rounded-md'
      >
        <h4 className='text-base'>{title}</h4>
        <p className='text-icon-grey text-sm mt-1'>{description}</p>
        <div className='flex self-end gap-4 mt-4'>
          <button
            onClick={onBackgroundClick}
            className='px-4 py-2 text-sm sm:text-base rounded-md text-icon-white border border-icon-dark-grey'
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onPrimaryActionClick && onPrimaryActionClick();
              onBackgroundClick();
            }}
            className={`px-4 py-2 text-sm sm:text-base rounded-md text-icon-white border
            ${
              modalType === 'danger'
                ? 'bg-status-critical border-status-critical'
                : 'border-status-safe bg-status-safe text-card-dark'
            } `}
          >
            {primaryLabel ? primaryLabel : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
