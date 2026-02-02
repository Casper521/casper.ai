
import knowledge from "./knowledge.json" assert { type: "json" };

let memory = [];
let mode = "normal";

const personalities = {
  normal: "I am helpful and calm.",
  fun: "I am playful 😄",
  serious: "I am formal and precise."
};

export function think(input) {
  memory.push(input);
  input = input.toLowerCase();

  if (input.startsWith("/help")) {
    return "Commands: /help /about /mode normal|fun|serious";
  }

  if (input.startsWith("/about")) {
    return "casper.ai v2 – no API, no VPN.";
  }

  if (input.startsWith("/mode")) {
    const m = input.split(" ")[1];
    if (personalities[m]) {
      mode = m;
      return "Mode set to " + m;
    }
    return "Unknown mode.";
  }

  if (/^[0-9+\-*/(). ]+$/.test(input)) {
    try { return "Result: " + eval(input); } catch {}
  }

  for (const key in knowledge) {
    if (input.includes(key)) {
      return knowledge[key];
    }
  }

  if (memory.length > 3) {
    return "Earlier you said: " + memory[memory.length-2];
  }

  return personalities[mode];
}
