import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import HomePage from "./pages/Home";
import EditUserPage from "./pages/Edit";
import CreateUserPage from "./pages/Create";
import { UserProvider } from "./contexts/userContext";

function App() {
	return (
		<>
			<UserProvider>
				<Router>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/edit/:userId" element={<EditUserPage />} />
						<Route path="/create" element={<CreateUserPage />} />
						<Route path="*" element={<Navigate to={"/"} />} />
					</Routes>
				</Router>
			</UserProvider>
		</>
	);
}

export default App;
