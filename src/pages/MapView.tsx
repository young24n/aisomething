import { useState } from 'react';
import { ArrowLeftIcon, MapIcon, BuildingIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import  MapContent  from '../components/MapContent.tsx';

const MapView = ({ settings }) => {
  const [selectedMap, setSelectedMap] = useState('campus');
  const navigate = useNavigate();
  const isDark = settings.theme === 'dark';
  const goBack = () => { navigate('/'); };
  const mapType1 = {
    detail: "교내 각 건물의 번호와 설명을 확인할 수 있는 지도입니다.",
    mapInfo: "캠퍼스 지도"
  }
  const mapType2 = {
    detail: "학교 전체 캠퍼스의 건물 위치와 상세 시설을 확인할 수 있습니다.",
    mapInfo: "캠퍼스 상세 지도"
  }

  return(
      <div className={` flex-1 flex flex-col ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        {/* Header */}
        <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center">
            <button onClick={goBack} className={`mr-3 p-2 rounded-md ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
              <ArrowLeftIcon className={`w-5 h-5 ${isDark ? 'text-white' : ''}`} />
            </button>
            <h2 className={`text-lg font-medium ${isDark ? 'text-white' : ''}`}>
              학교 지도 보기
            </h2>
          </div>
        </div>
        {/* Map Selection Tabs */}
        <div className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex">
            <button onClick={() => setSelectedMap('campus')} className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm ${selectedMap === 'campus' ? isDark ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600' : isDark ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <MapIcon className="w-4 h-4 mr-2" />
              캠퍼스 지도
            </button>
            <button onClick={() => setSelectedMap('buildings')} className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm ${selectedMap === 'buildings' ? isDark ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600' : isDark ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <BuildingIcon className="w-4 h-4 mr-2" />
              캠퍼스 상세 지도
            </button>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedMap === 'campus' ? <MapContent mapType={mapType1} isDark={isDark}/> : <MapContent mapType={mapType2} isDark={isDark}/>}
        </div>
      </div>
    )
};
export default MapView;