import ReactDOM from "react-dom";
// third party
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
// load mock apis

// project imports
import App from "App";
import reportWebVitals from "reportWebVitals";
import * as serviceWorker from "serviceWorker";

import "./utils/i18n";
import { store } from "store";
// ==============================|| REACT DOM RENDER  ||============================== //
import "assets/scss/style.scss";
ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
