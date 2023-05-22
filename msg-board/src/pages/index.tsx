import { useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';

interface Message {
  id: number;
  content: string;
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function MessageBoard() {
  const [message, setMessage] = useState('');
  const { data: messages, error } = useSWR<Message[]>('/api/messages', fetcher);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await axios.post('/api/messages', { message });
      setMessage('');
    } catch (error) {
      console.error(error);
    }
  };

  if (error) return <div>Failed to load messages.</div>;
  if (!messages) return <div>Loading messages...</div>;

  return (
    <div>
      <h1>Message Board</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter a message"
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>{message.content}</li>
        ))}
      </ul>
    </div>
  );
}
