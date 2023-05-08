import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 py-2.5 shadow-lg">
        <div className="text-center">
          <Link to="/">GymTracker</Link>
        </div>
      </nav>
    </header>
  );
}
