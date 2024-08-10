import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ROUTER from './constants/router';
import { MakePage } from './pages';
import HomePage from './pages/Home';
import CreateRoutePage from './pages/CreateRoute';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTER.HOME} element={<HomePage />} />
        <Route path={ROUTER.MAKE_SANCHAEK} element={<MakePage />} />
        <Route path={ROUTER.VIEW_SANCHAEK} element={<CreateRoutePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
