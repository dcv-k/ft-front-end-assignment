import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import ErrorFallback from "components/error/ErrorFallback";
import DetailsContainer from "./containers/DetailsContainer";

// eslint-disable-next-line
export default function () {
  const { id } = useParams();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <DetailsContainer cityCode={id} />
    </ErrorBoundary>
  );
}
