const formElement = document.getElementById(`myForm`);
const usernameElement = document.getElementById(`username`);
const countryElement = document.getElementById(`country`);
const messageElement = document.getElementById(`message`);
const messageTextElement = document.getElementById(`message-text`);
const messagesElement = document.getElementById(`messages`);

formElement.addEventListener("submit", async (event) => {
  // stop the website to reload
  event.preventDefault();

  // Collect data from form
  const username = usernameElement.value;
  const country = countryElement.value;
  const message = messageElement.value;

  // Send to backend with AJAX call
  const req = await fetch("/ajaxmessage", {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      username,
      country,
      message,
    }),
  });

  // Get data from the await fetch promise
  const messages = await req.json();
  // show the hidden reponse element
  messagesElement.style.display = "block";
  // Return all messages as a response to the page
  messageTextElement.innerHTML = messages;
});
