// pages/index.tsx

import LayoutHome from '../components/home/LayoutHome';
import Image from 'next/image';
import laptopImage from '../../public/laptop.png';
import bookImage from '../../public/book.png';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <LayoutHome>
      <div className="relative h-screen overflow">
        <div className="absolute bottom-20 left-10">
          <Image src={laptopImage} alt="Laptop" width={350} height={350} />
        </div>
        <div className="absolute top-10 right-5">
          <Image src={bookImage} alt="Book" width={100} height={100} />
        </div>
        <div className="flex flex-col items-center justify-center h-full relative z-10 ml-90">
          <h1 className="text-8xl font-bold text-center mb-4 text-gray-500">My English</h1>
          <h1 className="text-8xl font-bold text-center mb-4">Class</h1>
          <h1 className="text-8xl font-bold text-center mb-4 font-pacifico">Class</h1>
          <p className="text-xl text-center">Learn, Learn more, Learn forever</p>
          <div className="flex space-x-4">
            <Link href="/learn"><p className="text-gray-300 no-underline text-center">Learn</p></Link>
            <Link href="/review"><p className="text-gray-300 no-underline text-center">Review</p></Link>
            <Link href="/user/login"><p className="text-gray-300 no-underline text-center">Login</p></Link>
            <Link href="/user/register"><p className="text-gray-300 no-underline text-center">Register</p></Link>
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default Home;
