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
  // var pattern = new RegExp("/!3d(?<latitude>[^!]+)!4d(?<longitude>[^!]+)/gm");
  var pattern = new RegExp("^-?([0-9]{1,2}|1[0-7][0-9]|180)(.[0-9]{1,10})?$");
  return pattern.test(coordinateString);
};

const mapStringSplice = (str) => {
  let strSplitted = str.split("");
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

// const flatArray = (customerList) => {
//   let newCustomerList = [];
//   customerList.forEach((customer) => {
//     let { order_history, id, fullname, email, sdt, address, note } = customer;
//     let newCustomer = { id, fullname, email, sdt, address, note };
//     if (order_history.length) {
//       order_history.forEach((order) => {
//         newCustomerList = [
//           ...newCustomerList,
//           {
//             ...newCustomer,
//             order_id: order.order_id,
//             order_content: order.order,
//             order_note: order.note,
//             order_complete_date: order.complete_date,
//           },
//         ];
//       });
//     } else {
//       newCustomerList = [
//         ...newCustomerList,
//         {
//           ...newCustomer,
//           order_id: "No data",
//           order_content: "No data",
//           order_note: "No data",
//           order_complete_date: "No data",
//         },
//       ];
//     }
//   });

//   return newCustomerList;
// };

// const prepareData = (customerList) => {
//   let newCustomerData = customerList.map((customer) => {
//     let { avatar, ...data } = customer;
//     if (!data.hasOwnProperty("order_history")) {
//       data.order_history = [];
//     }

//     Object.keys(data).forEach((item) => {
//       if (data[item] === "") {
//         data[item] = "No data";
//       }
//     });
//     return data;
//   });

//   return flatArray(newCustomerData);
// };

const prepareData = (customerList) => {
  let newCustomerList = customerList.map((customer) => {
    let { id, fullname, email, sdt, address, map, ...data } = customer;

    let newCustomer = { id, fullname, email, sdt, address, map };

    let mapUrl = "";
    if (map.includes(",")) {
      let mapCoordinate = mapStringSplice(map).split(",");
      let latitude = "";
      let longtitude = "";

      if (mapCoordinate.length === 2) {
        latitude = mapCoordinate[0].trim();
        longtitude = mapCoordinate[1].trim();
        if (latitude.length && longtitude.length) {
          mapUrl = `https://www.google.pt/maps/dir//${latitude},${longtitude}/@${latitude},${longtitude},20z`;
        }
      }
    }

    Object.keys(newCustomer).forEach((item) => {
      if (newCustomer[item].trim() === "") {
        newCustomer[item] = "";
      }
    });

    newCustomer.map = mapUrl;

    return newCustomer;
  });

  return newCustomerList;
};

export { isValidUrl, isValidCoordinate, mapStringSplice, prepareData };
