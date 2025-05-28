import React, { useState } from 'react';
import { ArrowLeftIcon, MapIcon, BuildingIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const MapView = ({
  settings
}) => {
  const [selectedMap, setSelectedMap] = useState('campus');
  const navigate = useNavigate();
  const isDark = settings.theme === 'dark';
  const goBack = () => {
    navigate('/');
  };
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
              캠퍼스 전체 지도
            </button>
            <button onClick={() => setSelectedMap('buildings')} className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm ${selectedMap === 'buildings' ? isDark ? 'border-blue-400 text-blue-400' : 'border-blue-500 text-blue-600' : isDark ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
              <BuildingIcon className="w-4 h-4 mr-2" />
              건물별 상세 지도
            </button>
          </div>
        </div>
        {/* Map Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedMap === 'campus' ? <div className="h-full">
              <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <h3 className="text-lg font-semibold mb-2">캠퍼스 전체 지도</h3>
                <p className="text-sm">
                  교내 각 건물의 번호와 설명을 확인할 수 있는 지도입니다.
                </p>
              </div>
              <div className={`border-2 border-dashed rounded-lg h-4/5 flex items-center justify-center ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
                <div className="text-center">
                  <MapIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    캠퍼스 전체 지도
                  </p>
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    실제 지도 이미지가 여기에 표시됩니다
                  </p>
                </div>
              </div>
            </div> : <div className="h-full">
              <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <h3 className="text-lg font-semibold mb-2">건물별 상세 지도</h3>
                <p className="text-sm">
                  학교 전체 캠퍼스의 건물 위치와 상세 시설을 확인할 수 있습니다.
                </p>
              </div>
              <div className={`border-2 border-dashed rounded-lg h-4/5 flex items-center justify-center ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
                <div className="text-center">
                  <MapIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                  <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    캠퍼스 전체 지도
                  </p>
                  <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    실제 지도 이미지가 여기에 표시됩니다
                  </p>
                </div>
              </div>
            </div>}
        </div>
      </div>
    )
};
export default MapView;