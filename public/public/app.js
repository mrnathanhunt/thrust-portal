import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://mtbuzhpnkmorunblmppa.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10YnV6aHBua21vcnVuYmxtcHBhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxNDM2NzksImV4cCI6MjA3MTcxOTY3OX0.sM-mtNLPdPx1ZBcwYQB7XlkaCCiL2ZeK2geZOrwBZ68"; 
const supabase = createClient(supabaseUrl, supabaseKey);

const authDiv = document.getElementById("auth");
const dashboardDiv = document.getElementById("dashboard");
const alertsList = document.getElementById("alerts");

document.getElementById("signup").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let { error } = await supabase.auth.signUp({ email, password });
  if (error) alert(error.message);
  else alert("✅ Signed up, check your email!");
});

document.getElementById("login").addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  let { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
  else showDashboard();
});

document.getElementById("logout").addEventListener("click", async () => {
  await supabase.auth.signOut();
  authDiv.style.display = "block";
  dashboardDiv.style.display = "none";
});

async function showDashboard() {
  authDiv.style.display = "none";
  dashboardDiv.style.display = "block";

  const { data: alerts, error } = await supabase
    .from("alerts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    alertsList.innerHTML = `<li>⚠️ Error loading alerts: ${error.message}</li>`;
  } else {
    alertsList.innerHTML = alerts.map(a => `<li>${a.message}</li>`).join("");
  }
}
