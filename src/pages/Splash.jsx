import { useNavigate } from "react-router";
import "./Splash.css";

function Splash() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("home", { viewTransition: true })
  }, 5000);

  return (
    <div className="splash">
      <img src="Arfhe-logo.png" width="100px" height="100px"/>
    </div>
  );
}

export default Splash;