import axios from "axios";

export const getMessages = async () => {
  const response = await axios
    .get("https://ieu86c24ti.execute-api.eu-north-1.amazonaws.com/api/messages?sort=newest")
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  if (response.status === 200) {
    return response.data;
  } else {
    return [];
  }
};

export const postMessage = async (data, token) => {
  const response = await axios
    .post("https://ieu86c24ti.execute-api.eu-north-1.amazonaws.com/api/messages", data, {
      headers: { Authorization: token, "Content-Type": "application/json" },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return response.data.message;
    });
};
