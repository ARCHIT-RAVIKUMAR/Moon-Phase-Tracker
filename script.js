const todayContainer = document.getElementById("today");
const next7Container = document.getElementById("next7");

const phaseEmojis = {
  "New Moon": "🌑",
  "Waxing Crescent": "🌒",
  "First Quarter": "🌓",
  "Waxing Gibbous": "🌔",
  "Full Moon": "🌕",
  "Waning Gibbous": "🌖",
  "Last Quarter": "🌗",
  "Waning Crescent": "🌘"
};

async function fetchMoonPhase(date) {
  const timestamp = Math.floor(new Date(date).getTime() / 1000);
  const response = await fetch(`https://api.farmsense.net/v1/moonphases/?d=${timestamp}`);
  const data = await response.json();
  return data[0].Phase;
}

async function showToday() {
  const today = new Date().toISOString().split("T")[0];
  const phase = await fetchMoonPhase(today);
  todayContainer.innerHTML = `
    <div class="moon-card">
      <div style="font-size: 48px;">${phaseEmojis[phase] || "❓"}</div>
      <div class="moon-label">${phase}</div>
    </div>
  `;
}

async function showNext7Days() {
  next7Container.innerHTML = "";
  for (let i = 1; i <= 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const isoDate = date.toISOString().split("T")[0];
    const phase = await fetchMoonPhase(isoDate);

    const card = document.createElement("div");
    card.className = "moon-card";
    card.innerHTML = `
      <div>${isoDate}</div>
      <div style="font-size: 36px;">${phaseEmojis[phase] || "❓"}</div>
      <div class="moon-label">${phase}</div>
    `;
    next7Container.appendChild(card);
  }
}

showToday();
