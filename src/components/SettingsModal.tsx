import React, { useState } from 'react';
import { XIcon, SunIcon, MoonIcon, GlobeIcon, DatabaseIcon } from 'lucide-react';

const SettingsModal = ({ settings, updateSettings, closeSettings }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const handleSave = () => {
    updateSettings(localSettings);
    closeSettings();
  };
  const handleSettingChange = (key, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className={`rounded-lg shadow-xl w-96 max-w-[90vw] ${localSettings.theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">설정</h2>
          <button onClick={closeSettings} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <XIcon className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* 테마 설정 */}
          <div>
            <div className="flex items-center mb-3">
              <SunIcon className="w-5 h-5 mr-2" />
              <h3 className="font-medium">테마</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="theme" value="light" checked={localSettings.theme === 'light'} onChange={e => handleSettingChange('theme', e.target.value)} className="mr-2" />
                <span>라이트 모드</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="theme" value="dark" checked={localSettings.theme === 'dark'} onChange={e => handleSettingChange('theme', e.target.value)} className="mr-2" />
                <span>다크 모드</span>
              </label>
            </div>
          </div>
          {/* 언어 설정 */}
          <div>
            <div className="flex items-center mb-3">
              <GlobeIcon className="w-5 h-5 mr-2" />
              <h3 className="font-medium">언어</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="language" value="ko" checked={localSettings.language === 'ko'} onChange={e => handleSettingChange('language', e.target.value)} className="mr-2" />
                <span>한국어</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="language" value="en" checked={localSettings.language === 'en'} onChange={e => handleSettingChange('language', e.target.value)} className="mr-2" />
                <span>English</span>
              </label>
            </div>
          </div>
          {/* 채팅 기록 설정 */}
          <div>
            <div className="flex items-center mb-3">
              <DatabaseIcon className="w-5 h-5 mr-2" />
              <h3 className="font-medium">대화 기록 유지</h3>
            </div>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="radio" name="chatHistoryType" value="session" checked={localSettings.chatHistoryType === 'session'} onChange={e => handleSettingChange('chatHistoryType', e.target.value)} className="mr-2" />
                <div>
                  <div>세션 단위</div>
                  <div className="text-sm text-gray-500">
                    브라우저를 닫으면 대화 기록이 삭제됩니다
                  </div>
                </div>
              </label>
              <label className="flex items-center">
                <input type="radio" name="chatHistoryType" value="local" checked={localSettings.chatHistoryType === 'local'} onChange={e => handleSettingChange('chatHistoryType', e.target.value)} className="mr-2" />
                <div>
                  <div>로컬 저장</div>
                  <div className="text-sm text-gray-500">
                    브라우저 로컬 저장소에 대화 기록을 보관합니다
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <button onClick={closeSettings} className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            취소
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            저장
          </button>
        </div>
      </div>
    </div>
  )
};
export default SettingsModal;