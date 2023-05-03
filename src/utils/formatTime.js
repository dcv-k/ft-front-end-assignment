export const formatTime = (time) => {
  return new Date(time * 1000).toLocaleTimeString("en-US", {
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  });
};
