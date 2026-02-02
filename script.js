
import { think } from "./brain.js";

const chat = document.getElementById("chat");
const input = document.getElementById("input");

function bubble(text, cls) {
  const div = document.createElement("div");
  div.className = "bubble " + cls;
  div.textContent = text;
  chat.appendChild(div);
}

window.send = function() {
  const msg = input.value;
  if (!msg) return;
  bubble(msg, "user");
  bubble(think(msg), "ai");
  input.value = "";
  chat.scrollTop = chat.scrollHeight;
}
