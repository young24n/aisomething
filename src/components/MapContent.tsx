import { MapIcon } from 'lucide-react';

const MapContent = ({mapType, isDark, mapSrc}) => {
    return (
        <div className="h-full">
            <div className={`mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                <h3 className="text-lg font-semibold mb-2">{mapType.mapInfo}</h3>
                <p className="text-sm">{mapType.detail}</p>
            </div>
            <div className={`border-2 border-dashed rounded-lg max-h-fit flex items-center justify-center ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'}`}>
            <img
            src={mapSrc}
            alt="지도 이미지"
            className="max-w-full max-h-full rounded-md"
            />
            </div>
        </div> 
    )
}

export default MapContent;