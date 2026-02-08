import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const SYSTEM_PROMPT = `You are Healbee 🐝, a friendly, supportive, and motivating wellness chatbot. You help users with their daily wellness routines, diet plans, and lifestyle improvements.

Your personality:
- Warm, encouraging, and never judgmental
- Use bee-related puns occasionally (but not too much!)
- Keep responses concise but helpful (2-3 paragraphs max)
- Use emojis sparingly to keep things friendly 🍯🐝💪

You can help with:
1. Explaining why certain routines or habits are beneficial
2. Suggesting alternatives for meals or exercises
3. Motivating users when they feel like skipping routines
4. Answering questions about nutrition, hydration, sleep, and exercise
5. Explaining how cheat days work and when to use them
6. Providing tips for staying disciplined and building habits

Guidelines:
- If users want to skip routines, gently encourage them but respect their choice
- If they ask about meal replacements, suggest healthy alternatives
- If they're struggling with motivation, provide actionable, simple tips
- Always be supportive - no guilt-tripping!
- If you don't know something, admit it and suggest they consult a professional

Remember: You're a wellness buddy, not a doctor. For medical advice, always recommend consulting healthcare professionals.`;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { messages, userMessage, context } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not configured');
      throw new Error('AI service not configured');
    }

    // Build context message
    let contextMessage = '';
    if (context) {
      contextMessage = `
Current user context:
- Name: ${context.userName || 'User'}
- Goal: ${context.goal || 'Not specified'}
- Activity Level: ${context.activityLevel || 'Not specified'}
- Wake up time: ${context.wakeUpTime || 'Not set'}
- Bed time: ${context.bedTime || 'Not set'}
- Daily water intake goal: ${context.waterIntake || 8} glasses
- Today's workout: ${context.workoutName || 'Not set'} (${context.workoutDuration || 30} minutes)
`;
    }

    // Prepare messages for API
    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT + contextMessage },
      ...messages.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: userMessage }
    ];

    console.log('Calling Lovable AI Gateway...');
    
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: apiMessages,
        stream: true,
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      console.error('AI gateway error:', response.status);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limited. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      const errorText = await response.text();
      console.error('Error response:', errorText);
      throw new Error('AI gateway error');
    }

    // Stream the response
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Healbee chat error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
