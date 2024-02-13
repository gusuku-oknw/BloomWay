// src/components/ScheduleCalendar.js

import React, { useState, useEffect } from 'react';
import './ScheduleCalendar.css';

const ScheduleCalendar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [selectedLecture, setSelectedLecture] = useState(null);

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    const handle = (mm) => {
      setIsMobile(mm.matches);
    };

    handle(mediaQuery);
    mediaQuery.addListener(handle);

    return () => {
      mediaQuery.removeListener(handle);
    };
  }, []);

  const handleLectureClick = (lecture) => {
    setSelectedLecture(lecture);
  };

  const handleCloseDetail = () => {
    setSelectedLecture(null);
  };

  return (
    <div className={`schedule-calendar ${isMobile ? 'mobile' : ''}`}>
      
    </div>
  );
};

export default ScheduleCalendar;
