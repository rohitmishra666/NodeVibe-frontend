import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/">
      <div className="flex items-end">
        <img src="/title-icon.png" alt="logo" className="h-12 w-13" />
        <span className=" font-bold font-serif text-gray-50 align-text-bottom sm:text-lg md:text-xl lg:text-2xl">
          NodeVibe
        </span>
      </div>
    </Link>
  );
}

export default Logo;
