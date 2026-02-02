
async function send() {
  const input = document.getElementById("input");
  const chat = document.getElementById("chat");

  const message = input.value;
  chat.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";

  const res = await fetch("/api/ask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  chat.innerHTML += `<p><b>casper.ai:</b> ${data.reply}</p>`;
  chat.scrollTop = chat.scrollHeight;
}
