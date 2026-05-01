let type = null;
let chips = [];

function selectType(el, t){
  document.querySelectorAll('.type-card')
    .forEach(e => e.classList.remove('selected'));

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

function submitForm(){
  document.getElementById('success')
    .classList.add('show');
}