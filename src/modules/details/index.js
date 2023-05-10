import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import DetailsContainer from "./containers/DetailsContainer";
import DetailsAPI from "components/error/DetailsAPI";

// eslint-disable-next-line
export default function () {
  const { id } = useParams();

  return (
    <ErrorBoundary FallbackComponent={DetailsAPI}>
      <DetailsContainer cityCode={id} />
    </ErrorBoundary>
  );
}
