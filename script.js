const chatForm = document.querySelector('.chat-form');
const chatBody = document.querySelector('.chat-body');

function addMessage(message, sender) {
    if (chatBody) {
      const messageContainer = document.createElement('div');
      const messageText = document.createElement('p');
      messageText.innerText = message;
      messageContainer.appendChild(messageText);
      messageContainer.classList.add('chat-message');
  
      if (sender === 'user') {
        messageContainer.classList.add('user-message');
      } else {
        messageContainer.classList.add('chatbot-message');
      }
  
      chatBody.appendChild(messageContainer);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }
  
  //Responds user with default responses
  const getResponse = (message) => {
    const responses = [
      "I'm sorry, I didn't understand. Can you please rephrase?",
      "I'm not sure what you mean. Can you please provide more information?",
      "I'm a dietician chatbot. How can I assist you with your diet?",
      "That's a great question!",
      "Hmm, let me think about that...",
      "Interesting! Can you tell me more?",
      "I'm not programmed to answer that, but I'd love to chat about something else.",
      "Let's talk about something more fun! Do you have any hobbies?",
      "I'm feeling chatty today! How about you?",
      "I'm not sure I have an answer for that, but I'm always up for a good conversation."
    ];
  
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    return response;
  }
  
// GPT3.5 generated response
const getOpenAIResponse = async (prompt) => {
  const response = await fetch('https://api.openai.com/v1/engines/gpt-3.5-turbo/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: "\n",
    })
  });
  const data = await response.json();
  const aiResponse = data.choices[0].text.trim();
  return aiResponse;
}

const handleSubmit = async (event) => {
  event.preventDefault();
  const messageInput = document.querySelector('.chat-form__input');
  const message = messageInput.value.trim();
  messageInput.value = '';

  if (message !== '') {
    addMessage(message, 'user');
    try {
      const aiResponse = await getOpenAIResponse(message);
      addMessage(aiResponse, 'ai');
    } catch (error) {
      console.log(error);
      const response = getResponse(message);
      addMessage(response, 'ai');
    }
  }
}

chatForm.addEventListener('submit', handleSubmit);
