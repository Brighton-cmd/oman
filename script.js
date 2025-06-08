const startPage = document.getElementById('startPage');
    const gamePage = document.getElementById('gamePage');
    const rewardsPage = document.getElementById('rewardsPage');
    const startGameBtn = document.getElementById('startGameBtn');
    const backToStartBtn = document.getElementById('backToStart');
    const skipToRewardsBtn = document.getElementById('skipToRewards'); // Reference to the new button

    const game = document.getElementById('game');
    const result = document.getElementById('result');
    const nextLevelBtn = document.getElementById('nextLevel');
    const restartBtn = document.getElementById('restart');
    const quitBtn = document.getElementById('quit');
    const giftSection = document.getElementById('giftSection');
    const gifts = document.getElementById('gifts');
    const congratsMessage = document.getElementById('congratsMessage');
    const playAgainBtn = document.getElementById('playAgain');

    let matches = 0;
    let currentLevel = 1;
    const levelRanges = [20, 30, 40];
    const emojis = [
      "🐯 You are greater than you think",
      "🍎 You will get healthier",
      "🚁 You will board an aeroplane soon",
      "💰 Cash bag reward for you",
      "🍿 Buy yourself something amazing",
      "🏯 You will settle in a mansion",
      "🎀 You got a Red bowtie",
      "👑 You can be the greatest very soon",
      "🎁 You will receive as many gift in your life",
      "🌟 Shine bright like a star",
      "🚀 Ready to launch your dreams",
      "🌈 A rainbow of opportunities"
    ];

    function createSlots(level) {
      game.innerHTML = '';
      for (let i = 1; i <= levelRanges[level - 1]; i++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        slot.dataset.number = i;
        slot.addEventListener('dragover', dragOver);
        slot.addEventListener('drop', drop);
        game.appendChild(slot);
      }
    }

    function createNumbers(level) {
      const numbers = [];
      const max = levelRanges[level - 1];
      for (let i = 1; i <= max; i++) {
        numbers.push(i);
      }

      // Shuffle numbers
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }

      numbers.forEach(num => {
        const numberDiv = document.createElement('div');
        numberDiv.className = 'number';
        numberDiv.draggable = true;
        numberDiv.textContent = num;
        numberDiv.dataset.number = num;
        numberDiv.addEventListener('dragstart', dragStart);
        numberDiv.addEventListener('dragend', dragEnd);
        game.appendChild(numberDiv);
      });
    }

    function dragStart(e) {
      e.dataTransfer.setData('text/plain', e.target.dataset.number);
      e.target.classList.add('dragging');
    }

    function dragEnd(e) {
      e.target.classList.remove('dragging');
    }

    function dragOver(e) {
      e.preventDefault();
    }

    function drop(e) {
      e.preventDefault();
      const droppedNumber = e.dataTransfer.getData('text/plain');
      const slotNumber = e.currentTarget.dataset.number;

      if (!e.currentTarget.textContent) {
        if (parseInt(droppedNumber) === parseInt(slotNumber)) {
          // Append the dragged number div into the slot
          const draggedElem = document.querySelector(`.number[data-number='${droppedNumber}']`);
          if (draggedElem) {
            e.currentTarget.appendChild(draggedElem);
            draggedElem.draggable = false;
            draggedElem.style.cursor = 'default';
            matches++;
            result.textContent = `Matches: ${matches} / ${levelRanges[currentLevel - 1]}`;
            checkLevelComplete();
          }
        } else {
          alert('😫Wrong Number or Wrong slot😫 please press okey to restart level🥹😭😭🤧Keep trying please 🤸');
          restartLevel();
        }
      }
    }

    function checkLevelComplete() {
      if (matches === levelRanges[currentLevel - 1]) {
        if (currentLevel < 3) {
          nextLevelBtn.style.display = 'inline-block';
          result.textContent += ' - 💥🎉Congratulations!!  💥🎊Level complete ✅🎁click the next level.';
        } else {
          // All levels complete, show gift section
          showGifts();
        }
      }
    }

    function restartLevel() {
      matches = 0;
      result.textContent = '';
      nextLevelBtn.style.display = 'none';
      giftSection.style.display = 'none';
      createGame(currentLevel);
    }

    function createGame(level) {
      game.innerHTML = '';
      createSlots(level);
      createNumbers(level);
      result.textContent = Matches; 0 / $ ;{levelRanges[level - 1]};
      nextLevelBtn.style.display = 'none';
      giftSection.style.display = 'none';
      matches = 0;
    }

    function showGifts() {
      gamePage.style.display = 'none';
      rewardsPage.style.display = 'block';
      giftSection.style.display = 'block';
      gifts.innerHTML = '';
      congratsMessage.textContent = '';
      playAgainBtn.style.display = 'none';

      // Change the loop to create 12 gift boxes
      for (let i = 0; i < 12; i++) {
        const giftBox = document.createElement('div');
        giftBox.className = 'gift-box';
        giftBox.dataset.index = i;
        giftBox.addEventListener('click', openGift);
        gifts.appendChild(giftBox);
      }
    }

    function openGift(e) {
      const giftBox = e.currentTarget;
      if (giftBox.classList.contains('opened')) return;

      const index = parseInt(giftBox.dataset.index);
      const message = emojis[index] || "You got a gift!";

      giftBox.classList.add('opened');
      giftBox.textContent = '🎉';
      congratsMessage.textContent = message;

      // Show Play Again button after opening a gift
      playAgainBtn.style.display = 'inline-block';

      // Disable other gift boxes
      const allGifts = gifts.querySelectorAll('.gift-box');
      allGifts.forEach(box => {
        box.removeEventListener('click', openGift);
      });
    }

    startGameBtn.addEventListener('click', () => {
      startPage.style.display = 'none';
      gamePage.style.display = 'block';
      currentLevel = 1;
      createGame(currentLevel);
    });

    backToStartBtn.addEventListener('click', () => {
      gamePage.style.display = 'none';
      rewardsPage.style.display = 'none';
      startPage.style.display = 'flex';
      giftSection.style.display = 'none';
      result.textContent = '';
      nextLevelBtn.style.display = 'none';
      playAgainBtn.style.display = 'none';
    });

    ('click', () => {
      currentLevel = 3; // Set to the last level
      showGifts(); // Show the rewards page directly
    });

    nextLevelBtn.addEventListener('click', () => {
      currentLevel++;
      createGame(currentLevel);
      nextLevelBtn.style.display = 'none';
    });

    restartBtn.addEventListener('click', () => {
      createGame(currentLevel);
      nextLevelBtn.style.display = 'none';
    });

    quitBtn.addEventListener('click', () => {
      currentLevel = 1;
      createGame(currentLevel);
      nextLevelBtn.style.display = 'none';
    });

    playAgainBtn.addEventListener('click', () => {
      currentLevel = 1; // Reset to the first level
      gamePage.style.display = 'none'; // Hide the rewards page
      rewardsPage.style.display = 'none'; // Hide the rewards page
      startPage.style.display = 'flex'; // Show the start page
      createGame(currentLevel); // Create the game for the first level
      playAgainBtn.style.display = 'none'; // Hide the play again button
      result.textContent = ''; // Reset the result text
      nextLevelBtn.style.display = 'none'; // Hide the next level button
    });