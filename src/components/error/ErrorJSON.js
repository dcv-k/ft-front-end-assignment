import "./error.css";

const ErrorJSON = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-wrap">
      <div className="error">
        <div className="error-header">JSON Error</div>
        <div className="error-body">
          <div className="error-body-top">
            <img
              className="icon-error"
              src="/images/error-solid-96.png"
              alt="error"
            ></img>
            <p>Request Failed!</p>
          </div>

          <p className="error-message">{error.message}</p>

          <div className="btn-wrap" onClick={resetErrorBoundary}>
            <img
              className="icon-reset"
              src="/images/reset-48.png"
              alt="error"
            ></img>
            <span>Try again</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorJSON;
