import { useParams } from "react-router-dom";
import DetailsContainer from "./containers/DetailsContainer";

// eslint-disable-next-line
export default function () {
  const { id } = useParams();

  return <DetailsContainer cityCode={id} />;
}
