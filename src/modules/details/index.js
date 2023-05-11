import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import DetailsContainer from "./containers/DetailsContainer";
import ErrorAPI from "modules/dashboard/components/ErrorAPI/ErrorAPI";

// eslint-disable-next-line
export default function () {
  const { id } = useParams();

  return (
    <ErrorBoundary FallbackComponent={ErrorAPI}>
      <DetailsContainer cityCode={id} />
    </ErrorBoundary>
  );
}
