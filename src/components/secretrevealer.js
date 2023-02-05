import { useNavigate } from "react-router-dom";

const RevealSecret = (secretmessage) => {
  const sometext = secretmessage;
  const url = sometext.secretmessage;
  const checker = sometext.isurl;
  const navigate = useNavigate();
  const pattern = /^(https?:\/\/www\.)/;

  const handleClick = () => {
    if (!pattern.test(url)) {
      window.open("http://www." + url, "_blank", "noreferrer");
    }
    window.open(url, "_blank", "noreferrer");
  };

  const handlereply = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="main">
      <div className="hero">
        <h1 className="main-title">
          You have received a<span className="secrefiy"> Secret</span>
        </h1>
        <div className="description"></div>

        <div className="copy-screen">
          {checker ? (
            <div className="url-wrapper">
              <button className="revealer" onClick={handleClick}>
                Reveal Your Secret
              </button>
            </div>
          ) : (
            <div className="secret-link"> {sometext.secretmessage}</div>
          )}
          <div className="line-br"></div>
          <div className="button-wrapper-2">
            <button className="copy-button" onClick={handlereply}>
              Reply with Secret
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevealSecret;
