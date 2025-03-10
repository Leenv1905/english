// FILE NÀY ĐỂ LƯU TẠM DỮ LIỆU CHO ĐĂNG KÝ VÀ ĐĂNG NHẬP DÙNG
// users trong file login.ts không chia sẻ dữ liệu với biến users trong file register.ts. Trong môi trường serverless của Next.js, mỗi request được xử lý bởi một instance riêng biệt, do đó biến toàn cục không được chia sẻ giữa các request.
// Để giải quyết vấn đề này, bạn có thể sử dụng một cơ sở dữ liệu tạm thời trong bộ nhớ để lưu trữ thông tin người dùng
interface User {
  email: string;
  password: string;
}

let users: User[] = [];

export const addUser = (user: User) => {
  users.push(user);
};

export const findUser = (email: string, password: string) => {
  return users.find((user) => user.email === email && user.password === password);
};