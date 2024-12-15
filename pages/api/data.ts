import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  await dbConnect();

  if (req.method === 'GET') {
    res.status(200).json({ success: true, message: 'Database connected!' });
  }
}
