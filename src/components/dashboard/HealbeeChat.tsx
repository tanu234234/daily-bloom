import { useState, useRef, useEffect } from 'react';
import { useWellness } from '@/context/WellnessContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_QUESTIONS = [
  "Why should I drink water in the morning?",
  "Can I replace today's breakfast?",
  "What if I miss my workout?",
  "How do cheat days work?",
  "Tips for staying motivated?"
];

export function HealbeeChat() {
  const { userProfile, dailyRoutine, isSubscribed, trialDaysLeft } = useWellness();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hey ${userProfile?.name || 'friend'}! 🐝 I'm Healbee, your wellness buddy! Ask me anything about your routine, diet, or wellness journey. I'm here to help you buzz through your goals! 🍯`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build context about user's current state
      const context = {
        userName: userProfile?.name,
        goal: userProfile?.goal,
        activityLevel: userProfile?.activityLevel,
        wakeUpTime: dailyRoutine?.wakeUpTime,
        bedTime: dailyRoutine?.bedTime,
        waterIntake: dailyRoutine?.waterIntake,
        workoutName: dailyRoutine?.workout.name,
        workoutDuration: dailyRoutine?.workout.duration
      };

      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/healbee-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          userMessage: messageText,
          context
        })
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Rate limited. Please try again in a moment.');
        }
        if (response.status === 402) {
          throw new Error('Service temporarily unavailable.');
        }
        throw new Error('Failed to get response');
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: ''
      };
      setMessages(prev => [...prev, assistantMessage]);

      if (reader) {
        let textBuffer = '';
        
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          textBuffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
            let line = textBuffer.slice(0, newlineIndex);
            textBuffer = textBuffer.slice(newlineIndex + 1);

            if (line.endsWith('\r')) line = line.slice(0, -1);
            if (line.startsWith(':') || line.trim() === '') continue;
            if (!line.startsWith('data: ')) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === '[DONE]') break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantContent += content;
                setMessages(prev => 
                  prev.map(m => 
                    m.id === assistantMessage.id 
                      ? { ...m, content: assistantContent }
                      : m
                  )
                );
              }
            } catch {
              // JSON parsing failed, keep buffer for next chunk
              textBuffer = line + '\n' + textBuffer;
              break;
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Oops! 🐝 I'm having trouble connecting right now. Please try again in a moment!"
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Check if chat is available (during trial or subscribed)
  const isChatAvailable = isSubscribed || trialDaysLeft > 0;

  if (!isChatAvailable) {
    return (
      <div className="healbee-card text-center py-12">
        <div className="w-20 h-20 mx-auto gradient-bee rounded-full flex items-center justify-center mb-4 opacity-50">
          <span className="text-4xl">🐝</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Chat Locked</h3>
        <p className="text-muted-foreground mb-4">
          Subscribe to Healbee to unlock the chat feature and get personalized wellness advice!
        </p>
        <Button className="gradient-primary text-primary-foreground rounded-xl">
          Unlock Chat
        </Button>
      </div>
    );
  }

  return (
    <div className="healbee-card p-0 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/50 bg-gradient-to-r from-honey-light/50 to-peach/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-bee rounded-full flex items-center justify-center animate-bounce-soft">
            <span className="text-lg">🐝</span>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Healbee Chat</h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 bg-mint-dark rounded-full animate-pulse"></span>
              Your wellness guide is here!
            </p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="h-[400px] p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 gradient-bee rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                  <span className="text-sm">🐝</span>
                </div>
              )}
              <div
                className={`$
                  {message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}
                `}
              >
                {message.role === 'assistant' ? (
                  <div className="prose prose-sm max-w-none text-foreground">
                    <ReactMarkdown>{message.content || '...'}</ReactMarkdown>
                  </div>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </div>
          ))}
          {isLoading && messages[messages.length - 1]?.role === 'user' && (
            <div className="flex justify-start">
              <div className="w-8 h-8 gradient-bee rounded-full flex items-center justify-center mr-2">
                <span className="text-sm">🐝</span>
              </div>
              <div className="chat-bubble-bot">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Questions */}
      {messages.length <= 2 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_QUESTIONS.slice(0, 3).map((q, i) => (
              <button
                key={i}
                onClick={() => sendMessage(q)}
                className="text-xs bg-muted/50 hover:bg-muted px-3 py-1.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Healbee anything..."
            className="flex-1 rounded-xl bg-muted/50 border-0"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim() || isLoading}
            className="rounded-xl gradient-primary text-primary-foreground w-12"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
