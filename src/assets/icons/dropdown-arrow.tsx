export default function IconDropdownArrow({ rotate }: { rotate: boolean }) {
  return (
    <svg
      width={24}
      height={24}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={`${rotate ? 'rotate-180' : 'rotate-0'} transition-transform ease-out duration-200`}
    >
      <path
        d='M14.5 10.5L11.5 13.5L8.5 10.5'
        stroke='#9CA3B3'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
