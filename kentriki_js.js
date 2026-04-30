// Δεδομένα αιτημάτων
const proposals = [
    { company: "TechNova", type: "Προσφορά", date: "2024-05-12", status: "Προς Έγκριση" },
    { company: "GreenEats", type: "Συνεργασία", date: "2024-05-11", status: "Εγκρίθηκε" },
    { company: "Urban Fashion", type: "Προώθηση", date: "2024-05-10", status: "Απορρίφθηκε" }
];

// Συνάρτηση για την αντιστοίχιση κλάσης CSS βάσει status
function getBadgeClass(status) {
    if (status === "Προς Έγκριση") return "badge-pending";
    if (status === "Εγκρίθηκε") return "badge-approved";
    return "badge-rejected";
}

// Δυναμική συμπλήρωση του πίνακα
const tableBody = document.getElementById('requestsBody');
proposals.forEach(p => {
    const row = `
        <tr>
            <td class="fw-bold text-info">${p.company}</td>
            <td>${p.type}</td>
            <td>${p.date}</td>
            <td><span class="badge ${getBadgeClass(p.status)}">${p.status}</span></td>
            <td><button class="btn btn-sm btn-outline-light">Προβολή</button></td>
        </tr>
    `;
    tableBody.innerHTML += row;
});

// Δημιουργία διαγράμματος κίνησης
const ctx = document.getElementById('activityChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ', 'Κυρ'],
        datasets: [{
            label: 'Αιτήματα',
            data: [10, 22, 18, 30, 25, 35, 32],
            borderColor: '#8f94fb',
            tension: 0.3,
            fill: true,
            backgroundColor: 'rgba(143, 148, 251, 0.1)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: { grid: { color: '#333' }, ticks: { color: '#999' } },
            x: { grid: { color: '#333' }, ticks: { color: '#999' } }
        }
    }
});