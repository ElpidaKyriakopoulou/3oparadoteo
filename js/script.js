// ==========================================
// 1. ΚΟΙΝΑ ΔΕΔΟΜΕΝΑ & ΒΟΗΘΗΤΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ
// ==========================================

const defaultProposals = [
  {
    id: 1, company: "TechNova", type: "Προσφορά", date: "2024-05-12", status: "",
    description: "Αίτημα συνεργασίας για προβολή προσφοράς προς φοιτητές.", email: "contact@technova.gr"
  },
  {
    id: 2, company: "GreenEats", type: "Συνεργασία", date: "2024-05-11", status: "Εγκρίθηκε",
    description: "Αίτημα συνεργασίας για προώθηση φοιτητικών εκπτώσεων.", email: "info@greeneats.gr"
  },
  {
    id: 3, company: "Urban Fashion", type: "Προώθηση", date: "2024-05-10", status: "Απορρίφθηκε",
    description: "Αίτημα προώθησης καμπάνιας στην εφαρμογή UniStudents.", email: "hello@urbanfashion.gr"
  }
];

// Φόρτωση από το LocalStorage ή χρήση των default
let proposals = JSON.parse(localStorage.getItem("proposals")) || defaultProposals;
localStorage.setItem("proposals", JSON.stringify(proposals));

// Βρίσκουμε το επιλεγμένο αίτημα
const selectedRequestId = Number(localStorage.getItem("selectedRequestId"));
let request = proposals.find(p => p.id === selectedRequestId);

// Κοινή συνάρτηση χρωμάτων για το Status
function getBadgeClass(status) {
  if (status === "Προς Έγκριση") return "bg-warning text-dark";
  if (status === "Σε Επεξεργασία") return "bg-info text-dark";
  if (status === "Χρειάζονται αλλαγές") return "bg-secondary text-white";
  if (status === "Εγκρίθηκε") return "bg-success text-white";
  if (status === "Απορρίφθηκε") return "bg-danger text-white";
  return "bg-secondary text-white";
}

// Κοινή συνάρτηση για να γεμίζει τα στοιχεία του οργανισμού στις σελίδες edit/create
function populateRequestDetails() {
  if (!request) {
    alert("Δεν βρέθηκε αίτημα.");
    window.location.href = "kentriki_html.html";
    return;
  }
  document.getElementById("companyName").textContent = request.company;
  document.getElementById("requestType").textContent = request.type;
  document.getElementById("requestDate").textContent = request.date;
  document.getElementById("requestEmail").textContent = request.email;
  document.getElementById("requestDescription").textContent = request.description;
}


function openCreateStatus(id) {
  localStorage.setItem("selectedRequestId", id);
  window.location.href = "create_status.html";
}

function openEditStatus(id) {
  localStorage.setItem("selectedRequestId", id);
  window.location.href = "edit_status.html";
}

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

function renderStatus() {
  const statusBadge = document.getElementById("requestStatus");
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
  alert("Ο οργανισμός ενημερώθηκε.\n\nΝέο status: " + request.status + "\n\nΣχόλιο: " + comment);
  window.location.href = "kentriki_html.html";
}


let type = null;
let chips = [];

function selectType(el, t){
  document.querySelectorAll('.type-card').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  type = t;
}

function toggleChip(el){
  el.classList.toggle('selected');
  const v = el.innerText;
  if(chips.includes(v)){
    chips = chips.filter(c => c !== v);
  } else {
    chips.push(v);
  }
}

let selectedPostType = null;

function selectPostType(type) {
    document.getElementById('postEvent').classList.remove('selected');
    document.getElementById('postJob').classList.remove('selected');

    const eventSection = document.getElementById('eventFields');
    const jobSection = document.getElementById('jobFields');
    const commonSection = document.getElementById('commonDescription');

    if (type === 'event') {
        document.getElementById('postEvent').classList.add('selected');
        eventSection.style.display = 'block';
        jobSection.style.display = 'none';
    } else {
        document.getElementById('postJob').classList.add('selected');
        eventSection.style.display = 'none';
        jobSection.style.display = 'block';
    }

    commonSection.style.display = 'block';
    selectedPostType = type;
}

function saveDraft() {
    alert("Το προσχέδιο αποθηκεύτηκε επιτυχώς στα 'Πρόχειρα'!");
}

function submitForm(){
  const currentPage = document.body.dataset.page;
  
  if (currentPage === 'profilecreation') {
    document.getElementById('success').classList.add('show');
  } else if (currentPage === 'submission') {
    document.getElementById('successMsg').classList.add('show');
    document.querySelector('.d-flex.gap-3').style.display = 'none';
  }
}



const pageHandlers = {
  
  'kentriki': () => {
    const tableBody = document.getElementById("requestsBody");
    tableBody.innerHTML = "";

    proposals.forEach(p => {
      const statusText = p.status ? p.status : "Δεν έχει δημιουργηθεί";

      const createStatusColumn = p.status
        ? `<span class="badge bg-success">Ολοκληρωμένο</span>`
        : `<button class="btn btn-sm btn-warning" onclick="openCreateStatus(${p.id})">Δημιουργία Status</button>`;

      const editColumn = p.status
        ? `<button class="btn btn-sm btn-outline-light" onclick="openEditStatus(${p.id})">Προβολή / Διαχείριση</button>`
        : `<button class="btn btn-sm btn-secondary" disabled>Μη διαθέσιμο</button>`;

      tableBody.innerHTML += `
        <tr>
          <td>${p.company}</td>
          <td>${p.type}</td>
          <td>${p.date}</td>
          <td><span class="badge ${getBadgeClass(p.status)}">${statusText}</span></td>
          <td>${createStatusColumn}</td>
          <td>${editColumn}</td>
        </tr>
      `;
    });

    // 2. Δημιουργία Γραφήματος
    const ctx = document.getElementById("activityChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ", "Κυρ"],
        datasets: [{
          label: "Αιτήματα",
          data: [10, 22, 18, 30, 25, 35, 32],
          borderColor: "#8f94fb", tension: 0.3, fill: true, backgroundColor: "rgba(143, 148, 251, 0.1)"
        }]
      },
      options: { responsive: true, maintainAspectRatio: false }
    });
  },

  'create_status': () => {
    populateRequestDetails();
  },

  'edit_status': () => {
    populateRequestDetails();
    renderStatus();
  },

  'profilecreation': () => {
    
  },

  'submission': () => {

  }
};


document.addEventListener("DOMContentLoaded", () => {
  const currentPage = document.body.dataset.page;
  if (currentPage && pageHandlers[currentPage]) {
    pageHandlers[currentPage]();
  }
});