import './App.css'
import { SplitScreen } from './layouts/SplitScreenContainer'
import LeftPanel from './components/LeftPanel'
import LocationMap from './components/LocationMap'
import { useState } from 'react'

interface Provider {
  longitude: number;
  latitude: number;
}

/*
    Here I'm just demonstrating higher order components and a little bit of data flow. I could've added a global state but for something this small;
    it isn't worth the effort. Looking back on it I should've just used the hook useContext and wrapped it as a parent element in order to pass values down.

*/

function App() {
  const [coordinates, setCoordinates] = useState<Provider>({
    longitude: 0,
    latitude: 0
  });
  
  const {latitude, longitude} = coordinates;

  return (
    <div className="App">
      <SplitScreen leftWeight={1} rightWeight={5}>
        <LeftPanel setCoordinates={setCoordinates} />
        <LocationMap latitude={latitude}  longitude={longitude}/>
      </SplitScreen>
    </div>
  )
}

export default App
