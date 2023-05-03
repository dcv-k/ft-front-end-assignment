import { useParams } from "react-router-dom";
import DetailsContainer from "./containers/DetailsContainer";

export default function () {
  const { id } = useParams();

  return <DetailsContainer cityCode={id} />;
}
