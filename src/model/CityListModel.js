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

    try {
      const { List } = await getCities();
      this.state.cityList = List;
      this.props.onLoadCityList(List);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return null;
  }
}

export { CityListModel };
