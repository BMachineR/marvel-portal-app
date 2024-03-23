import spinner from "../../resources/images/preloader.gif";
import "./spinner.scss";

function Spinner() {
  return <img src={spinner} className="spinner" alt="loading" />;
}

export default Spinner;
