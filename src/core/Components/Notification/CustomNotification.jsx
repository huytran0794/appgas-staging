import { notification } from "antd";

const CustomNotification = (
  type,
  message = "",
  desc = "",
  btn = null,
  duration = 4.5
) => {
  let returnedConfig = {
    message: message,
    description: desc,
  };
  if (btn) {
    returnedConfig = { ...returnedConfig, btn };
  }

  if (duration !== 4.5) {
    returnedConfig = { ...returnedConfig, duration };
  }

  return notification[type](returnedConfig);
};

export default CustomNotification;
