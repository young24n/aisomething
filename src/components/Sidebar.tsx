import { HomeIcon, MapIcon, BuildingIcon, SettingsIcon, RefreshCwIcon } from 'lucide-react';

const Sidebar = ({ resetChat }) => {
  return(
    <div className="w-64 bg-white h-full flex flex-col border-r">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold flex items-center">
          <span className="mr-2">🎓</span>
          대가봇
        </h1>
      </div>
      <div className="flex-grow overflow-y-auto p-3">
        <button onClick={resetChat} className="w-full mb-2 flex items-center p-3 rounded-md hover:bg-gray-100 text-left">
          <RefreshCwIcon className="w-5 h-5 mr-2" />
          <span>대화 초기화</span>
        </button>
        <div className="border-t my-3"></div>
        <div className="text-sm text-gray-500 mb-2 px-3">학교 자원</div>
        <button className="w-full mb-2 flex items-center p-3 rounded-md hover:bg-gray-100 text-left">
          <HomeIcon className="w-5 h-5 mr-2" />
          <span>학교 홈페이지</span>
        </button>
        <button className="w-full mb-2 flex items-center p-3 rounded-md hover:bg-gray-100 text-left">
          <MapIcon className="w-5 h-5 mr-2" />
          <span>학교 지도 보기</span>
        </button>
        <button className="w-full mb-2 flex items-center p-3 rounded-md hover:bg-gray-100 text-left">
          <BuildingIcon className="w-5 h-5 mr-2" />
          <span>편의시설 위치</span>
        </button>
      </div>
      <div className="p-4 border-t">
        <button className="w-full flex items-center p-3 rounded-md hover:bg-gray-100 text-left">
          <SettingsIcon className="w-5 h-5 mr-2" />
          <span>설정</span>
        </button>
      </div>
    </div>
  )
};
export default Sidebar;