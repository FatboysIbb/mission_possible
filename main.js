
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
let currentUser = null;

async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Bitte Benutzername und Passwort eingeben.");
    return;
  }

  let { data, error } = await client.auth.signInWithPassword({
    email: username + "@example.com",
    password: password
  });

  if (error && error.message.includes("Invalid login credentials")) {
    // Registrieren
    ({ data, error } = await client.auth.signUp({
      email: username + "@example.com",
      password: password
    }));
  }

  if (error) {
    alert("Fehler beim Login: " + error.message);
    return;
  }

  currentUser = username;
  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";
  document.getElementById("player-name").textContent = currentUser;

  getMissions();
}

async function getMissions() {
  const missions = [
    "Überrede jemanden, dir ein Getränk zu bringen.",
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

  const list = document.getElementById("missions");
  list.innerHTML = "";

  const selected = missions.sort(() => 0.5 - Math.random()).slice(0, 3);
  selected.forEach(m => {
    const li = document.createElement("li");
    li.textContent = m;
    list.appendChild(li);
  });
}
