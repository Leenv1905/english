// pages/index.tsx

import LayoutHome from '../components/home/LayoutHome';
import Image from 'next/image';
import laptopImage from '../../public/laptop.png';
import bookImage from '../../public/book.png';
// import Link from 'next/link';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
// Sử dụng hook `useRouter` để điều hướng đến trang đăng nhập nếu chưa đăng nhập
// Sau đó điều hướng đến trang cần truy cập
  const handleLinkClick = (href: string) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push(`/user/login?redirect=${encodeURIComponent(href)}`);
    } else {
      router.push(href);
    }
  };

  return (
    <LayoutHome>
      <div className="relative h-screen overflow">
        <div className="absolute bottom-20 left-10">
          <Image src={laptopImage} alt="Laptop" width={350} height={350} />
        </div>
        <div className="absolute top-20 right-5">
          <Image src={bookImage} alt="Book" width={100} height={100} />
        </div>
        <div className="flex flex-col items-center justify-center h-full relative z-10 ml-90">
          <h1 className="text-8xl font-bold text-center mb-4 text-gray-500">My English</h1>
          <h1 className="text-8xl font-bold text-center mb-4">Class</h1>
          <h1 className="text-8xl font-bold text-center mb-4 font-pacifico">Class</h1>
          <p className="text-xl text-center">Learn, Learn more, Learn forever</p>
          <div className="flex space-x-4">
           <p className="text-gray-500 no-underline text-center cursor-pointer" onClick={() => handleLinkClick('/learn')}>Learn</p>
            <p className="text-gray-500 no-underline text-center cursor-pointer" onClick={() => handleLinkClick('/review')}>Review</p>
            {/* <Link href="/user/login"><p className="text-gray-300 no-underline text-center">Login</p></Link>
            <Link href="/user/register"><p className="text-gray-300 no-underline text-center">Register</p></Link> */}
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default Home;
