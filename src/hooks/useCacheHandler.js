const useCacheHandler = () => {
  const getMilliseconds = (time, unit) => {
    if (unit === "MIN") {
      return time * 60 * 1000;
    } else if (unit === "SEC") {
      return time * 1000;
    } else {
      console.log("Unsupported time unit");
    }
  };

  const hasKey = (key) => {
    return null !== localStorage.getItem(key);
  };

  const getCache = (city) => {
    const cacheCity = JSON.parse(localStorage.getItem(city.CityCode));
    if (
      cacheCity &&
      Date.now() - cacheCity.cachedTime <
        getMilliseconds(city.ExpireTime, city.TimeUnit)
    ) {
      return cacheCity.data;
    }
  };

  const setCache = (cityCode, weather) => {
    localStorage.setItem(
      cityCode,
      JSON.stringify({ data: weather, cachedTime: Date.now() })
    );
  };

  return { hasKey, getCache, setCache, getMilliseconds };
};

export { useCacheHandler };
