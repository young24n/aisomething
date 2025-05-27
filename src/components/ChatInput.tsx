import { useState } from 'react';
import { SendIcon } from 'lucide-react';

const ChatInput = ({ sendMessage, isLoading, settings }) => {
  const [input, setInput] = useState('');
  const isDark = settings?.theme === 'dark';

  const handleSubmit = e => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="메시지를 입력하세요..."
        className={
          `flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ` +
          (isDark
            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900')
        }
      />
      <button
        type="submit"
        className="ml-2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 disabled:opacity-50"
        disabled={!input.trim() || isLoading}
      >
        <SendIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default ChatInput;