import { useState } from 'react';
import { useRouter } from 'next/router';
import LayoutHome from '../../components/home/LayoutHome';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { redirect } = router.query;

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const response = await fetch('/api/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ email, password }),
  //   });

  //   if (response.ok) {
  //     alert('Login successful');
  //     router.push('/');
  //   } else {
  //     alert('Login failed');
  //   }
  // };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Giả định thông tin đăng nhập
    if (email === 'admin@gmail.com' && password === '123456') {
      alert('Login successful');
      localStorage.setItem('isLoggedIn', 'true'); // Lưu trạng thái đăng nhập vào localStorage
      localStorage.setItem('maMember', '1'); // Giả định mã thành viên là 1
      router.push(redirect ? String(redirect) : '/'); // Điều hướng đến trang đích hoặc trang chủ
    } else {
      alert('Login failed');
    }
  };

  return (
    <LayoutHome>
    <div className="flex flex-col text-gray-500 items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col space-y-4">
        <input
          type="email"
          className="p-2 border text-gray-500 border-gray-300 rounded-md"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="p-2 border text-gray-600 border-gray-300 rounded-md"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Login
        </button>
      </form>
    </div>
    </LayoutHome>
  );
};

export default Login;