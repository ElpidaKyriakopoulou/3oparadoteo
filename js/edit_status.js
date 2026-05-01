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

const statusBadge = document.getElementById("requestStatus");

function getBadgeClass(status) {
  if (status === "Προς Έγκριση") return "bg-warning text-dark";
  if (status === "Σε Επεξεργασία") return "bg-info text-dark";
  if (status === "Χρειάζονται αλλαγές") return "bg-secondary text-white";
  if (status === "Εγκρίθηκε") return "bg-success text-white";
  if (status === "Απορρίφθηκε") return "bg-danger text-white";
  return "bg-secondary text-white";
}

function renderStatus() {
  statusBadge.textContent = request.status || "Δεν έχει δημιουργηθεί";
  statusBadge.className = "badge " + getBadgeClass(request.status);
}

function updateStatus(newStatus) {
  request.status = newStatus;
  localStorage.setItem("proposals", JSON.stringify(proposals));
  renderStatus();
}

function sendUpdate() {
  const comment = document.getElementById("comment").value;

  alert(
    "Ο οργανισμός ενημερώθηκε.\n\nΝέο status: " +
    request.status +
    "\n\nΣχόλιο: " +
    comment
  );

  window.location.href = "kentriki_html.html";
}

renderStatus();