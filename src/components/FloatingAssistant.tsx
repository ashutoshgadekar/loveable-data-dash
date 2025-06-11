
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const FloatingAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    {
      type: 'assistant',
      message: 'Hi! I\'m your Loveable AI assistant. How can I help you analyze your data today?'
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    setConversation(prev => [...prev, { type: 'user', message }]);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! Based on your query, I recommend using a bar chart to visualize the class distribution.",
        "Try filtering by gender or school for more detailed insights into your student data.",
        "You might want to compare performance metrics across different subjects or grade levels.",
        "Consider analyzing attendance patterns by month to identify trends in student engagement.",
        "That's an interesting analysis! Have you thought about breaking this down by demographic factors?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setConversation(prev => [...prev, { type: 'assistant', message: randomResponse }]);
    }, 1000);

    setMessage('');
  };

  return (
    <>
      {/* Floating Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gray-100 hover:bg-gray-50 text-gray-800 border-0 shadow-neumorphic hover:shadow-neumorphic-hover transition-all duration-200 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/20 flex items-end justify-end p-6 z-50">
          <Card className="w-96 h-[500px] bg-gray-100 border-0 shadow-neumorphic flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-100 rounded-full shadow-neumorphic-inset flex items-center justify-center mr-3">
                  <MessageCircle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Loveable Assistant</h3>
                  <p className="text-xs text-gray-600">Data Analysis Helper</p>
                </div>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="sm"
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {conversation.map((msg, index) => (
                <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-100 shadow-neumorphic-inset text-gray-800' 
                      : 'bg-gray-50 shadow-neumorphic-inset text-gray-700'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Textarea
                  placeholder="Ask me about your data..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                  className="flex-1 min-h-[40px] max-h-[80px] bg-gray-100 border-0 shadow-neumorphic-inset focus:shadow-neumorphic-inset-focus resize-none text-sm"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!message.trim()}
                  className="bg-gray-100 hover:bg-gray-50 text-gray-800 border-0 shadow-neumorphic hover:shadow-neumorphic-hover"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default FloatingAssistant;
