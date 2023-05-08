import "./error.css";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-wrap">
      <div className="error">
        <div className="error-header">Network Error</div>
        <div className="error-body">
          <img src="/images/error-100.png" alt="error"></img>
          <p className="error-message">{error.message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;
