export const timeToMilliseconds = (unit, time) => {
  if (unit === "MIN") {
    return time * 60 * 1000;
  } else if (unit === "SEC") {
    return time * 1000;
  } else {
    console.log("Unsupported time unit");
  }
};
