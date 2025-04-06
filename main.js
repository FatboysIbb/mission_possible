
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentUser = null;
let currentPoints = 0;

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Bitte fülle alle Felder aus.");
    return;
  }

  const { data: users } = await client
    .from("players")
    .select("*")
    .eq("username", username)
    .limit(1);

  if (users.length > 0) {
    const user = users[0];
    if (user.password !== password) {
      alert("Falsches Passwort.");
      return;
    }
    currentUser = user;
  } else {
    const { data, error } = await client.from("players").insert([{
      username,
      password,
      points: 0
    }]);
    if (error) {
      alert("Fehler bei Registrierung: " + error.message);
      return;
    }
    currentUser = { username, points: 0 };
  }

  document.getElementById("login-area").style.display = "none";
  document.getElementById("mission-area").style.display = "block";
  document.getElementById("player-name").textContent = currentUser.username;
  document.getElementById("score").textContent = currentUser.points;

  loadMissions();
}

function loadMissions() {
  const missions = [
    "Erzähle dreimal dieselbe Geschichte – mit unterschiedlichen Enden.",
    "Bring jemanden dazu, dir seine Socken zu zeigen.",
    "Streue ein Gerücht, dass jemand heute eine geheime Rolle hat.",
    "Erfinde ein Spiel und bring andere dazu, mitzuspielen.",
    "Tausche heimlich dein Getränk mit jemand anderem.",
    "Fordere jemanden zum Armdrücken heraus – und verliere absichtlich.",
    "Sag 30 Minuten lang kein einziges Mal das Wort 'Bier'.",
    "Bring zwei Leute dazu, sich zu streiten – spiel dann den Schlichter.",
    "Tanze mindestens 10 Sekunden bei laufender Musik.",
    "Gib dich 5 Minuten lang für jemand anderen aus.",
    "Schaffe es, dass dir jemand ein Kompliment macht.",
    "Iss etwas mit den Fingern, obwohl Besteck vorhanden ist.",
    "Erzähle jemandem ein 'Geheimnis', das komplett erfunden ist."
  ];

  const selected = missions.sort(() => 0.5 - Math.random()).slice(0, 3);
  const list = document.getElementById("missions");
  list.innerHTML = "";
  selected.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    list.appendChild(li);
  });
}
