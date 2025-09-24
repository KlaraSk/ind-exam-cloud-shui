export const sendResponse = (code, data) => {
  const isSuccess = () => (code === 200 || code === 201 ? true : false);

  return {
    statusCode: code,
    success: isSuccess(),
    body: JSON.stringify({
      ...data,
    }),
  };
};
