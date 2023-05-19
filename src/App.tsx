import React from 'react';
import Header from './header/header'
import Loading from './loadingSpin/loadingSpin'
import './App.css';
import './common.css';
import InformationalMenu from './informationalMenu/informationalMenu';


import { useState } from 'react';


function App() {

  const [year, setYear] = useState(1);

  const isLoading = false;

  return (
    <div className="App">
      <Header />

      <div id="main_container" className="container">
        {isLoading ? (
          <Loading />
        ) : (
          <InformationalMenu year={year} setYear={setYear}/>
        )}
      </div>

    </div>
  );
}

export default App;

export interface IYear {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>
}
