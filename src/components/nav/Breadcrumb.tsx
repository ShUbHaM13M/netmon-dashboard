import { Link } from 'wouter';

interface IBreadCrumbProps {
  links: {
    label: string;
    url: string;
  }[];
}

const BreadCrumb = ({ links }: IBreadCrumbProps) => {
  return (
    <div className='flex gap-1 items-center caps-2-bold text-icon-grey'>
      {links?.map((link, index) => {
        return (
          <Link
            href={link.url}
            key={index}
            className={`${index === links.length - 1 ? 'text-icon-white' : 'text-icon-grey'}`}
          >
            {link.label} {index !== links.length - 1 ? <>&gt;</> : ''}
          </Link>
        );
      })}
    </div>
  );
};

export default BreadCrumb;
