import { local } from "utils/API";
import { PATH_JSON } from "utils/constants";
import React from "react";

class CityListModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
    };
  }

  async componentDidMount() {
    const getCities = async () => {
      return await local.get(PATH_JSON);
    };

    const { List } = await getCities();
    this.state.cityList = List;
  }

  render() {
    return null;
  }
}

export { CityListModel };
