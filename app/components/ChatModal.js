import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { IoClose } from "react-icons/io5";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function ChatModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    if (!session?.user?.email) {
      signIn();
      return;
    }

    try {
      const response = await fetch("/api/messages");
      if (!response.ok) {
        console.log("Error fetching messages:", response.status);
        return;
      }
      const data = await response.json();
      console.log("Fetched messages:", data); // برای دیباگ
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!session?.user?.email) {
      signIn();
      return;
    }
  
    if (!newMessage.trim()) return;
  
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        receiverId: '66ea8e2bc059fb2c5fba94f3',
        content: newMessage.trim(),
        senderId: session.user.id
      }),
    });
  
    if (response.ok) {
      setNewMessage('');
      fetchMessages();
    }
  };

  useEffect(() => {
    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    console.log("Session data:", session);
    if (isOpen && session) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen, session]);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed z-50 bottom-4 right-4 bg-yellow-400 text-white p-4 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-300"
      >
        <IoChatbubbleEllipsesOutline size={24} />
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-yellow-400 text-white px-4 py-3 flex justify-between items-center">
              <h3 className="font-bold">گفتگو با پشتیبانی</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-yellow-500 p-1 rounded"
              >
                <IoClose size={24} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="h-96 overflow-y-auto p-4 bg-gray-50 messages-container">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`max-w-[80%] mb-4 ${
                    message.sender?._id === session?.user?.id
                      ? "ml-auto"
                      : "mr-auto"
                  }`}
                >
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender?._id === session?.user?.id
                        ? "bg-yellow-400 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    {message.content}
                  </div>
                  <div
                    className={`text-xs mt-1 ${
                      message.sender?._id === session?.user?.id
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {message.sender?.name || "ناشناس"}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="پیام خود را بنویسید..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-yellow-400"
                />
                <button
                  type="submit"
                  className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-all duration-300"
                >
                  ارسال
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
