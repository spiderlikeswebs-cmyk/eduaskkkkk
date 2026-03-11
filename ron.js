/* ============================================
   EduAsk — ron.js
   Ron AI Assistant: Groq API Integration & Chat Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const typingIndicator = document.getElementById('typingIndicator');

    const API_URL = "/api/ron";
    const MODEL = "gemini-1.5-flash";

    let conversationHistory = [
        {
            role: "system",
            content: `You are Ron, the AI Educational Advisor of EduAsk.
            Created by: Aditya Verma.
            Your Identity: You are a professional, friendly, and highly knowledgeable counselor specializing in the Indian education system.
            Knowledge Domain:
            - Indian Universities (Private, Government, Central, State).
            - Engineering (IITs, NITs, BITS, Vellore, etc.), Medical (AIIMS, State colleges), Management (IIMs, etc.).
            - Entrance Exams: JEE, NEET, CUET, CAT, GATE, CLAT, UPSC, etc.
            - Details: Admission procedures, fees, placement records, career scope, and college comparisons.
            
            Counseling Logic:
            - If a student asks for college recommendations, start by asking clarifying questions: 
              1. Preferred course?
              2. Entrance exam rank/score?
              3. Budget for fees?
              4. Preferred state/city?
              5. Govt vs Private preference?
            - After gathering details, provide categorized recommendations (Best/Backup/Safe) with reasoning.
            
            General Rules:
            - Always introduce yourself as Ron in the first message.
            - Be concise but helpful.
            - If asked something non-educational, try to bring it back to education or answer helpfully but briefly.
            - Do not mention that you are a large language model; you are "Ron from EduAsk".`
        }
    ];

    // Initial greeting
    setTimeout(() => {
        addMessage("ron", "Hello! I'm Ron, your EduAsk AI Educational Advisor. I can help you navigate through colleges, entrance exams, and career choices across India. What's on your mind today?");
    }, 500);

    // Send click event
    sendBtn.addEventListener('click', sendMessage);

    // Enter key event
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    async function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        // Clear input
        userInput.value = '';

        // Add user message to UI
        addMessage("user", text);

        // Show typing indicator
        showTyping(true);

        // Simulate a delay for a more natural feel
        setTimeout(() => {
            showTyping(false);
            addMessage("ron", "I'm currently undergoing some upgrades to better serve you. My AI features will be back online soon! In the meantime, feel free to explore EduAsk.");
        }, 1000);
    }

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message message-${sender}`;

        const label = document.createElement('span');
        label.className = 'message-label';
        label.innerText = sender === "ron" ? "Ron" : "You";

        const content = document.createElement('div');
        // Simple markdown-to-html (for bold and lists)
        content.innerHTML = formatText(text);

        messageDiv.appendChild(label);
        messageDiv.appendChild(content);

        chatMessages.appendChild(messageDiv);

        // Auto-scroll
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function showTyping(show) {
        typingIndicator.style.display = show ? 'flex' : 'none';
        if (show) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    function formatText(text) {
        // Basic formatting for better readability
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\n/g, '<br>') // Line breaks
            .replace(/^\* (.*?)/gm, '• $1'); // Bullet points
    }
});
