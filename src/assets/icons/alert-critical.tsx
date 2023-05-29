export default function IconAlertCritical({ size = 12 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 12 13`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M6.75 5.25V7.25M6.75 8.5C6.612 8.5 6.5 8.612 6.5 8.75C6.5 8.888 6.612 9 6.75 9C6.888 9 7 8.888 7 8.75C7 8.612 6.888 8.5 6.75 8.5ZM6.75 0.75L12.25 10.75H1.25L6.75 0.75Z'
        stroke='#ED3445'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
