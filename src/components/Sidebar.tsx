import { HomeIcon, MapIcon, BuildingIcon, SettingsIcon, RefreshCwIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = ({ resetChat, openSettings, settings }) => {
  const isDark = settings?.theme === 'dark';

  const buttonClass = `w-full mb-2 flex items-center p-3 rounded-md text-left ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`
  const iconClass = "w-5 h-5 mr-2";

  return (
    <div
      className={`w-64 h-full flex flex-col border-r ${
        isDark ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'
      }`}
    >
      <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h1 className="text-xl font-bold flex items-center">
          <Link to="/" className="flex items-center">
            <span className="mr-2">🎓</span>
            대가봇
          </Link>
        </h1>
      </div>
      <div className="flex-grow overflow-y-auto p-3">
        <button onClick={resetChat} className={buttonClass}>
          <RefreshCwIcon className={iconClass} />
          <span>대화 초기화</span>
        </button>
        <div className={`border-t my-3 ${isDark ? 'border-gray-700' : 'border-gray-200'}`}></div>
        <div className={`text-sm mb-2 px-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          학교 자원
        </div>
        <Link
          to="https://www.cu.ac.kr/index.php"
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass}
        >
          <HomeIcon className={iconClass} />
          <span>학교 홈페이지</span>
        </Link>
        <Link to="/univ_map" className={buttonClass}>
          <MapIcon className={iconClass} />
          <span>학교 지도 보기</span>
        </Link>
        <Link to="/facilities" className={buttonClass}>
          <BuildingIcon className={iconClass} />
          <span>편의시설 위치</span>
        </Link>
      </div>
      <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <button onClick={openSettings} className={buttonClass}>
          <SettingsIcon className={iconClass} />
          <span>설정</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;