import {IoAlertCircle} from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Error = () => {
    const navigate=useNavigate();
  return (
    <div className="main">
      <div className="hero">
        <h1 className="main-title">
          <span className="secrefiy"> Error occured</span>
        </h1>
        <div className="description"></div>

        <div className="copy-screen">
          <div className="secret-link-error">
            <IoAlertCircle className="alert-icon" />
            Secret not found - This usually means the secret link has already
            been visited and therefore no longer exists.
          </div>
          <div className="line-br"></div>
          <div className="button-wrapper-2">
            <button
              className="copy-button"
              onClick={() => {
                navigate("/");
              }}
            >
              Reply with Secret
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
