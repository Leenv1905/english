// Hook này chưa logic kiểm tra trạng thái đăng nhập và điều hướng
// người dùng đến trang đăng nhập nếu chưa đăng nhập
// Sau khi đăng nhập sẽ điều hướng đến trang muốn đến
// Sử dụng Hook này trong các trang cần yêu cầu đăng nhập

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuthRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push(`/user/login?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [router]);
};

export default useAuthRedirect;