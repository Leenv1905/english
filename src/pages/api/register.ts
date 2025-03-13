// HIỆN TẠI ĐANG KHÔNG DÙNG ĐÊN FILE NÀY
// HIỆN TẠI ĐANG KHÔNG DÙNG ĐÊN FILE NÀY
// HIỆN TẠI ĐANG KHÔNG DÙNG ĐÊN FILE NÀY


import { NextApiRequest, NextApiResponse } from 'next';
import { addUser } from '../../users';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    // Lưu thông tin đăng ký vào cơ sở dữ liệu tạm thời
    addUser({ email, password });
    console.log('Registering user:', { email, password });

    res.status(200).json({ message: 'Registration successful' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}