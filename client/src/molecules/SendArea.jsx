import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import CommandArea from "./CommandArea";

const SendArea = ({ onSendMessage }) => {
  const { user } = useContext(AuthContext);
  const [messageText, setMessageText] = useState("");

	const handleSend = (e) => {
		e.preventDefault();

    // Recheck if user is still null after revalidation
    if (!user || !messageText.trim()) return;

		onSendMessage(messageText);
		setMessageText(""); // Clear the input field after sending
	};

  return (
    <>
      <CommandArea messageText={messageText} setMessageText={setMessageText} />
      <form
        className="flex justify-between items-center p-4 bg-gray-200 dark:bg-gray-700"
        onSubmit={handleSend}
      >
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          className="flex-1 p-2 mr-4 rounded border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          placeholder="Type your message here..."
          disabled={!user} // Disable input if there's no user
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          disabled={!user} // Disable button if there's no user
        >
          Send
        </button>
      </form>
    </>
  );
};

export default SendArea;
