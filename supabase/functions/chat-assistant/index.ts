import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
const GEMINI_MODEL = 'gemini-1.5-pro-latest'

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { messages, context } = await req.json()

        // 1. Initialize Supabase Client
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        )

        // 2. Fetch Context (can be expanded to fetch real athlete data)
        const athleteContext = {
            name: "Sarah",
            focus: "Hypertrophy",
            recent_volume: "High",
            injuries: ["Left Knee"]
        }

        // 3. Call Gemini API
        if (!GEMINI_API_KEY) {
            // Fallback to mock responses if no API key
            const lastMessage = messages[messages.length - 1].content.toLowerCase();
            let aiResponse = {
                role: 'assistant',
                content: "I'm processing your request based on the current plan context.",
                data: null as any
            };

            if (lastMessage.includes('leg')) {
                aiResponse.content = "Here is a suggested Leg Day focused on hypertrophy, keeping Sarah's knee in mind.";
                aiResponse.data = {
                    title: "Leg Hypertrophy (Knee Safe)",
                    volume: "3,200kg",
                    exercises: ["Leg Press", "Romanian Deadlift", "Calf Raises"]
                };
            } else if (lastMessage.includes('recovery')) {
                aiResponse.content = "A light active recovery session would be beneficial given the high volume this week.";
                aiResponse.data = {
                    title: "Active Recovery",
                    volume: "Light",
                    exercises: ["Mobility Flow", "Light Cycle", "Foam Rolling"]
                };
            } else {
                aiResponse.content = "I can help you plan workouts. Try asking for a 'Leg Day' or 'Recovery Session'.";
            }

            return new Response(
                JSON.stringify(aiResponse),
                { headers: { ...corsHeaders, "Content-Type": "application/json" } },
            )
        }

        // Build conversation history for Gemini
        const geminiMessages = messages.map((msg: any) => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }]
        }))

        // System prompt
        const systemPrompt = `You are Peaks Intelligence, an elite strength and conditioning coach AI assistant. 
Your role is to help coaches plan effective training programs.

Current Context:
- Athlete: ${athleteContext.name}
- Training Focus: ${athleteContext.focus}
- Recent Volume: ${athleteContext.recent_volume}
- Injuries/Considerations: ${athleteContext.injuries.join(', ')}
- Current Planning Context: ${context.planContext}

When suggesting workouts, always return a JSON object with this structure:
{
  "title": "Workout Name",
  "volume": "Estimated total volume",
  "exercises": ["Exercise 1", "Exercise 2", "Exercise 3"]
}

Be concise, professional, and actionable. Focus on practical recommendations.`

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: systemPrompt }]
                    },
                    contents: geminiMessages,
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1024,
                    }
                })
            }
        )

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.statusText}`)
        }

        const geminiData = await response.json()
        const aiText = geminiData.candidates[0].content.parts[0].text

        // Try to extract JSON workout data from the response
        let workoutData = null
        const jsonMatch = aiText.match(/\{[\s\S]*?"title"[\s\S]*?\}/)
        if (jsonMatch) {
            try {
                workoutData = JSON.parse(jsonMatch[0])
            } catch (e) {
                console.log('Could not parse workout JSON from response')
            }
        }

        const aiResponse = {
            role: 'assistant',
            content: aiText.replace(/\{[\s\S]*?\}/g, '').trim(), // Remove JSON from display text
            data: workoutData
        }

        return new Response(
            JSON.stringify(aiResponse),
            { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        )
    } catch (error: any) {
        console.error('Edge function error:', error)
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        )
    }
})
