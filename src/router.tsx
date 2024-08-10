import { BrowserRouter, Route, Routes } from "react-router-dom";
import ROUTER from "./constants/router";
import { MakePage } from "./pages";
import HomePage from "./pages/Home";

const Routers = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path={ROUTER.HOME} element={<HomePage />} />
				<Route path={ROUTER.MAKE_SANCHAEK} element={<MakePage />} />
				<Route path={ROUTER.VIEW_SANCHAEK} element={<HomePage />} />
			</Routes>
		</BrowserRouter>
	);
};

export default Routers;
