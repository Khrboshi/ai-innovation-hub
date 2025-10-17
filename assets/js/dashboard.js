// Local demo chat logic. Stores messages in localStorage for demo purposes.
// Replace queryAssistant() in ai-assistant.js with real API call.

document.addEventListener('DOMContentLoaded', () => {
  const chatLogs = document.getElementById('chat-logs');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  let messages = JSON.parse(localStorage.getItem('ai_hub_chat') || '[]');

  function render() {
    chatLogs.innerHTML = '';
    messages.forEach(m => {
      const el = document.createElement('div');
      el.className = 'message';
      el.innerHTML = `<div class="meta"><strong>${m.from}</strong> <small class="muted">${m.time}</small></div><div class="text">${m.text}</div>`;
      chatLogs.appendChild(el);
    });
    chatLogs.scrollTop = chatLogs.scrollHeight;
  }

  async function sendMessage(text) {
    const time = new Date().toLocaleTimeString();
    messages.push({from: 'You', text, time});
    render();
    localStorage.setItem('ai_hub_chat', JSON.stringify(messages));

    // Get assistant reply
    const reply = await window.queryAssistant ? window.queryAssistant(text) : `Echo: ${text}`;
    messages.push({from: 'AI Assistant', text: await Promise.resolve(reply), time: new Date().toLocaleTimeString()});
    render();
    localStorage.setItem('ai_hub_chat', JSON.stringify(messages));
  }

  if (chatForm) {
    chatForm.addEventListener('submit', e => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      sendMessage(text);
      chatInput.value = '';
    });
  }
  render();
});
