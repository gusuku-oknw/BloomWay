import React from 'react';

const HospitalDetails = ({ hospital }) => {
  return (
    <div>
      <h2>{hospital.name}</h2>
      <p>{hospital.description}</p>
      {/* 他の詳細情報も表示することができます */}
    </div>
  );
}

export default HospitalDetails;
