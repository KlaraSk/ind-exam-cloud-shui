import axios from "axios";

export const getMessages = async (sortquery, userquery) => {
  const generateUrl = () => {
    if (!sortquery && !userquery) return `https://ieu86c24ti.execute-api.eu-north-1.amazonaws.com/api/messages?sort=newest`;
    else if (sortquery === "oldest") return `https://ieu86c24ti.execute-api.eu-north-1.amazonaws.com/api/messages?sort=oldest`;
    else if (sortquery === "newest" && userquery)
      return `https://ieu86c24ti.execute-api.eu-north-1.amazonaws.com/api/messages?sort=newest&user=${userquery}`;
    else if (sortquery === "oldest" && userquery)
      return `https://ieu86c24ti.execute-api.eu-north-1.amazonaws.com/api/messages?sort=oldest&user=${userquery}`;
  };

  const response = await axios
    .get(generateUrl())
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
      return error.response;
    });

  return response;
};

export const deleteMessage = async (messageId, token) => {
  const response = await axios
    .delete(`https://ieu86c24ti.execute-api.eu-north-1.amazonaws.com/api/messages/${messageId}`, {
      headers: { Authorization: token, "Content-Type": "application/json" },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error.response.data.message;
    });
  return response;
};

export const putMessageById = async (messageId, data, token) => {
  const response = await axios
    .put(`https://ieu86c24ti.execute-api.eu-north-1.amazonaws.com/api/messages/${messageId}`, data, {
      headers: { Authorization: token, "Content-Type": "application/json" },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log(error);

      return error.response;
    });
  return response;
};
