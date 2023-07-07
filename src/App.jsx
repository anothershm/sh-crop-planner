import React, { useState } from 'react';
import Header from './header/header'
import Loading from './loadingSpin/loadingSpin'
import './App.css';
import './common.css';
import InformationalMenu from './informationalMenu/informationalMenu';
import SeasonPicker from './season-picker/seasonPicker';
import Calendar from './calendar/calendar';

import { Seasons, FarmType } from './common/constants';


function App() {
  const [year, setYear] = useState(1);
  const [season, setSeason] = useState(Seasons.SPRING);
  const [farmType, setFarmType] = useState(FarmType.SUN_HAVEN)

  var config = { year, season, farmType };

  var isLoading = false;

  var onChangeFarm = (farmValue) => {
    setFarmType(farmValue)
  }

  var onChangeYear = (year) => {
    setYear(year)
  }

  return (
    <div className="App">
      <Header />

      <div id="main_container" className="container">
        {isLoading ? (
          <Loading />
        ) : (
          <>
          <InformationalMenu {...config} onChangeYear={onChangeYear.bind(this)}  onChangeFarm = {onChangeFarm.bind(this)} />
          <SeasonPicker season={season} setSeason={setSeason} />
          <Calendar season={season} />
          </>
        )}
      </div>
     
    </div>
  );
}

export default App;

