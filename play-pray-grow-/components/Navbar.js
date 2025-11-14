import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Play Pray Grow
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/week" className="hover:text-gray-300">
              Weekly Plans
            </Link>
          </li>
          <li>
            <Link href="/brainstorm" className="hover:text-gray-300">
              Brainstorm Hub
            </Link>
          </li>
          <li>
            <Link href="/worksheets" className="hover:text-gray-300">
              Worksheets
            </Link>
          </li>
          <li>
            <Link href="/retrospective" className="hover:text-gray-300">
              Retrospectives
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}