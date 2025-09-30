// Force navigation to index.html when clicking CV Navigation
document.querySelector('.navbrand').addEventListener('click', function(e){
  e.preventDefault(); // prevent default link behavior
  window.location.href = 'index.html'; // force navigation to index.html
});

// Highlight active page in navbar
(function(){
  const links = document.querySelectorAll('.nav-desktop a'); // use your navbar class
  const path = window.location.pathname.split('/').pop();
  links.forEach(a => {
    if(a.getAttribute('href') === path || (path === '' && a.getAttribute('href') === 'index.html')){
      a.classList.add('active');
      a.style.fontWeight = '700';
    }
  });
})();

// Quiz logic
document.addEventListener('DOMContentLoaded', () => {
  const submit = document.getElementById('submitQuiz');
  if(submit){
    submit.addEventListener('click', () => {
      const qs = document.querySelectorAll('#quiz .q');
      let correct = 0, total = qs.length;
      qs.forEach(q => {
        const ans = q.dataset.answer;
        const chosen = q.querySelector('input[type="radio"]:checked');
        if(chosen && chosen.value === ans) correct++;
      });
      const result = document.getElementById('result');
      result.innerHTML = `<p>You scored ${correct} / ${total}. (This quiz is for practice only.)</p>`;
    });
  }
});
