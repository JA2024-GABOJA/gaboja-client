import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home';
import ROUTER from './constants/router';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER.HOME} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
