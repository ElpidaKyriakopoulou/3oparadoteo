const proposals = JSON.parse(localStorage.getItem("proposals")) || [];
const selectedRequestId = Number(localStorage.getItem("selectedRequestId"));

const request = proposals.find(p => p.id === selectedRequestId);

if (!request) {
  alert("Δεν βρέθηκε αίτημα.");
  window.location.href = "kentriki_html.html";
}

document.getElementById("companyName").textContent = request.company;
document.getElementById("requestType").textContent = request.type;
document.getElementById("requestDate").textContent = request.date;
document.getElementById("requestEmail").textContent = request.email;
document.getElementById("requestDescription").textContent = request.description;

function createStatus() {
  const status = document.getElementById("initialStatus").value;
  const comment = document.getElementById("initialComment").value;

  if (!status) {
    alert("Πρέπει να επιλέξεις αρχικό status.");
    return;
  }

  request.status = status;
  request.statusComment = comment;

  localStorage.setItem("proposals", JSON.stringify(proposals));

  alert("Το status δημιουργήθηκε επιτυχώς.");
  window.location.href = "kentriki_html.html";
}