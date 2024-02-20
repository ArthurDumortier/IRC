import { useEffect, useRef, useState, useCallback } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { useMessages } from "../hooks/useMessages";
import generateUniqueId from "../utils/generateUniqueId";
import MessageBubble from "../molecules/Message-bubble";
import SendArea from "../molecules/SendArea";

import { useConversations } from "../hooks/useConversations";
import { useLeaveSea } from "../hooks/useLeaveSea";
import { useBanSea } from "../hooks/useBanSea";
import { useUser } from "../hooks/useUser";

const Chat = ({ socket }) => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { getMessages, postMessage } = useMessages();
  const { getUser, getUsers } = useUser();

  const { addUserInConversation, getConversation } = useConversations();
  const { leaveSea } = useLeaveSea();
  const { banSea } = useBanSea();

  // commands
  const handleAddCommand = async (idUser) => {
    const addUser = await getUser(idUser);
    console.log(addUser);
    const result = await addUserInConversation(id, idUser);
    console.log(result);
  };
  const handleListCommand = async () => {
    const allUsers = await getUsers();
    const conv = await getConversation(id);
    console.log(conv);
    return allUsers.filter((theUser) =>
      conv.participants.some(
        (participants) => theUser._id === participants.userId
      )
    );
  };
  const handleBanCommand = async (theUser) => {
    await handleKickCommand(theUser);
    const result = await banSea(id, user.token, theUser);
    console.log(result);
  };
  const handleBlackListCommand = async () => {
    const conv = await getConversation(id);
    const allBanUser = [];
    for (const theBlackList of conv.blacklist) {
      const theUser = await getUser(theBlackList.user);
      allBanUser.push(theUser);
    }
    return allBanUser;
  };
  const handleKickCommand = async (userId) => {
    const result = await leaveSea(id, user.token, userId);
    console.log(result);
  };
  const handleLeaveCommand = async () => {
    const result = await leaveSea(id, user.token, user._id);
    console.log(result);
  };

  const handleAddMessage = (theText) => {
    postMessage(id, theText)
      .then((value) => {
        value.sender = user;
        socket.emit("message", id, value);
      })
      .catch((e) => {
        console.log(e);
      });
  };

	useEffect(() => {
		const fetchData = async () => {
			const allMessages = await getMessages(id);

			for (const message of allMessages) {
				if (message.userId) {
					const userValue = await getUser(message.userId);
					if (userValue) {
						message.sender = userValue;
					}
				}
			}
			setMessages(allMessages);
		};
		fetchData();
	}, [id]);

	useEffect(() => {
		socket.emit("join", id);
		socket.on("message", (roomId, newMessage) => {
			setMessages([...messages, newMessage]);
		});

		return () => {
			socket.removeAllListeners();
		};
	});

	const handleDeleteMessageSuccess = useCallback((messageId) => {
		setMessages((currentMessages) =>
			currentMessages.filter((message) => message._id !== messageId)
		);
	}, []);

  // Function to send a message with socketIO from the SendArea
  const handleSendMessage = useCallback(
    async (newMessage) => {
      if (newMessage.startsWith("/")) {
        newMessage = newMessage.slice(1);
        const splitMessage = newMessage.split(" ");

        if (splitMessage) {
          switch (splitMessage[0]) {
            case "add":
              if (splitMessage[1]) {
                console.log("ajout user via commande");
                handleAddCommand(splitMessage[1]);
              }
              break;
            case "kick":
              if (splitMessage[1]) {
                console.log("kick un user via commande");
                await handleKickCommand(splitMessage[1]);
              }
              break;
            case "ban":
              if (splitMessage[1]) {
                console.log("ban un user via commande");
                await handleBanCommand(splitMessage[1]);
              }
              break;
            case "list":
              console.log("list des utilisateurs via commande");
              const allUser = await handleListCommand();
              let messageUser =
                "Il y a " +
                allUser.map((theUser) => theUser.username).join(", ");
              handleAddMessage(messageUser);
              console.log(allUser);
              break;
            case "blacklist":
              console.log("list des utilisateurs banni via commande");
              const blaskList = await handleBlackListCommand();

              let messageBlackList = blaskList
                .map((theUser) => theUser.username)
                .join(", ");

              if (blaskList.length > 1) {
                messageBlackList += " sont bannis";
              } else if (blaskList.length == 1) {
                messageBlackList += " est banni";
              } else {
                messageBlackList = "Personne n'est banni";
              }

              handleAddMessage(messageBlackList);
              console.log(messageBlackList);
              break;
            case "leave":
              console.log("quite la ocnversation");
              await handleLeaveCommand();
              break;
            case "help":
              console.log("liste des commandes");
              handleAddMessage(
                "/add @userId /leave /kick @userId /ban  @userId /list /blacklist /help"
              );
              break;
            default:
              console.log("unknow command");
              break;
          }
        }
      } else {
        postMessage(id, newMessage)
          .then((value) => {
            value.sender = user;
            socket.emit("message", id, value);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    },
    [id]
  );

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="flex flex-col h-screen w-full">
			<div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100 dark:bg-gray-800 flex flex-col-reverse">
				<div ref={messagesEndRef} />
				{messages
					.map((message) => (
						<MessageBubble
							key={message._id}
							message={message}
							onDeleteSuccess={handleDeleteMessageSuccess} // Pass the function correctly
						/>
					))
					.reverse()}
			</div>
			<div className="w-full">
				<SendArea onSendMessage={handleSendMessage} />
			</div>
		</div>
	);
};
export default Chat;
