import React from "react";
import Routes from "routes";
import { JWTProvider as AuthProvider } from "contexts/JWTContent";
const App = () => {
	return (
		<AuthProvider>
			<React.Fragment>
				<Routes />
			</React.Fragment>
		</AuthProvider>
	);
};

export default App;
