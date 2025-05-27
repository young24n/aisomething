const ChatMessage = ({ message, settings }) => {
  const isUser = message.sender === 'user';
  const isDark = settings.theme === 'dark';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${isUser ? 'bg-blue-500 text-white rounded-br-none' : isDark ? 'bg-gray-700 text-gray-100 rounded-bl-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
        {message.content}
      </div>
    </div>
  )
};

export default ChatMessage;