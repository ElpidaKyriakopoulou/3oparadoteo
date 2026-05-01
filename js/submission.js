let selectedPostType = null;

function selectPostType(type) {
    // 1. Οπτική αλλαγή στα κουμπιά
    document.getElementById('postEvent').classList.remove('selected');
    document.getElementById('postJob').classList.remove('selected');

    const eventSection = document.getElementById('eventFields');
    const jobSection = document.getElementById('jobFields');
    const commonSection = document.getElementById('commonDescription');

    // 2. Εμφάνιση των σωστών πεδίων και της περιγραφής
    if (type === 'event') {
        document.getElementById('postEvent').classList.add('selected');
        eventSection.style.display = 'block';
        jobSection.style.display = 'none';
    } else {
        document.getElementById('postJob').classList.add('selected');
        eventSection.style.display = 'none';
        jobSection.style.display = 'block';
    }

    // Εμφανίζουμε το υπόλοιπο της φόρμας μόλις γίνει η πρώτη επιλογή
    commonSection.style.display = 'block';
    selectedPostType = type;
}

function submitForm() {
    // Εμφάνιση μηνύματος επιτυχίας[cite: 15]
    document.getElementById('successMsg').classList.add('show');
    // Κρύβουμε τα κουμπιά υποβολής
    document.querySelector('.d-flex.gap-3').style.display = 'none';
}

function saveDraft() {
    alert("Το προσχέδιο αποθηκεύτηκε επιτυχώς στα 'Πρόχειρα'!");
}