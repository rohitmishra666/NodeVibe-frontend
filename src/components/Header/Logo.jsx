import { Link } from 'react-router-dom'; // Added Link import

function Logo() {
  return (
    <Link to="/">
      <div className="flex items-end"> {/* Changed to items-end */}
        <img src="/title-icon.png" alt="logo" className="h-12 w-13" />
        <span className="text-2xl font-bold font-serif text-gray-50 align-text-bottom">NodeVibe</span>
      </div>
    </Link>
  );
}

export default Logo;
