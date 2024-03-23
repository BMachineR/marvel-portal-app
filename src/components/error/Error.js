import "./error.scss";
import error from "../../resources/images/error.gif";

function Error() {
  return (
    <div className="error-wrapper">
      <img src={error} alt="error" className="error-img" />
      <p>Something went wrong</p>
    </div>
  );
}

export default Error;
