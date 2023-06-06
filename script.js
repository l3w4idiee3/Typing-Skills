const quotes = [
    'Nothing clears up a case so much as stating it to another person.',
    'When you feel like quitting, think about why you started.',
  'The only way to do great work is to love what you do.',
  'Your limitation—it’s only your imagination.',
  'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.',
  'Don’t watch the clock; do what it does. Keep going.',
  'Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.',
  'The future belongs to those who believe in the beauty of their dreams.',
  'The secret to getting ahead is getting started.',
  'The harder you work for something, the greater you’ll feel when you achieve it.',
  'The best way to predict the future is to create it.',
  ];
  
  let words = [];
  let wordIndex = 0;
  let startTime = 0;
  let totalTime = 0;
  let sentenceIndex = 0;
  
  const quoteElement = document.getElementById('quote');
  const messageElement = document.getElementById('message');
  const typedValueElement = document.getElementById('typed-value');
  const startButton = document.getElementById('start');
  const restartButton = document.getElementById('restart');
  const restButton = document.getElementById('rest');
  const timeTableBody = document.getElementById('timeTableBody');
  
  function startGame() {
    sentenceIndex = 0;
    totalTime = 0;
    startButton.style.display = 'none';
    restartButton.style.display = 'none';
    restButton.style.display = 'none';
    showSentence();
  }
  
  function showSentence() {
    const quote = quotes[sentenceIndex];
    words = quote.split(' ');
    wordIndex = 0;
    quoteElement.innerHTML = '';
    for (const word of words) {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      quoteElement.appendChild(span);
    }
    quoteElement.childNodes[wordIndex].className = 'highlight';
    typedValueElement.value = '';
    typedValueElement.focus();
    startTime = Date.now();
  }
  
  function goToNextSentence() {
    sentenceIndex++;
    if (sentenceIndex < quotes.length) {
      showSentence();
    } else {
      showTotalTime();
      restartButton.style.display = 'inline-block';
      restButton.style.display = 'inline-block';
    }
  }
  
  typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value;
  
    if (typedValue === currentWord && wordIndex === words.length - 1) {
      const elapsedTime = Date.now() - startTime;
      const sentenceTime = elapsedTime / 1000;
      totalTime += sentenceTime;
      const message = `CONGRATULATIONS! You finished the sentence in ${sentenceTime.toFixed(2)} seconds! 🎉🚀`;
      messageElement.innerText = message;
  
      const newRow = document.createElement('tr');
      newRow.innerHTML = `<td>${quoteElement.innerText.trim()}</td><td>${sentenceTime.toFixed(2)}</td>`;
      timeTableBody.appendChild(newRow);
  
      goToNextSentence();
    } else if (typedValue.endsWith(' ') && typedValue.trim() === currentWord) {
      typedValueElement.value = '';
      wordIndex++;
      for (const wordElement of quoteElement.childNodes) {
        wordElement.className = '';
      }
      quoteElement.childNodes[wordIndex].className = 'highlight';
    } else if (currentWord.startsWith(typedValue)) {
      typedValueElement.className = '';
    } else {
      typedValueElement.className = 'error';
    }
  });
  
  startButton.addEventListener('click', startGame);
  restartButton.addEventListener('click', startGame);
  restButton.addEventListener('click', () => {
    messageElement.innerText = `You took a rest. Keep up the good work! 💪😊`;
  });
  
  function showTotalTime() {
    const message = `You finished all the sentences in ${totalTime.toFixed(2)} seconds! Great speed! 🚀🔥`;
    messageElement.innerText = message;
  }
  
  function calculateTotalTime() {
    const totalTimeElement = document.getElementById('totalTime');
    const totalSeconds = totalTime / 1000;
    const message = `Total time for all sentences: ${totalSeconds.toFixed(2)} seconds`;
    totalTimeElement.innerText = message;
  }
  
  restartButton.addEventListener('click', () => {
    timeTableBody.innerHTML = '';
    calculateTotalTime();
    startGame();
  });
  
  restButton.addEventListener('click', () => {
    messageElement.innerText = `You took a rest. Keep up the good work! 💪😊`;
    calculateTotalTime();
  });
  
  if (sentenceIndex === quotes.length) {
    calculateTotalTime();
    restartButton.style.display = 'inline-block';
    restButton.style.display = 'inline-block';
  }
  