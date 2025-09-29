import { useEffect } from "react";
import { postMessage } from "../../api/messages";
import "./AddMessagePage.css";

function AddMessagePage() {
  const messageData = {
    message: "Skickar meddelande från frontend",
  };

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQSyI6IlVTRVIja2xhcmEiLCJhdHRyaWJ1dGVzIjp7ImNyZWF0ZWRBdCI6IjIwMjUtMDktMjRUMTk6NDY6MzUuMDc1WiIsInBhc3N3b3JkIjoiJDJiJDEwJDJsa2VISHIvMG0waU15RjVFOWtSL081UUtkR2J5WlBZQ1dzVUV5U0EzY08uR1E0ZjUuUHJxIiwicm9sZSI6IkdVRVNUIiwiZW1haWwiOiJtYWlsQGdtYWlsLmNvbSIsInVzZXJuYW1lIjoia2xhcmEifSwiU0siOiJQUk9GSUxFIiwiaWF0IjoxNzU4OTgxMzg1LCJleHAiOjE3NTg5ODQ5ODV9.xhEZpMrAcMbMu36FOOVV8NWnwWzToXiJRJ_RjDMWwDc";

  useEffect(() => {
    const handleSubmit = async (e) => {
      const response = await postMessage(messageData, token);
      console.log(response);
    };
    handleSubmit();
  }, []);

  return <section className="page"></section>;
}

export default AddMessagePage;
