"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageSquare, Send, X, Minimize2, Maximize2 } from "lucide-react"
import { useChat } from "ai/react"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })

  useEffect(() => {
    // Scroll to bottom on new message
    if (chatContainerRef.current && isOpen && !isMinimized) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [messages, isOpen, isMinimized])

  useEffect(() => {
    // Focus input when chat is opened
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div
          className={`bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-300 ease-in-out mb-4 w-full sm:w-96 ${
            isMinimized ? "h-16" : "h-[500px]"
          }`}
        >
          {/* Chat Header */}
          <div className="bg-red-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden mr-3 bg-white p-1">
                <Image
                  src="/sika-support-avatar.png"
                  alt="Sika Assistant"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold">Sika Assistant</h3>
                {!isMinimized && <p className="text-xs text-red-100">How can I help you today?</p>}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={toggleMinimize} className="text-white hover:text-red-200">
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button onClick={toggleChat} className="text-white hover:text-red-200">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          {!isMinimized && (
            <>
              <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto h-[calc(500px-132px)]">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
                      <MessageSquare className="h-8 w-8 text-red-600" />
                    </div>
                    <h3 className="font-medium mb-1">Welcome to Sika Assistant</h3>
                    <p className="text-sm max-w-xs">
                      Ask me anything about Sika products, applications, or find the right solution for your project.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`flex items-start max-w-[80%] ${
                            message.role === "user" ? "flex-row-reverse" : ""
                          }`}
                        >
                          {message.role !== "user" && (
                            <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-red-100 p-1 flex-shrink-0">
                              <Image
                                src="/sika-support-avatar.png"
                                alt="Sika Assistant"
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div
                            className={`rounded-lg p-3 ${
                              message.role === "user" ? "bg-red-600 text-white mr-2" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p className="whitespace-pre-wrap">{message.content}</p>
                          </div>
                          {message.role === "user" && (
                            <div className="w-8 h-8 rounded-full overflow-hidden ml-2 bg-gray-300 flex-shrink-0">
                              <div className="h-full w-full flex items-center justify-center text-gray-600 text-xs font-bold">
                                YOU
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex items-start max-w-[80%]">
                          <div className="w-8 h-8 rounded-full overflow-hidden mr-2 bg-red-100 p-1 flex-shrink-0">
                            <Image
                              src="/sika-support-avatar.png"
                              alt="Sika Assistant"
                              width={40}
                              height={40}
                              className="object-cover"
                            />
                          </div>
                          <div className="rounded-lg p-3 bg-gray-100 text-gray-800">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="border-t p-4">
                <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={handleInputChange}
                    placeholder="اكتب سؤالك هنا..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" className="bg-red-600 hover:bg-red-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      )}

      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className="rounded-full w-16 h-16 flex items-center justify-center shadow-lg transition-transform hover:scale-110 p-0 overflow-hidden border-2 border-red-600"
      >
        {isOpen ? (
          <div className="bg-red-600 w-full h-full flex items-center justify-center">
            <X className="h-6 w-6 text-white" />
          </div>
        ) : (
          <Image
            src="/sika-support-avatar.png"
            alt="Sika Assistant"
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        )}
      </button>
    </div>
  )
}
