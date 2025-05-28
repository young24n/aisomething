import ChatInput from '../components/ChatInput';
import ChatMessage from '../components/ChatMessage';
import { LoaderCircle } from 'lucide-react'; // loading 스핀 디자인

const ChatArea = ({ messages, sendMessage, isLoading, settings }) => {
  // 다크 모드 여부 판단
  const isDark = settings?.theme === 'dark';

  return (
    //다크 모드 적용
    <div className={`flex-1 flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h2 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          학교 도우미
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4"> 
        {
          messages.length === 0
            ? (
              <div className={`h-full flex flex-col items-center justify-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <div className={`rounded-full p-4 mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24" height="24"
                    viewBox="0 0 24 24"
                    fill="none" stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-8 h-8"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <p className="text-lg font-medium">어떤 질문이 있으신가요?</p>
                <p className="text-sm">
                  학교 정보, 시설 위치, 일정 등을 물어보세요.
                </p>
              </div>
            )
            : messages.map((message) => (
                // settings 상태를 하위 ChatMessage에 전달
                <ChatMessage key={message.id} message={message} settings={settings} />
              ))
        }
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <LoaderCircle className="w-8 h-8 animate-spin text-blue-500" />
          </div>
        )}
      </div>
      {/* 하단 입력 영역 + 다크 모드 시 테두리 색상 변경 */}
      <div className={`p-5 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        {/* ChatInput에도 settings를 함께 전달 */}
        <ChatInput sendMessage={sendMessage} isLoading={isLoading} settings={settings} />
      </div>
    </div>
  );
};

export default ChatArea;