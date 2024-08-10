import './App.css';
import MapBox from './lib/map';

function App() {
  return (
    <>
      <MapBox
        initialViewState={{
          longitude: 129.284883,
          latitude: 35.825552,
          zoom: 14,
        }}
        style={{ width: 600, height: 400 }}
        onGeolocate={(e) => {
          console.log(e);
        }}
      />
    </>
  );
}

export default App;
