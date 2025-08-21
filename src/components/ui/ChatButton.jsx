'use client';

import { MessageCircle, X, Send, Smile } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function ChatButton() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const chatCardRef = useRef(null);
  const inputRef = useRef(null);
  
  // Track scroll position to add shadow/animation when scrolled
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle clicks outside the chat card to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatCardRef.current && !chatCardRef.current.contains(event.target) && 
          !event.target.closest('button[aria-label="Chat with us"]')) {
        setIsChatOpen(false);
      }
    };
    
    if (isChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isChatOpen]);
  
  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300); // Delay to allow animation to complete
    }
  }, [isChatOpen]);
  
  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission logic here
    // For now, we'll just clear the input
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Card */}
      {isChatOpen && (
        <div 
          ref={chatCardRef}
          className="bg-white rounded-2xl shadow-2xl mb-4 w-80 md:w-96 overflow-hidden transform transition-all duration-300 ease-out origin-bottom-right"
          style={{
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            animation: 'chatAppear 0.3s ease-out forwards'
          }}
        >
          {/* Chat Header */}
          <div className="bg-[#1A2A44] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">Chat with us</h3>
                <p className="text-xs text-white/80">We typically reply within minutes</p>
              </div>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Chat Messages Area */}
          <div className="bg-gray-50 p-4 h-72 overflow-y-auto">
            {/* Welcome Message */}
            <div className="flex mb-4">
              <div className="w-8 h-8 rounded-full bg-[#1A2A44] flex-shrink-0 flex items-center justify-center mr-3">
                <span className="text-white text-xs font-bold">EL</span>
              </div>
              <div className="bg-white p-3 rounded-xl rounded-tl-none shadow-sm max-w-[80%]">
                <p className="text-sm text-gray-700">
                  Hi there! 👋 How can we help you today? Ask us anything about our language courses.
                </p>
                <span className="text-xs text-gray-400 mt-1 block">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
            
            {/* Add more messages here if needed */}
          </div>
          
          {/* Chat Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1A2A44]/30 focus:border-[#1A2A44] text-sm placeholder-gray-400"
                  placeholder="Type your message..."
                />
                <button 
                  type="button" 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#777777]"
                >
                  <Smile className="h-5 w-5" />
                </button>
              </div>
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#1A2A44] flex items-center justify-center text-white hover:bg-[#263b5e] transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
      
      {/* Chat Button */}
      <button 
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full bg-[#1A2A44] flex items-center justify-center text-white shadow-lg hover:bg-[#263b5e] transition-all duration-300 ${
          isScrolled ? 'shadow-xl hover:shadow-2xl transform hover:scale-105' : ''
        } ${isChatOpen ? 'bg-[#263b5e]' : ''}`}
        aria-label="Chat with us"
      >
        {isChatOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
