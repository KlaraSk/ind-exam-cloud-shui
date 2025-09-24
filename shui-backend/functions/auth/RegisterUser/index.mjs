export const handler = async (event) => {
  return {
    statuscode: 200,
    body: JSON.stringify({ message: "HEJ från RegisterUser" }),
  };
};
