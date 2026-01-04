import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Loader2,
  Sprout,
  TrendingUp,
  Bug,
  Cloud
} from 'lucide-react';
import { ChatMessage } from '@/types/farmer';

const QUICK_PROMPTS = [
  { icon: Sprout, text: 'Best crops for this season?' },
  { icon: Bug, text: 'How to control pests in rice?' },
  { icon: TrendingUp, text: 'Market trend for cotton' },
  { icon: Cloud, text: 'Weather advisory for sowing' },
];

// Simulated AI responses
const AI_RESPONSES: Record<string, string> = {
  'default': `Namaste! I'm your Krishi Sakshi AI assistant. I can help you with:

🌾 **Crop Selection** - Best crops based on your soil and season
🐛 **Pest Control** - Identifying and managing crop diseases
💧 **Irrigation** - Water management tips
📈 **Market Prices** - Current rates and trends
📋 **Government Schemes** - PM-KISAN, crop insurance, and more

How can I help you today?`,
  
  'season': `Based on the current season (Rabi), here are the best crops for Karnataka:

🌾 **Recommended Crops:**
1. **Wheat** - Sow in October-November, harvest in March-April
2. **Chickpea (Chana)** - Low water requirement, good market demand
3. **Mustard** - Short duration, good for intercropping
4. **Barley** - Hardy crop, tolerates poor soil

💡 **Tips:**
- Ensure proper soil preparation before sowing
- Use certified seeds for better germination
- Consider crop rotation to maintain soil health

Would you like specific guidance on any of these crops?`,

  'pest': `Here are effective pest control methods for rice:

🐛 **Common Pests & Solutions:**

**1. Stem Borer**
- Install pheromone traps
- Use Trichogramma parasites
- Apply Carbofuran granules

**2. Brown Plant Hopper**
- Avoid excess nitrogen fertilizer
- Maintain proper spacing
- Use neem-based sprays

**3. Leaf Folder**
- Remove affected leaves
- Spray Monocrotophos (1ml/L)

🌿 **Organic Alternatives:**
- Neem oil spray (5ml/L water)
- Garlic-chili extract
- Encourage natural predators

⚠️ Always follow safety guidelines when using pesticides!`,

  'market': `Current market trends for cotton (December 2024):

📈 **Price Analysis:**
- Current Modal Price: ₹7,000/quintal
- 30-day trend: ⬆️ +5.2%
- Yearly comparison: ⬆️ +12%

🏪 **Best Markets in Karnataka:**
1. Raichur - ₹7,200/q (highest)
2. Hubli - ₹7,050/q
3. Belgaum - ₹6,900/q

💡 **Recommendations:**
- Good time to sell if you have stock
- MSP for 2024-25: ₹7,020/quintal
- Consider waiting if quality is premium grade

📊 Export demand is strong this year due to global supply constraints.`,

  'weather': `Weather Advisory for Karnataka (January 2025):

🌡️ **Current Conditions:**
- Temperature: 18-28°C (Normal)
- Humidity: 45-60%
- Expected Rainfall: Light to moderate

🌾 **Sowing Recommendations:**
- ✅ Good time for Rabi crop sowing
- ✅ Soil moisture adequate
- ⚠️ Watch for cold waves in North Karnataka

📅 **Next 7 Days:**
- Days 1-3: Clear skies, good for field work
- Days 4-5: Light showers expected
- Days 6-7: Cloudy with mild temperatures

💧 **Irrigation Tips:**
- Reduce frequency due to expected rain
- Focus on drainage in low-lying areas`,
};

export default function Assistant() {
  const { profile } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send initial greeting
  useEffect(() => {
    const greeting: ChatMessage = {
      id: '1',
      role: 'assistant',
      content: AI_RESPONSES['default'],
      timestamp: new Date(),
    };
    setMessages([greeting]);
  }, []);

  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('season') || msg.includes('crop') || msg.includes('best') || msg.includes('sow')) {
      return AI_RESPONSES['season'];
    }
    if (msg.includes('pest') || msg.includes('disease') || msg.includes('insect') || msg.includes('control')) {
      return AI_RESPONSES['pest'];
    }
    if (msg.includes('market') || msg.includes('price') || msg.includes('rate') || msg.includes('cotton') || msg.includes('trend')) {
      return AI_RESPONSES['market'];
    }
    if (msg.includes('weather') || msg.includes('rain') || msg.includes('forecast') || msg.includes('climate')) {
      return AI_RESPONSES['weather'];
    }
    
    return `Thank you for your question about "${userMessage}". 

As your farming assistant, I can provide guidance on:
- Crop selection and planning
- Pest and disease management
- Market prices and trends
- Government schemes and subsidies
- Weather advisories

Please try asking about any of these topics, and I'll provide detailed information to help with your farming decisions.

🌱 Happy Farming!`;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1000));

    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: getAIResponse(userMessage.content),
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiResponse]);
  };

  const handleQuickPrompt = (text: string) => {
    setInput(text);
  };

  return (
    <div className="min-h-screen bg-background pt-20 pb-4">
      <div className="container mx-auto px-4 max-w-4xl h-[calc(100vh-6rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4 flex-shrink-0">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
            <MessageSquare className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Assistant</h1>
            <p className="text-sm text-muted-foreground">Get farming guidance in your language</p>
          </div>
          <div className="ml-auto flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-accent" />
            <span>Powered by AI</span>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 glass-card rounded-2xl flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-primary/20' 
                    : 'gradient-primary'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-5 h-5 text-primary" />
                  ) : (
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  )}
                </div>
                <div className={`max-w-[80%] ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-4 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-none'
                      : 'bg-muted text-foreground rounded-tl-none'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 px-2">
                    {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-none p-4">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground mb-3">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {QUICK_PROMPTS.map((prompt) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={prompt.text}
                      onClick={() => handleQuickPrompt(prompt.text)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 hover:bg-muted text-sm text-foreground transition-colors"
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      {prompt.text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-3">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask about crops, pests, market prices, schemes..."
                className="flex-1 h-12"
                disabled={isTyping}
              />
              <Button 
                variant="hero" 
                size="icon" 
                className="h-12 w-12"
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
              >
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-3">
              AI responses are for guidance only. Consult local experts for critical decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
