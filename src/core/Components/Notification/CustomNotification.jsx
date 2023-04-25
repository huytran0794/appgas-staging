import { notification } from "antd";

const CustomNotification = (
  type,
  message = "",
  desc = "",
  btn = null,
  key = "",
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

  let notikey = Date.now();
  if (key) {
    notikey = key;
  }

  returnedConfig = {
    ...returnedConfig,
    key: notikey,
    onClose: () => notification.destroy(key),
  };

  notification[type](returnedConfig);

  return returnedConfig;
};

export default CustomNotification;
