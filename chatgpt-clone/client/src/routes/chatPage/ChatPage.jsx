import { useQuery } from '@tanstack/react-query';
import NewPrompt from '../../components/newPrompt/NewPrompt'
import './chatPage.css'
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";
  
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
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
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

// This component displays a chat interface that shows messages with text or images, depending on the chat history. 
// It fetches chat data from an API using React Query, handles loading and error states, and displays messages in either 
// Markdown or as images. Users can see a chat history and add new prompts through the NewPrompt component. The page is styled 
// using a CSS file, and images are optimized using ImageKit.