import "./error.css";

const JSONError = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-wrap">
      <div className="error">
        <div className="error-header">Json Error</div>
        <div className="error-body">
          <img src="/images/error-100.png" alt="error"></img>
          <p className="error-message">{error.message}</p>
          <button onClick={resetErrorBoundary}>Reload</button>
        </div>
      </div>
    </div>
  );
};

export default JSONError;
