

function createChip(value) {
  const chip = document.createElement('span');
  chip.className = 'badge bg-primary me-1 mb-1';
  chip.textContent = value;
  chip.style.opacity = '0';
  chip.style.transform = 'scale(0.8)';
  return chip;
}


function animateChip(chip) {
  setTimeout(() => {
    chip.style.transition = 'all 0.3s ease';
    chip.style.opacity = '1';
    chip.style.transform = 'scale(1)';
  }, 10);
}


async function runLoop(start, end, step, filter, resultElement, delay = 100) {
  resultElement.innerHTML = '';
  
  const shouldInclude = (num) => {
    if (filter === 'odd') return num % 2 !== 0;
    if (filter === 'even') return num % 2 === 0;
    if (filter === 'mul5') return num % 5 === 0;
    return true;
  };
  

  const isIncreasing = step > 0;
  
  for (let i = start; isIncreasing ? i <= end : i >= end; i += step) {
    if (shouldInclude(i)) {
      const chip = createChip(i);
      resultElement.appendChild(chip);
      animateChip(chip);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('#cards .card');
  
  
  const card1 = cards[0];
  const card1Run = card1.querySelector('.btn-primary');
  const card1Reset = card1.querySelector('.btn-outline-secondary');
  const card1Result = card1.querySelector('.result-row');
  
  card1Run.addEventListener('click', () => {
    runLoop(1, 15, 1, 'none', card1Result);
  });
  card1Reset.addEventListener('click', () => {
    card1Result.innerHTML = '';
  });
  
  
  const card2 = cards[1];
  const card2Run = card2.querySelector('.btn-primary');
  const card2Reset = card2.querySelector('.btn-outline-secondary');
  const card2Result = card2.querySelector('.result-row');
  
  card2Run.addEventListener('click', () => {
    runLoop(15, 1, -1, 'none', card2Result);
  });
  card2Reset.addEventListener('click', () => {
    card2Result.innerHTML = '';
  });
  
  
  const card3 = cards[2];
  const card3Run = card3.querySelector('.btn-primary');
  const card3Reset = card3.querySelector('.btn-outline-secondary');
  const card3Result = card3.querySelector('.result-row');
  
  card3Run.addEventListener('click', () => {
    runLoop(1, 30, 1, 'odd', card3Result);
  });
  card3Reset.addEventListener('click', () => {
    card3Result.innerHTML = '';
  });
  

  const card4 = cards[3];
  const card4Run = card4.querySelector('.btn-primary');
  const card4Reset = card4.querySelector('.btn-outline-secondary');
  const card4Result = card4.querySelector('.result-row');
  
  card4Run.addEventListener('click', () => {
    runLoop(30, 0, -5, 'mul5', card4Result);
  });
  card4Reset.addEventListener('click', () => {
    card4Result.innerHTML = '';
  });
  
 
  const card5 = cards[4];
  const card5Run = card5.querySelector('.btn-primary');
  const card5Reset = card5.querySelector('.btn-outline-secondary');
  const card5Result = card5.querySelector('.result-row');
  
  card5Run.addEventListener('click', () => {
    runLoop(-50, 50, 5, 'none', card5Result, 50);
  });
  card5Reset.addEventListener('click', () => {
    card5Result.innerHTML = '';
  });
  
 
  const card6 = cards[5];
  const card6Run = card6.querySelector('.btn-primary');
  const card6Reset = card6.querySelector('.btn-outline-secondary');
  const card6Result = card6.querySelector('.result-row');
  
  card6Run.addEventListener('click', () => {
    runLoop(-50, 50, 2, 'even', card6Result, 50);
  });
  card6Reset.addEventListener('click', () => {
    card6Result.innerHTML = '';
  });
  
  
  const pgRun = document.getElementById('pg-run');
  const pgReset = document.getElementById('pg-reset');
  const pgStart = document.getElementById('pg-start');
  const pgEnd = document.getElementById('pg-end');
  const pgStep = document.getElementById('pg-step');
  const pgFilter = document.getElementById('pg-filter');
  const pgRow = document.getElementById('pg-row');
  
  pgRun.addEventListener('click', () => {
    const start = parseInt(pgStart.value);
    const end = parseInt(pgEnd.value);
    const step = parseInt(pgStep.value);
    const filter = pgFilter.value;
    
    if (isNaN(start) || isNaN(end) || isNaN(step) || step === 0) {
      pgRow.innerHTML = '<span class="text-danger">Please enter valid numbers. Step cannot be 0.</span>';
      return;
    }
    
    runLoop(start, end, step, filter, pgRow);
  });
  
  pgReset.addEventListener('click', () => {
    pgRow.innerHTML = '';
  });
});
