const isValidUrl = (urlString) => {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // validate fragment locator
  return !!urlPattern.test(urlString);
};

const isValidCoordinate = (coordinateString) => {
  var pattern = new RegExp("/!3d(?<latitude>[^!]+)!4d(?<longitude>[^!]+)/gm");
  return pattern.test(coordinateString);
};

const mapStringSplice = (str) => {
  let strSplitted = str.split("");
  console.log("strSplit 1 and last char");
  console.log(strSplitted.slice(1, 1));
  console.log(strSplitted.slice(-1, 1));
  console.log(strSplitted);
  console.log(strSplitted[0]);
  console.log(strSplitted[strSplitted.length - 1]);

  if (strSplitted[0] === "(" && strSplitted[strSplitted.length - 1] === ")") {
    return strSplitted.slice(1, -1).join("");
  }

  if (strSplitted[0] === "(") {
    return strSplitted.slice(1).join("");
  }

  if (strSplitted[strSplitted.length - 1] === ")") {
    return strSplitted.slice(0, -1).join("");
  }

  return str;
};

export { isValidUrl, isValidCoordinate, mapStringSplice };
