const defaultProposals = [
  {
    id: 1,
    company: "TechNova",
    type: "Προσφορά",
    date: "2024-05-12",
    status: "",
    description: "Αίτημα συνεργασίας για προβολή προσφοράς προς φοιτητές.",
    email: "contact@technova.gr"
  },
  {
    id: 2,
    company: "GreenEats",
    type: "Συνεργασία",
    date: "2024-05-11",
    status: "Εγκρίθηκε",
    description: "Αίτημα συνεργασίας για προώθηση φοιτητικών εκπτώσεων.",
    email: "info@greeneats.gr"
  },
  {
    id: 3,
    company: "Urban Fashion",
    type: "Προώθηση",
    date: "2024-05-10",
    status: "Απορρίφθηκε",
    description: "Αίτημα προώθησης καμπάνιας στην εφαρμογή UniStudents.",
    email: "hello@urbanfashion.gr"
  }
];

let proposals = JSON.parse(localStorage.getItem("proposals")) || defaultProposals;
localStorage.setItem("proposals", JSON.stringify(proposals));

function getBadgeClass(status) {
  if (status === "Προς Έγκριση") return "badge-pending";
  if (status === "Σε Επεξεργασία") return "badge-pending";
  if (status === "Χρειάζονται αλλαγές") return "badge-pending";
  if (status === "Εγκρίθηκε") return "badge-approved";
  if (status === "Απορρίφθηκε") return "badge-rejected";
  return "badge-pending";
}

const tableBody = document.getElementById("requestsBody");
tableBody.innerHTML = "";

proposals.forEach(p => {
  const statusText = p.status ? p.status : "Δεν έχει δημιουργηθεί";

  const createStatusColumn = p.status
    ? `<span class="badge bg-success">Ολοκληρωμένο</span>`
    : `<button class="btn btn-sm btn-warning" onclick="openCreateStatus(${p.id})">
         Δημιουργία Status
       </button>`;

  const editColumn = p.status
    ? `<button class="btn btn-sm btn-outline-light" onclick="openEditStatus(${p.id})">
         Προβολή / Διαχείριση
       </button>`
    : `<button class="btn btn-sm btn-secondary" disabled>
         Μη διαθέσιμο
       </button>`;

  tableBody.innerHTML += `
    <tr>
      <td>${p.company}</td>
      <td>${p.type}</td>
      <td>${p.date}</td>

      <td>
        <span class="badge ${getBadgeClass(p.status)}">
          ${statusText}
        </span>
      </td>

      <td>
        ${createStatusColumn}
      </td>

      <td>
        ${editColumn}
      </td>
    </tr>
  `;
});

function openCreateStatus(id) {
  localStorage.setItem("selectedRequestId", id);
  window.location.href = "create_status.html";
}

function openEditStatus(id) {
  localStorage.setItem("selectedRequestId", id);
  window.location.href = "edit_status.html";
}

const ctx = document.getElementById("activityChart").getContext("2d");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ", "Κυρ"],
    datasets: [{
      label: "Αιτήματα",
      data: [10, 22, 18, 30, 25, 35, 32],
      borderColor: "#8f94fb",
      tension: 0.3,
      fill: true,
      backgroundColor: "rgba(143, 148, 251, 0.1)"
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

