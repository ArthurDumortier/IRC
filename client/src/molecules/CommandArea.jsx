const CommandArea = ({ messageText, setMessageText }) => {
  if (!messageText || messageText[0] !== "/") return;
  const commands = ["add", "leave", "kick", "ban", "list", "blacklist", "help"];

  return (
    <>
      {commands.map((command) => {
        return (
          <div
            onClick={() => setMessageText("/" + command + " ")}
            key={command}
            className="dark:bg-gray-800 dark:text-white p-1 cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-200 hover:bg-gray-300"
          >
            {command}
          </div>
        );
      })}
    </>
  );
};

export default CommandArea;
