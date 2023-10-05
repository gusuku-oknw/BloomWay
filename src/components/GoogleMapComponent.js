import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import HospitalDetails from './HospitalDetails'; // 別のコンポーネントをインポート

const containerStyle = {
  width: '95%',
  height: '650px'
};

const center = {
  lat: 35.681294, 
  lng: 139.765709,
};

const GoogleMapComponent = () => {
  const [hospitals, setHospitals] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const mapStyles = [
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
  ];
  
// useEffectを使用してAPIから病院のデータを取得
  useEffect(() => {
  // APIエンドポイントは変更する必要があります
  fetch('/api/hospitals')
    .then(res => res.json())
    .then(data => setHospitals(data))
    .catch(error => console.error('Error fetching hospitals:', error));
}, []);
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{ 
            styles: mapStyles,
            streetViewControl: false,  // ペグマン（ストリートビュー）を非表示にする
            zoomControl: false,        // 拡大縮小ボタンを非表示にする
            mapTypeControl: false      // 地図タイプボタン（地図/航空写真の切り替えボタン）を非表示にする
          }}
          >
            {hospitals.map(hospital => (
              <Marker
                key={hospital.name}
                position={hospital.location}
                onClick={() => {
                  setSelectedHospital(hospital);
                }}
              />
            ))}
        </GoogleMap>
      </LoadScript>

      {selectedHospital && <HospitalDetails hospital={selectedHospital} />}
    </div>
  );
}

export default GoogleMapComponent;
