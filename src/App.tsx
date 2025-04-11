import React, { useState, useEffect, useRef } from 'react';
import model from "./model";
import "./App.css";
import calenderData from "./data/AcademicCalender";
import graduationData from "./data/GraduationCertificationSystemInfo";
import univData from "./data/AcademicInformation";

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
Please answer questions based on this data.`;

export function App() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        chatRef.current = model.startChat({
          history: [
            {
              role: "user",
              parts: [
                {
                  text: `너는 학교에 관련된 정보를 알려주는 챗봇이다. 
                  사용자는 너에게 학교와 관련된 질문을 할 것이다. 
                  너는 제공된 정보를 바탕으로 답변을 하면된다. 제공된 정보는 사용자에게 제공되지 않는다. 
                  사용자의 질문이 명확하지 않다면 출력을 최소화 하기 위해 
                  필요한 정보를 너가 사용자에게 역으로 질문을 하는 것 또한 중요하다.
                  관련 서류에 대한 다운로드 링크를 가지고 있으면 제공해도 좋다.
                  제공된 정보에서 명확하게 지정된 방식과 다른 방식의 시도를 묻는다면 보통은 안된다고 답하면된다.
                  (예시)출석을 약봉투로 인정 가능한지? -> 진료확인서 제출이라는 명확한 방식이 이미 존재 만약 된다면 이것은 교수 개인의 재량권을 이용한 것
                  사용자가 물어본 것에 대해서만 답변하고 관련된 항목의 전부를 출력해선 안된다.`,
                },
              ],
            },
            { role: "user", parts: [{ text: systemInstruction }] },
            { role: "model", parts: [{ text: "Understood. I have the university data." }] },
          ],
          generationConfig: {
          },
        });

        setMessages([{ role: "system", text: "University data loaded." }]);
      } catch (err) {
        console.error("Failed to initialize chat:", err);
        setError("채팅을 시작할 수 없습니다.");
      }
    })();
  }, []);

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