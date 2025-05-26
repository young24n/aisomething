const ChatMessage = ({message}) => {
  const isUser = message.sender === 'user';

  return( 
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${isUser ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
        {message.content}
      </div>
    </div>
  )
};
export default ChatMessage;