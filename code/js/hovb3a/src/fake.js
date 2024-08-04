
export function generateFakeText(wordCount) {
    const words = "Lorem ipsum dolor sit amet consectetur adipiscing elit".split(" ");
    let text = "";
    for (let i = 0; i < wordCount; i++) {
      text += words[Math.floor(Math.random() * words.length)] + " ";
    }
    return text.trim() + ".";
  }
  
export function generateFakeDateTime() {
    const start = new Date(1900, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString();
  }
  
export function generateFakeEmail() {
    const domains = ["gmail.com", "yandex.com", "mail.ru", "rambler.ru", "yahoo.com"];
    const username = generateFakeUsername();
    const domain = domains[Math.floor(Math.random() * domains.length)];
    return `${username}@${domain}`;
  }
  
export function generateFakeUsername() {
    const names = "abcdefghijklmnopqrstuvwxyz0123456789_";
    let username = "";
    for (let i = 0; i < 8; i++) {
      username += names[Math.floor(Math.random() * names.length)];
    }
    return username;
  }
  
export function generateFakePassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
  }
  
export function generateFakePhone() {
    const num = () => Math.floor(Math.random() * 10);
    return `+(${num()}${num()}${num()})${num()}${num()}${num()}-${num()}${num()}${num()}${num()}`;
  }
  
export function generateFakeAddress() {
    const streets = ["Main St", "Second St", "Third St"];
    const cities = ["Springfield", "Riverside", "Greenville"];
    const states = ["CA", "TX", "NY"];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const state = states[Math.floor(Math.random() * states.length)];
    const zip = Math.floor(10000 + Math.random() * 90000);
    return `${Math.floor(Math.random() * 999)} ${street}, ${city}, ${state} ${zip}`;
  }
  