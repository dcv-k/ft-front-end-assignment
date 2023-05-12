import React from "react";

import { local } from "utils/API";
import { PATH_JSON } from "utils/constants";

class CityListModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityList: [],
    };
  }

  async componentDidMount() {
    const { List } = await local.get(PATH_JSON);
    this.state.cityList = List;
  }

  render() {
    return null;
  }
}

export { CityListModel };
