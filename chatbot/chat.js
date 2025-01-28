const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChatbot = document.getElementById('closeChatbot');
const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');


const API_KEY = 'YOUR_GOOGLE_API_KEY'; // Replace with your actual API key
const CSE_ID = 'YOUR_CSE_ID'; // Replace with your actual Custom Search Engine ID

async function getGoogleSearchResults(query) {
  const url = `https://www.googleapis.com/customsearch/v1?q=${query}&key=${API_KEY}&cx=${CSE_ID}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.items) {
      const firstResult = data.items[0];
      return firstResult.snippet; // or use firstResult.title or firstResult.link
    } else {
      return "Sorry, I couldn't find any relevant information on that.";
    }
  } catch (error) {
    console.error("Error fetching Google Search results:", error);
    return "Sorry, I couldn't fetch information at the moment.";
  }
}


const responses = {
  greetings: [
    "Hello! How can I assist you today?",
    "Hi there! What can I do for you?",
    "Greetings! Feel free to ask your question.",
  ],
  default: "I'm sorry, I can only answer questions related to electric vehicles and internal combustion engine vehicles. Could you rephrase or ask about EVs and ICE vehicles?",
};

chatbotToggle.addEventListener('click', () => {
  chatbotContainer.classList.add('show');
  chatbotContainer.classList.remove('hidden');
});
closeChatbot.addEventListener('click', () => {
  chatbotContainer.classList.add('hidden');
  chatbotContainer.classList.remove('show');
});
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage === '') return;

  addMessage(userMessage, 'user-message');
  const botResponse = generateResponse(userMessage);
  setTimeout(() => addMessage(botResponse, 'bot-message'), 500);
  userInput.value = '';
}

function addMessage(text, className) {
  const message = document.createElement('div');
  message.className = className;
  message.innerHTML = `<p>${text}</p>`;
  chatBox.appendChild(message);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateResponse(input) {
  input = input.toLowerCase();

  // Handle greetings
  if (["hi", "hello", "hey", "greetings"].some((greeting) => input.includes(greeting))) {
    return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
  }

  // Search for EVs or ICEVs information
  if (input.includes('electric vehicle') || input.includes('ev')) {
    return getGoogleSearchResults("Electric vehicles");
  }

  if (input.includes('internal combustion engine') || input.includes('icev')) {
    return getGoogleSearchResults("Internal combustion engine vehicles");
  }

  // Default response
  return responses.default;
}

async function sendMessage() {
  const userMessage = userInput.value.trim();
  if (userMessage === '') return;

  addMessage(userMessage, 'user-message');
  const botResponse = await generateResponse(userMessage); // Await async function
  setTimeout(() => addMessage(botResponse, 'bot-message'), 500);
  userInput.value = '';
}