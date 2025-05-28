const MapContent = ({mapType}) => {
    return(
        <div className="h-full">
            <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <h3 className="text-lg font-semibold mb-2">{mapType.mapInfo}</h3>
                <p className="text-sm">{mapType.detail}</p>
            </div>
            <div className={`border-2 border-dashed rounded-lg h-4/5 flex items-center justify-center ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
                <div className="text-center">
                    {/* 임시조치 지도로 대체 예정 */}
                    <MapIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <p className={`text-lg font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    캠퍼스 전체 지도
                    </p>
                    <p className={`text-sm mt-2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    실제 지도 이미지가 여기에 표시됩니다
                    </p>
                </div>
            </div>
        </div> 
    )
}

export default MapContent;