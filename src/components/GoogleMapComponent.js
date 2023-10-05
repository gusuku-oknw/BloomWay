import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};

const GoogleMapComponent = () => {
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
  
  // 病院の位置データの例です。実際のデータに合わせて変更してください。
  const hospitals = [
    {
      name: "Hospital A",
      location: { lat: -3.745, lng: -38.523 }
    },
    {
      name: "Hospital B",
      location: { lat: -3.755, lng: -38.513 }
    }
    // ... 他の病院データ
  ];

  return (
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

        {selectedHospital && (
          <InfoWindow
            position={selectedHospital.location}
            onCloseClick={() => {
              setSelectedHospital(null);
            }}
          >
            <div>
              <h2>{selectedHospital.name}</h2>
              <p>This is a description about the hospital.</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapComponent;
