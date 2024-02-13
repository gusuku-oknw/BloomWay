// src/App.js

import React from 'react';
import { Div } from "atomize";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ScheduleCalendar from './components/ScheduleCalendar';
import Home from './components/Home'
import GoogleMapComponent from './components/GoogleMapComponent';
import GlobalMenu from './components/GlobalMenu';
import SurveyWithFlicking from "./components/ChoicesWithFlicking";

function App() {
  return (
    <Router> {/* <Router> コンポーネントを追加 */}
      <div className="App">
        <header>
          <Div
              bg="gray200"
              d="flex"
              align="center"
              justify="center"
              textSize="display1"
              textWeight="500"
              textColor="info500"

              p="1rem"
          >
            Reposit
          </Div>
        </header>
        <main>
          {/*<Routes>*/}
          {/*  <Route path="/" element={<GoogleMapComponent />} />*/}
          {/*  <Route path="/schedule" element={<ScheduleCalendar />} />*/}
          {/*  /!* 他のルートを追加 *!/*/}
          {/*</Routes>*/}
          <SurveyWithFlicking />
        </main>
        <footer>
          {/*<GlobalMenu /> /!* グローバルメニューを画面の下に配置 *!/*/}
        </footer>
      </div>
    </Router>
  );
}

export default App;
