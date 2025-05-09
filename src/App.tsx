import React, { useState, useEffect, useRef } from 'react';
import genAI from "./model";
import "./App.css";
import SystemPrompt from "./data/SystemPrompt.js"
import calenderData from "./data/AcademicCalender.js";
import graduationData from "./data/GraduationCertificationSystemInfo.js";
import univData from "./data/AcademicInformation.js";
import univMapInfo from "./data/UnivMapInfo.js";

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
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatRef = useRef(null);
  // 추가: 메시지 박스 DOM 참조
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      try {
        chatRef.current = model.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text: SystemPrompt,
                },
              ],
            },
            { role: "user", parts: [{ text: systemInstruction }] },
            { role: "model", parts: [{ text: "Understood. I have the university data." }] },
          ],
          generationConfig: {
          },
        });

        setMessages([{ role: "system", text: "챗봇 로딩됨." }]);
      } catch (err) {
        console.error("Failed to initialize chat:", err);
        setError("채팅을 시작할 수 없습니다.");
      }
    })();
    
  }, []);

  // messages 업데이트 될 때마다 스크롤 하단으로 이동
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const resetChat = () => {
    setMessages([]);
  };

  const sendMessage = async () => {
    if (!prompt.trim() || isLoading || !chatRef.current) return;

    setIsLoading(true);
    setError(null);
    const userMessage = { role: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);
    setPrompt("");

    try {
      const result = await chatRef.current.sendMessage(prompt);
      const response = await result.response;
      const responseText = response.text();

      const assistantMessage = { role: "assistant", text: responseText };
      setMessages((prev) => [...prev, assistantMessage]);
      
    } catch (err) {
      console.error("Error sending message:", err);
      setError("메시지 전송 중 오류가 발생했습니다.");
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div>
      <div>
        <div
          ref={chatContainerRef} // 수정: 메시지 박스에 ref 추가
          style={{
            height: "300px",
            overflowY: "scroll",
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "5px",
          }}
        >
          {messages.map((msg, index) => (
            <p
              key={index}
              style={{
                textAlign: msg.role === "user" ? "right" : "left",
                margin: "5px",
              }}
            >
              <strong>{msg.role === "user" ? "나" : "챗봇"}:</strong> {msg.text}
            </p>
          ))}
          {isLoading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>

        <p>내용 입력</p>
        <input
          style={{ width: "300px", marginRight: "10px", border: "1px solid #ccc", padding: "5px" }}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading || !prompt.trim()}>
          send
        </button>
      </div>
    </div>
  );
}

export default App;