// src/App.js

import React from 'react';
import { Div } from "atomize";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ScheduleCalendar from './components/ScheduleCalendar';
import SurveyWithFlicking from "./components/ChoicesWithFlicking";
import ThankYou from "./components/ThankYou";

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
          <Routes>
            <Route path="/" element={<SurveyWithFlicking />} />
            <Route path="/thankYou" element={<ThankYou />} />
            {/* 他のルートを追加 */}
          </Routes>
        </main>
        <footer>
          {/*<GlobalMenu /> /!* グローバルメニューを画面の下に配置 *!/*/}
        </footer>
      </div>
    </Router>
  );
}

export default App;
