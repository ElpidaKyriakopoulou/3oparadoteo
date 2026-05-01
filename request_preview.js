const request = JSON.parse(localStorage.getItem("selectedRequest"));

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
  if (status === "Προς Έγκριση") return "badge-pending";
  if (status === "Εγκρίθηκε") return "badge-approved";
  if (status === "Απορρίφθηκε") return "badge-rejected";
  return "badge-pending";
}

function renderStatus() {
  statusBadge.textContent = request.status;
  statusBadge.className = "badge " + getBadgeClass(request.status);
}

function changeStatus(newStatus) {
  request.status = newStatus;
  localStorage.setItem("selectedRequest", JSON.stringify(request));
  renderStatus();
}

function notifyOrganization() {
  const comment = document.getElementById("comment").value;

  alert(
    "Ο οργανισμός ενημερώθηκε για το νέο status: " +
    request.status +
    "\n\nΣχόλιο: " +
    comment
  );
}

renderStatus();