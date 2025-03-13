// HIỆN TẠI ĐANG KHÔNG DÙNG ĐÊN FILE NÀY
// HIỆN TẠI ĐANG KHÔNG DÙNG ĐÊN FILE NÀY
// HIỆN TẠI ĐANG KHÔNG DÙNG ĐÊN FILE NÀY

// import { NextApiRequest, NextApiResponse } from 'next';
// import { findUser } from '../../users';

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'POST') {
//     const { email, password } = req.body;

//     // Kiểm tra thông tin đăng nhập
//     const user = findUser(email, password);
//     console.log('Logging in user:', { email, password });

//     if (user) {
//       res.status(200).json({ message: 'Login successful' });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }