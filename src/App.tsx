import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useGeo from "./hooks/useGeo.ts";
import Map from "./lib/map";

function App() {
  const [count, setCount] = useState(0)
const {coords,timestamp , } = useGeo();
  return (
    <>
<Map
  initialViewState={{
  longitude: coords?.longitude || 0,
    latitude: coords?.latitude || 0,
  }}
  />
    </>
  )
}

export default App
