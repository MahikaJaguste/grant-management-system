import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Homepage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Header title="Grant Management System" tabs={[]} />
            <h1>Welcome to the Grant Management System</h1>
            <button onClick={() => navigate('/professor')}>Professor Dashboard</button>
            <button onClick={() => navigate('/review')}>Grant Committee Dashboard</button>
            <Footer />
        </div>
    );
};
export default Homepage;
