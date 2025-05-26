import React, { useState, useEffect, useRef } from 'react';
import genAI from "./model";
import "./App.css";
import SystemPrompt from "./data/SystemPrompt.js";
import calenderData from "./data/AcademicCalender.js";
import graduationData from "./data/GraduationCertificationSystemInfo.js";
import univData from "./data/AcademicInformation.js";
import univMapInfo from "./data/UnivMapInfo.js";

import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-pro-001"});

// 동적으로 univDepartment 폴더 내 모든 파일 가져오기
const univDepartmentModules = import.meta.glob("./data/univDepartment/*.js", { eager: true });
const univDepartmentData = Object.keys(univDepartmentModules).reduce((acc, key) => {
  const moduleName = key.split("/").pop()?.replace(".js", ""); // 파일 이름 추출
  acc[moduleName] = univDepartmentModules[key].default; // 각 파일의 default export 가져오기
  return acc;
}, {});

const systemInstruction = `You are a helpful assistant with knowledge of these university data sets:
1) AcademicInformation: ${JSON.stringify(univData)},
2) GraduationCertificationSystemInfo: ${JSON.stringify(graduationData)},
3) AcademicCalender: ${JSON.stringify(calenderData)}.
4) UnivDepartment: ${JSON.stringify(univDepartmentData)}.
5) UnivMapInfo: ${JSON.stringify(univMapInfo)}.
Please answer questions based on this data.`;

export function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatRef = useRef<any>(null);

  // 초기화
  useEffect(() => {
    (async () => {
      try {
        chatRef.current = model.startChat({
          history: [
            { role: "user", parts: [{ text: SystemPrompt }] },
            { role: "user", parts: [{ text: systemInstruction }] },
            { role: "model", parts: [{ text: "Understood. I have the university data." }] },
          ],
          generationConfig: {},
        });
        // 시스템 메시지 등록
        setMessages([
          {
            id: Date.now(),
            content: "챗봇 로딩 됨.",
            sender: "system",
          },
        ]);
      } catch (err) {
        console.error("Failed to initialize chat:", err);
        setError("채팅을 시작할 수 없습니다.");
      }
    })();
  }, []);

  // 채팅 리셋
  const resetChat = () => {
    setMessages([]);
    setError(null);
  };

  // 메시지 전송
  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading || !chatRef.current) return;

    setIsLoading(true);
    setError(null);

    // 사용자 메시지 추가
    const userMessage = {
      id: Date.now(),
      content: message,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      // 모델에게 메시지 전송
      const result = await chatRef.current.sendMessage(message);
      const response = await result.response;
      const responseText = response.text();

      // 챗봇 메시지 추가
      const botMessage = {
        id: Date.now() + 1,
        content: responseText,
        sender: "assistant",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("메시지 전송 중 오류가 발생했습니다.");
      // 마지막에 추가한 사용자 메시지 삭제
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 왼쪽 사이드바 */}
      <Sidebar resetChat={resetChat} />

      {/* 오른쪽 채팅 영역 */}
      <ChatArea
        messages={messages}
        sendMessage={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;