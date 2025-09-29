import axios from "axios";

export const loginApi = async (data) => {
  const result = await axios
    .post("https://ieu86c24ti.execute-api.eu-north-1.amazonaws.com/api/auth/login", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  if (result.status === 200) return result;
  else return result.response;
};

export const registerApi = async (data) => {
  const response = await axios
    .post("https://ieu86c24ti.execute-api.eu-north-1.amazonaws.com/api/auth/register", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });

  if (response.status === 201) return response;
  else return response.message;
};
