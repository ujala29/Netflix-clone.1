import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "../Home/HomeScreen"; // or .jsx if needed


const Homepage = () => {
	const { user } = useAuthStore();

	return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};
export default Homepage;