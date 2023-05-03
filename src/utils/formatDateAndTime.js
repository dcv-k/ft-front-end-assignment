export const formatTimeAndDate = (time) => {
  return (
    new Date(time * 1000).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }) +
    ", " +
    new Date(time * 1000).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
    })
  );
};
