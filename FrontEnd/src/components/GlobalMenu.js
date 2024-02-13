// src/components/GlobalMenu.js

import React, { useEffect, useState }  from 'react';
import { AiFillHome, AiFillSchedule, AiFillSetting } from "react-icons/ai"
import ScheduleCalendar from './ScheduleCalendar'

const GlobalMenu = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    const handleTabClick = (tab) => {
        setIsSidebarOpen(false);
        setActiveTab(tab);
      };

      const styles = {
        globalMenu: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100%',
            backgroundColor: '#e9e9e9',
            color: '#fff',
            padding: '10px 0',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
        },
        ul: {
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'flex',
        },
        li: {
            marginRight: '20px',
        },
        menuItem: {
            textDecoration: 'none',
            color: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize: '12px',
            padding: '0 3em',
        },
        menuIcon: {
            fontSize: '28px',
            marginBottom: '5px',
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 999,
        }
    };
  return (
    <div style={styles.globalMenu}>
      <ul style={styles.ul}>
        <li>
          <a href="/" style={styles.menuItem}>
            <AiFillHome style={styles.menuIcon} />
            <span onClick={() => handleTabClick('ScheduleCalendar')}>
                Home
            </span>
          </a>
        </li>
        <li>
          <a href="/schedule" style={styles.menuItem}>
            <AiFillSchedule style={styles.menuIcon} />
            <span onClick={() => handleTabClick('ScheduleCalendar')}>
                Schedule
            </span>
          </a>
        </li>
        <li>
          <a href="/about" style={styles.menuItem}>
          <AiFillSetting style={styles.menuIcon} />
          <span>Setting</span>
          </a>
        </li>
        {/* 他のメニューアイテムも同様に追加 */}
      </ul>
      {activeTab === 'ScheduleCalendar' && <ScheduleCalendar style={styles.overlay} />}
    </div>
  );
};

export default GlobalMenu;
