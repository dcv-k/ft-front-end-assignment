const ErrorAPI = ({ error, resetErrorBoundary }) => {
  return (
    <div className="widget-error">
      <div className="top">
        <div className="heading">
          <img
            className="icon--error"
            src="/images/error-solid-96.png"
            alt="error"
          ></img>
          <p>Request Failed!</p>
        </div>
        <p className="message">request failed while making api call</p>
        <p className="message">{error.message}</p>
      </div>
      <div className="bottom">
        <div className="btn-retry" onClick={resetErrorBoundary}>
          <img
            className="icon--retry"
            src="/images/reset-48.png"
            alt="error"
          ></img>
          <span>Try again</span>
        </div>
      </div>
    </div>
  );
};

export default ErrorAPI;
