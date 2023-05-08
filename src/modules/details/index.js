import { useParams } from "react-router-dom";
import DetailsContainer from "./containers/DetailsContainer";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "components/error/ErrorFallback";

// eslint-disable-next-line
export default function () {
  const { id } = useParams();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <DetailsContainer cityCode={id} />
    </ErrorBoundary>
  );
}
