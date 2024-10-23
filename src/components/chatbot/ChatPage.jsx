import { useQuery } from '@tanstack/react-query';
import NewPrompt from '../newprompt/Newprompt';
import './ChatPage.css'
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";

const ChatPage = () => {

  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

 
    return (
        <div className = 'chatPage'>
            <div className='wrapper'>
                <div className='chat'>
                {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.history?.map((message, i) => (
                <>
                  <div
                    className={
                      message.role === "user" ? "message user" : "message"
                    }
                    key={i}
                  >
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </>
              ))}
          {data && <NewPrompt data={data}/>}
                </div>
            </div>
        </div>
    )
}
export default ChatPage