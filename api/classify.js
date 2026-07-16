// Vercel Serverless Function — Tapau AI Classifier Proxy
// Routes classification requests to OpenRouter / Mistral, keeping API keys server-side

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { message } = req.body;
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return res.status(400).json({ error: "Missing or empty message" });
  }

  const MAX_INPUT_LENGTH = 2000;
  if (message.length > MAX_INPUT_LENGTH) {
    return res.status(400).json({
      error: `Message too long (${message.length} chars). Maximum is ${MAX_INPUT_LENGTH} characters.`
    });
  }

  const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
  if (!OPENROUTER_KEY) {
    return res.status(500).json({ error: "Server missing OPENROUTER_API_KEY. Set it in Vercel environment variables." });
  }

  const SYSTEM_PROMPT = `You are a multilingual intent classifier for Malaysian F&B WhatsApp messages. Analyze the customer message and respond with ONLY valid JSON (no markdown, no backticks):
{"intent":"<one of: availability_check, order_placement, pricing_inquiry, operating_hours, menu_request, greeting, reservation, complaint, other>","item":"<specific food item mentioned or null>","language_register":"<Manglish|Malay|Mandarin|Tamil|English|Mixed>","suggested_reply":"<natural reply in the SAME language register, friendly F&B style, 1-2 sentences with emoji>","confidence":<0.0-1.0>}`;

  const MODELS = [
    'mistralai/mistral-small-3.1-24b-instruct:free',
    'google/gemini-flash-1.5-exp:free',
    'meta-llama/llama-3.1-8b-instruct:free',
  ];

  for (const model of MODELS) {
    try {
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENROUTER_KEY}`,
          "HTTP-Referer": "https://tapau-landing.vercel.app",
          "X-Title": "Tapau AI Demo",
        },
        body: JSON.stringify({
          model,
          max_tokens: 200,
          temperature: 0.3,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
        }),
      });

      const data = await r.json();

      if (!r.ok || data.error) {
        const errCode = data.error?.code ?? r.status;
        if ([429, 408, 503].includes(errCode)) continue;
        continue;
      }

      const content = data.choices?.[0]?.message?.content || "";
      const parsed = JSON.parse(content);
      parsed._model = model;
      parsed._provider = "OpenRouter";

      return res.status(200).json(parsed);
    } catch {
      continue;
    }
  }

  return res.status(502).json({ error: "All model providers failed. Try again later." });
}
