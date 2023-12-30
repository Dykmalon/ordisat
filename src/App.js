import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import AdminPage from './AdminPage';
import ErrorPage from "./404"

function App() {

	return (
		<>
			<Routes>
				<Route path="/" >
					<Route path="" element={<LandingPage />} />
					<Route path="/admin" element={<AdminPage />} />
					<Route path="*" element={<ErrorPage />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
