interface IConfig {
	locale: string;
	currency: string;
	dateFormat: string;
}
export const FIREBASE_API = {
	apiKey: "AIzaSyBernKzdSojh_vWXBHt0aRhf5SC9VLChbM",
	authDomain: "berry-material-react.firebaseapp.com",
	projectId: "berry-material-react",
	storageBucket: "berry-material-react.appspot.com",
	messagingSenderId: "901111229354",
	appId: "1:901111229354:web:a5ae5aa95486297d69d9d3",
	measurementId: "G-MGJHSL8XW3"
};

const config: IConfig = {
	locale: "en", // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese
	currency: "USD",
	dateFormat: "MM/dd/yyyy"
};

export default config;
