let messages: Message[] = [];

import type { NextApiRequest, NextApiResponse } from 'next';

interface Message {
  id: number;
  content: string;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    const { message } = req.body;
    const newMessage: Message = { id: messages.length + 1, content: message };
    messages.push(newMessage);
    res.status(201).end();
  }
}
