/* ============================================
   SECOND MONTHSARY WEBSITE - MAIN JAVASCRIPT
   ============================================ */

// ========== CONFIGURATION & CONSTANTS ==========

const CONFIG = {
  // Date when the relationship started (customize this)
  RELATIONSHIP_START: new Date('2026-03-09'),
  // Messages and romantic content
  ROMANTIC_MESSAGES: [
    '❤️ Every moment with you is precious',
    '💜 You make my heart skip a beat',
    '💖 Forever grateful for you',
    '✨ You are my favorite person',
    '🌹 Love finds you at the right time',
    '💕 With you, I found my home',
    '🦋 You complete my world',
    '⭐ You are worth every moment',
  ],
  // Game data
  GUESS_WORDS: [
    { word: 'LOVE', clue: 'What I feel for you every day' },
    { word: 'HEART', clue: 'What you have stolen' },
    { word: 'FOREVER', clue: 'How long I want to be with you' },
    { word: 'SMILE', clue: 'What you always make me do' },
    { word: 'DREAM', clue: 'You are my biggest...' },
    { word: 'SPECIAL', clue: 'You are so...' },
    { word: 'KISSES', clue: 'Sweet moments we share' },
    { word: 'MEMORIES', clue: 'What we create together' },
  ],
  QUIZ_QUESTIONS: [
    { q: 'What is my favorite color?', correct: 'Red', options: ['Red', 'Purple', 'Blue', 'Green'] },
    { q: 'What do I love most about you?', correct: 'Her smile', options: ['Her smile', 'Her laugh', 'Her heart', 'All of the above'] },
    { q: 'Where would I like to travel with you?', correct: 'Anywhere with her', options: ['Anywhere with her', 'Beach', 'Mountains', 'City'] },
    { q: 'How many times do I think about you daily?', correct: 'Most of the day', options: ['Most of the day', 'A few times', 'Many times', 'All the time'] },
    { q: 'What is our favorite activity together?', correct: 'Cuddles', options: ['Cuddles', 'Movies', 'Talking', 'Being together'] },
  ],
  REASONS_TO_LOVE: [
    'Your infectious smile that lights up any room',
    'The way you listen so carefully to every word I say',
    'Your kind heart and compassion for others',
    'The sound of your laugh is my favorite melody',
    'Your creativity and unique perspective on life',
    'How you make me feel when you look at me',
    'Your strength and determination inspire me',
    'The comfort of your presence',
    'Your loyalty and dedication',
    'Every moment is better when you are there',
  ],
  FAVORITE_THINGS: [
    { emoji: '🎬', title: 'Movie Nights', desc: 'Cuddled up watching our favorite films' },
    { emoji: '☕', title: 'Coffee Dates', desc: 'Endless conversations over warm coffee' },
    { emoji: '🌙', title: 'Stargazing', desc: 'Counting stars and making wishes together' },
    { emoji: '🎵', title: 'Our Song', desc: 'The melody that reminds me of you' },
    { emoji: '🍕', title: 'Late Night Pizza', desc: 'Best moments are with you at midnight' },
    { emoji: '💃', title: 'Dancing', desc: 'Moving to our rhythm together' },
  ],
  LOVE_WHEEL_OPTIONS: [
    '💕 Give me a kiss',
    '🤗 Hug me for 10 seconds',
    '😊 Tell me your favorite memory',
    '🌟 Compliment my best quality',
    '🎵 Sing our song to me',
    '✍️ Write me a small note',
    '🤭 Tell me a funny secret',
    '🎁 Promise me something special',
  ],
  SPECIAL_LETTER: `My dearest Love,

As I sit down to write this, my heart is overflowing with emotions that words can barely capture. In these two months with you, I've discovered what it truly means to love someone deeply and unconditionally.

Every morning, I wake up grateful for you. Every moment with you feels like a beautiful dream I'm afraid to wake up from. The way you make me laugh, the comfort in your presence, the warmth of your hand in mine – these are the moments that make life beautiful.

You have brought so much light and color into my life. You make me want to be a better version of myself. With you, I don't just have a partner; I have my best friend, my comfort, my home.

I love everything about you – your smile that melts my heart, your kindness that inspires me, your strength that supports me, and most importantly, the love you give me every single day.

Thank you for choosing me. Thank you for every laugh, every tear, and every moment in between. I can't wait for our journey ahead.

Forever yours with all my heart,
💜🌹✨`,
};

// ========== GLOBAL VARIABLES ==========

let currentCarouselIndex = 0;
let musicEnabled = true;  // Auto-play enabled by default
let gameState = {
  score: 0,
  gamesPlayed: 0,
};
let backgroundMusic = null;
let isLoggedIn = false;  // Track login status

// ========== DOM MANIPULATION HELPERS ==========

const DOM = {
  // Get element by ID
  get: (id) => document.getElementById(id),
  // Query selector
  query: (selector) => document.querySelector(selector),
  // Query all
  queryAll: (selector) => document.querySelectorAll(selector),
  // Create element
  create: (tag, className = '', content = '') => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (content) el.innerHTML = content;
    return el;
  },
  // Add event listener
  on: (element, event, handler) => {
    if (element) element.addEventListener(event, handler);
  },
  // Add event listener with touch support (works on mobile & desktop)
  onTouchOrClick: (element, handler) => {
    if (element) {
      element.addEventListener('click', handler, { passive: false });
      element.addEventListener('touchend', (e) => {
        // Don't prevent default - let navigation happen
        handler(e);
      }, { passive: true });
    }
  },
  // Toggle class
  toggleClass: (element, className) => {
    if (element) element.classList.toggle(className);
  },
  // Add class
  addClass: (element, className) => {
    if (element) element.classList.add(className);
  },
  // Remove class
  removeClass: (element, className) => {
    if (element) element.classList.remove(className);
  },
  // Set text
  setText: (element, text) => {
    if (element) element.textContent = text;
  },
  // Set HTML
  setHTML: (element, html) => {
    if (element) element.innerHTML = html;
  },
};

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', () => {
  console.log('🎉 Second Monthsary Website Loaded!');
  
  // Check if already logged in (use both session and local storage)
  const sessionLogin = sessionStorage.getItem('loveWebsiteLogin') || localStorage.getItem('loveWebsiteLogin');
  if (sessionLogin === 'true') {
    handleLoginSuccess();
  } else {
    // Show login panel on first load
    const loginPanel = document.getElementById('loginPanel');
    if (loginPanel) {
      loginPanel.classList.remove('hidden');
      const usernameInput = document.getElementById('username');
      if (usernameInput) usernameInput.focus();
      // Allow Enter key to submit on password field
      const passwordInput = document.getElementById('password');
      if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') handleLogin();
        });
      }
    }
  }
  
  // Update counters every minute
  setInterval(updateAllCounters, 60000);
});

// ========== LOGIN SYSTEM ==========
function handleLogin() {
  const username = document.getElementById('username')?.value.trim() || '';
  const password = document.getElementById('password')?.value.trim() || '';
  
  // Validate credentials
  if (username === 'Alex' && password === 'Biaca') {
    // Store in both session and local storage for persistence
    sessionStorage.setItem('loveWebsiteLogin', 'true');
    localStorage.setItem('loveWebsiteLogin', 'true');
    handleLoginSuccess();
  } else {
    alert('❌ Invalid credentials. Please try again or click the hint button!');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('username').focus();
  }
}

function handleLoginSuccess() {
  isLoggedIn = true;
  
  // Hide login panel
  const loginPanel = document.getElementById('loginPanel');
  if (loginPanel) {
    loginPanel.classList.add('hidden');
  }
  
  // Initialize all page features
  initializePageLoader();
  initializeNavigation();
  initializeMusic();
  initializeFloatingHearts();
  initializeScrollAnimations();
  initializeCounters();
  initializeCarousel();
  initializeSecretMessage();
  initializeGameButtons();
  updateAllCounters();
  
  // Start music autoplay immediately after login
  if (musicEnabled) {
    playBackgroundMusic();
    updateMusicToggle();
  }
}

function toggleHint() {
  const hintBox = document.getElementById('hintBox');
  if (hintBox) {
    hintBox.classList.toggle('hidden');
  }
}

// ========== PAGE LOADER ==========

function initializePageLoader() {
  const loader = DOM.query('.page-loader');
  if (loader) {
    setTimeout(() => {
      DOM.addClass(loader, 'hidden');
    }, 1300);
  }
}

// ========== NAVIGATION ==========

function initializeNavigation() {
  const mobileToggle = DOM.query('.mobile-menu-toggle');
  const navLinks = DOM.query('.nav-links');
  const navLinksElements = DOM.queryAll('.nav-links a');
  const logo = DOM.query('.logo');

  if (mobileToggle && navLinks) {
    // Menu toggle for mobile - click event (primary)
    mobileToggle.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navLinks.classList.toggle('active');
    }, false);
    
    // Touch event (fallback for Android)
    mobileToggle.addEventListener('touchstart', (e) => {
      e.preventDefault();
    }, { passive: false });
    
    mobileToggle.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      navLinks.classList.toggle('active');
    }, { passive: false });
  }

  // Close mobile menu when link clicked
  navLinksElements.forEach(link => {
    // Click event handler - allow default navigation
    link.addEventListener('click', (e) => {
      // Don't prevent default - let navigation happen
      setTimeout(() => {
        navLinks.classList.remove('active');
      }, 50);
    }, false);
    
    // Touch event for Android - try touchstart instead of touchend
    link.addEventListener('touchstart', (e) => {
      // Don't prevent default
    }, { passive: true });
    
    link.addEventListener('touchend', (e) => {
      // Don't prevent default - let navigation happen
      setTimeout(() => {
        navLinks.classList.remove('active');
      }, 50);
    }, { passive: true });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove('active');
      }
    }
  }, { passive: true });

  // Scroll spy - highlight current section
  window.addEventListener('scroll', () => {
    const sections = DOM.queryAll('section, .special-letter-section');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinksElements.forEach(link => {
          DOM.removeClass(link, 'active');
          const href = link.getAttribute('href');
          if (href === '#' + section.id) {
            DOM.addClass(link, 'active');
          }
        });
      }
    });
  });

  // Logo click scroll to top
  if (logo) {
    DOM.on(logo, 'click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// ========== MUSIC MANAGEMENT ==========

function initializeMusic() {
  const musicToggle = DOM.query('.music-toggle');
  
  if (musicToggle) {
    DOM.on(musicToggle, 'click', () => {
      musicEnabled = !musicEnabled;
      updateMusicToggle();
      
      if (musicEnabled) {
        playBackgroundMusic();
        showNotification('🎵 Music enabled');
      } else {
        pauseBackgroundMusic();
        showNotification('🔇 Music disabled');
      }
    });
  }
}

function playBackgroundMusic() {
  // Create audio element if it doesn't exist
  if (!backgroundMusic) {
    backgroundMusic = DOM.create('audio');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;
    backgroundMusic.src = 'assets/music/romantic.mp3';
    backgroundMusic.autoplay = true;
    backgroundMusic.muted = true; // Start muted to bypass browser restrictions
    document.body.appendChild(backgroundMusic);
    
    // Start playing immediately (muted)
    backgroundMusic.play().catch(() => {
      console.log('Initial muted play started');
    });
    
    // Unmute after 800ms to allow autoplay to work
    setTimeout(() => {
      if (backgroundMusic && musicEnabled) {
        backgroundMusic.muted = false;
      }
    }, 800);
    
    // Resume playback when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden && backgroundMusic && musicEnabled && backgroundMusic.paused) {
        backgroundMusic.play().catch(() => {
          console.log('Resume play failed');
        });
      }
    });
  } else if (backgroundMusic.paused) {
    backgroundMusic.play().catch(() => {
      console.log('Music playback failed - user interaction may be needed');
    });
  }
}

function pauseBackgroundMusic() {
  if (backgroundMusic && !backgroundMusic.paused) {
    backgroundMusic.pause();
  }
}

function updateMusicToggle() {
  const musicToggle = DOM.query('.music-toggle');
  if (musicToggle) {
    DOM.setText(musicToggle, musicEnabled ? '🔊' : '🔇');
  }
}

// Auto-update music toggle on all pages
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateMusicToggle);
} else {
  updateMusicToggle();
}

// ========== FLOATING HEARTS ==========

function initializeFloatingHearts() {
  const heartContainer = document.body;
  
  // Create floating hearts periodically
  setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance each interval
      const heart = DOM.create('div', 'floating-heart', '❤️');
      heart.style.left = Math.random() * 100 + 'vw';
      const duration = 5 + Math.random() * 3; // 5-8 seconds
      heart.style.animationDuration = duration + 's';
      heart.style.animationDelay = Math.random() * 0.5 + 's';
      
      heartContainer.appendChild(heart);
      
      setTimeout(() => {
        heart.remove();
      }, (duration + 0.5) * 1000);
    }
  }, 2000);
}

// ========== SCROLL ANIMATIONS ==========

function initializeScrollAnimations() {
  // Create Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        DOM.addClass(entry.target, 'animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation data attributes
  DOM.queryAll('[data-animate]').forEach(el => {
    observer.observe(el);
  });
}

// ========== COUNTER LOGIC ==========

function calculateTimeTogetherparts() {
  const start = CONFIG.RELATIONSHIP_START;
  const now = new Date();
  const diff = now - start;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
}

function updateAllCounters() {
  const { days, hours, minutes } = calculateTimeTogetherparts();
  
  const daysCounter = DOM.query('[data-counter="days"]');
  const hoursCounter = DOM.query('[data-counter="hours"]');
  const minutesCounter = DOM.query('[data-counter="minutes"]');

  if (daysCounter) animateCounterUpdate(daysCounter, days);
  if (hoursCounter) animateCounterUpdate(hoursCounter, hours);
  if (minutesCounter) animateCounterUpdate(minutesCounter, minutes);
}

function animateCounterUpdate(element, newValue) {
  const oldValue = parseInt(element.textContent) || 0;
  
  if (oldValue !== newValue) {
    DOM.addClass(element, 'pulse-animation');
    DOM.setText(element, newValue);
    
    setTimeout(() => {
      DOM.removeClass(element, 'pulse-animation');
    }, 600);
  }
}

function initializeCounters() {
  updateAllCounters();
}

// ========== CAROUSEL ==========

function initializeCarousel() {
  const prevBtn = DOM.query('[data-carousel="prev"]');
  const nextBtn = DOM.query('[data-carousel="next"]');

  if (prevBtn) DOM.on(prevBtn, 'click', () => rotateCarousel(-1));
  if (nextBtn) DOM.on(nextBtn, 'click', () => rotateCarousel(1));

  showCarouselItem(0);
}

function rotateCarousel(direction) {
  const items = DOM.queryAll('.carousel-item');
  currentCarouselIndex += direction;

  if (currentCarouselIndex >= items.length) {
    currentCarouselIndex = 0;
  } else if (currentCarouselIndex < 0) {
    currentCarouselIndex = items.length - 1;
  }

  showCarouselItem(currentCarouselIndex);
}

function showCarouselItem(index) {
  const items = DOM.queryAll('.carousel-item');
  items.forEach((item, i) => {
    if (i === index) {
      DOM.removeClass(item, 'hidden');
      item.style.display = '';  // Remove inline style to allow class-based display
    } else {
      DOM.addClass(item, 'hidden');
    }
  });
}

// ========== SECRET MESSAGE ==========

function initializeSecretMessage() {
  const secretBtn = DOM.query('.secret-message-button');
  const popup = DOM.query('.secret-popup');
  const overlay = DOM.query('.popup-overlay');
  const closeBtn = DOM.query('.secret-popup-close');

  if (secretBtn) {
    DOM.on(secretBtn, 'click', showSecretMessage);
  }

  if (closeBtn) {
    DOM.on(closeBtn, 'click', closeSecretMessage);
  }

  if (overlay) {
    DOM.on(overlay, 'click', closeSecretMessage);
  }
}

function showSecretMessage() {
  const popup = DOM.query('.secret-popup');
  const overlay = DOM.query('.popup-overlay');
  
  if (popup && overlay) {
    DOM.addClass(popup, 'active');
    DOM.addClass(overlay, 'active');
    triggerConfetti();
  }
}

function closeSecretMessage() {
  const popup = DOM.query('.secret-popup');
  const overlay = DOM.query('.popup-overlay');
  
  if (popup) DOM.removeClass(popup, 'active');
  if (overlay) DOM.removeClass(overlay, 'active');
}

// ========== CONFETTI EFFECT ==========

function triggerConfetti() {
  const colors = ['#ff1493', '#d946ef', '#a78bfa', '#ec4899'];
  const confettiCount = 50;

  for (let i = 0; i < confettiCount; i++) {
    const confetti = DOM.create('div', 'confetti');
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = Math.random() * 10 + 5 + 'px';
    confetti.style.height = confetti.style.width;
    confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.position = 'fixed';
    confetti.style.pointerEvents = 'none';
    confetti.style.animation = `confetti ${3 + Math.random() * 2}s ease-out forwards`;
    confetti.style.zIndex = '9999';

    document.body.appendChild(confetti);

    setTimeout(() => confetti.remove(), 5000);
  }
}

// ========== GAME BUTTONS ==========

function initializeGameButtons() {
  const path = window.location.pathname.toLowerCase();
  if (path.endsWith('/gamesui.html') || path.endsWith('gamesui.html')) {
    return;
  }

  const gameCards = DOM.queryAll('.game-card');
  
  gameCards.forEach(card => {
    DOM.on(card, 'click', () => {
      const gameType = card.getAttribute('data-game');
      openGameModal(gameType);
    });
  });
}

// ========== GAME MODAL MANAGEMENT ==========

function openGameModal(gameType) {
  const modal = DOM.query('.game-modal');
  const content = DOM.query('.game-modal-content');
  const closeBtn = DOM.query('.game-modal-close');

  if (!modal || !content) return;

  // Generate game content based on type
  let gameContent = '';
  
  switch(gameType) {
    case 'guess-word':
      gameContent = generateGuessWordGame();
      break;
    case 'quiz':
      gameContent = generateLoveQuizGame();
      break;
    case 'memory':
      gameContent = generateMemoryGame();
      break;
    case 'questions':
      gameContent = generateQuestionsGame();
      break;
    case 'wheel':
      gameContent = generateWheelGame();
      break;
    case 'personality':
      gameContent = generatePersonalityGame();
      break;
    case 'chat':
      gameContent = generateChatGame();
      break;
    default:
      gameContent = '<div class="game-content"><h2>Game Loading...</h2></div>';
  }

  DOM.setHTML(content, gameContent);
  DOM.addClass(modal, 'active');

  if (closeBtn) {
    DOM.on(closeBtn, 'click', () => {
      DOM.removeClass(modal, 'active');
    });
  }

  // Close on overlay click
  DOM.on(modal, 'click', (e) => {
    if (e.target === modal) {
      DOM.removeClass(modal, 'active');
    }
  });
}

function closeGameModal() {
  const modal = DOM.query('.game-modal');
  if (modal) DOM.removeClass(modal, 'active');
}

// ========== GAME GENERATORS ==========

// 1. Guess the Word Game
function generateGuessWordGame() {
  const wordData = CONFIG.GUESS_WORDS[Math.floor(Math.random() * CONFIG.GUESS_WORDS.length)];
  const word = wordData.word;
  const clue = wordData.clue;
  const blanks = '_'.repeat(word.length).split('').join(' ');

  return `
    <div class="game-content">
      <h2>🎯 Guess the Word</h2>
      <div class="word-display">
        <div class="word-clue">Clue: ${clue}</div>
        <div class="word-blank">${blanks}</div>
      </div>
      <input type="text" class="input-field" id="guessInput" placeholder="Your guess..." autocomplete="off">
      <div style="text-align: center;">
        <button class="hint-button" id="hintBtn">💡 Hint</button>
        <button class="submit-button" id="submitBtn">✨ Submit</button>
      </div>
      <div id="gameResult"></div>
      <div class="score-display">Score: <span id="gameScore">0</span></div>
    </div>
  `;
  
  // Note: Would add event listeners in separate function
}

// 2. Love Quiz Game
function generateLoveQuizGame() {
  const questions = CONFIG.QUIZ_QUESTIONS;
  let html = `
    <div class="game-content">
      <h2>💝 Love Quiz</h2>
      <div class="quiz-progress">
        <div class="quiz-progress-bar" style="width: 0%"></div>
      </div>
      <div id="quizContainer">
  `;

  questions.forEach((q, index) => {
    html += `
      <div class="quiz-question-item" data-question="${index}" style="display: ${index === 0 ? 'block' : 'none'}">
        <div class="quiz-question">${q.q}</div>
        <div class="quiz-options">
          ${q.options.map((opt, idx) => `
            <button class="option-button" data-option="${idx}">${opt}</button>
          `).join('')}
        </div>
      </div>
    `;
  });

  html += `
      </div>
      <div id="quizResults"></div>
    </div>
  `;

  return html;
}

// 3. Memory Match Game
function generateMemoryGame() {
  const icons = ['❤️', '💜', '💖', '✨', '🌹', '💕', '💝', '🦋'];
  const pairs = [...icons, ...icons].sort(() => Math.random() - 0.5);

  let html = `
    <div class="game-content">
      <h2>🧠 Memory Match</h2>
      <div style="text-align: center; margin: 1rem 0; color: #e9d5ff;">
        Matches: <span id="matchCount">0</span> / ${icons.length}
      </div>
      <div class="memory-grid">
  `;

  pairs.forEach((icon, index) => {
    html += `<div class="memory-card-game" data-card="${index}" data-icon="${icon}">?</div>`;
  });

  html += `
      </div>
      <button class="play-again-button" id="resetMemory" style="width: 100%; margin-top: 1.5rem;">🔄 Play Again</button>
    </div>
  `;

  return html;
}

// 4. Questions Game
function generateQuestionsGame() {
  const question = {
    q: 'What do you love most about me?',
    answers: ['Your laugh', 'Your heart', 'Your eyes', 'Everything about you']
  };

  return `
    <div class="game-content">
      <h2>❓ Know Me Better</h2>
      <div class="quiz-question">${question.q}</div>
      <div class="quiz-options">
        ${question.answers.map((ans, idx) => `
          <button class="option-button" data-answer="${idx}">${ans}</button>
        `).join('')}
      </div>
      <div id="answerResponse" style="margin-top: 1.5rem;"></div>
    </div>
  `;
}

// 5. Spin the Wheel
function generateWheelGame() {
  const options = CONFIG.LOVE_WHEEL_OPTIONS;

  let html = `
    <div class="game-content">
      <h2>🎡 Spin the Love Wheel</h2>
      <div style="text-align: center; margin: 2rem 0;">
        <div id="wheelResult" style="font-size: 1.3rem; color: #ec4899; font-weight: bold; margin: 1rem 0; min-height: 40px;"></div>
        <button class="submit-button" id="spinBtn">Spin Wheel 🎰</button>
      </div>
      <div style="color: #e9d5ff; font-size: 0.9rem; margin-top: 1.5rem;">
        <strong>Options:</strong><br>
        ${options.map(opt => `<div>• ${opt}</div>`).join('')}
      </div>
    </div>
  `;

  return html;
}

// 6. Personality Game
function generatePersonalityGame() {
  return `
    <div class="game-content">
      <h2>🤔 How Well Do You Know Me?</h2>
      <div id="personalityQuiz">
        <div class="quiz-question">What's my biggest dream?</div>
        <button class="option-button" style="display: block; width: 100%; margin: 0.5rem 0;">
          Click to reveal my answer 💭
        </button>
        <div style="margin-top: 1.5rem; padding: 1rem; background: rgba(217, 70, 239, 0.1); border-radius: 10px; color: #e9d5ff; display: none;">
          To create beautiful moments with the people I love ✨
        </div>
      </div>
    </div>
  `;
}

// 7. Chat Simulator
function generateChatGame() {
  const messages = [
    { sender: 'You', text: 'Hi there! 😊', delay: 0 },
    { sender: 'Me', text: 'Hey love! 💜', delay: 1000 },
    { sender: 'You', text: 'I was thinking about you...', delay: 2000 },
    { sender: 'Me', text: 'I was thinking about you too! 💕', delay: 3500 },
    { sender: 'You', text: 'You mean everything to me', delay: 4500 },
    { sender: 'Me', text: 'You are my everything ❤️', delay: 5500 },
  ];

  let html = `
    <div class="game-content">
      <h2>💬 Our Love Chat</h2>
      <div id="chatBox" style="height: 300px; overflow-y: auto; background: rgba(93, 58, 142, 0.1); border-radius: 10px; padding: 1rem; margin: 1rem 0;">
  `;

  messages.forEach((msg, index) => {
    const isMe = msg.sender === 'Me';
    html += `
      <div style="margin: 1rem 0; text-align: ${isMe ? 'right' : 'left'};" data-message="${index}">
        <div style="display: inline-block; background: ${isMe ? 'var(--gradient-button)' : 'rgba(217, 70, 239, 0.2)'}; color: white; padding: 0.75rem 1rem; border-radius: 15px; max-width: 70%; word-wrap: break-word;">
          ${msg.text}
        </div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  return html;
}

// ========== LIGHTBOX ==========

function initializeLightbox() {
  const memoryCards = DOM.queryAll('.memory-card');
  const lightbox = DOM.query('.lightbox');
  const lightboxImage = DOM.query('.lightbox-image');
  const lightboxClose = DOM.query('.lightbox-close');

  memoryCards.forEach(card => {
    DOM.on(card, 'click', () => {
      const imageSrc = card.getAttribute('data-image') || 'assets/images/placeholder.jpg';
      if (lightboxImage) lightboxImage.src = imageSrc;
      if (lightbox) DOM.addClass(lightbox, 'active');
    });
  });

  if (lightboxClose) {
    DOM.on(lightboxClose, 'click', () => {
      if (lightbox) DOM.removeClass(lightbox, 'active');
    });
  }

  if (lightbox) {
    DOM.on(lightbox, 'click', (e) => {
      if (e.target === lightbox) {
        DOM.removeClass(lightbox, 'active');
      }
    });
  }
}

// ========== NOTIFICATIONS ==========

function showNotification(message) {
  const notification = DOM.create('div');
  notification.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(217, 70, 239, 0.9);
    color: white;
    padding: 15px 30px;
    border-radius: 50px;
    z-index: 1001;
    animation: slideInUp 0.3s ease;
    box-shadow: 0 0 30px rgba(217, 70, 239, 0.5);
  `;
  DOM.setText(notification, message);
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}

// ========== SPECIAL PAGE LOGIC ==========

function initializeSpecialPage() {
  const yesButtons = DOM.queryAll('.yes-button, .no-button');
  
  yesButtons.forEach(btn => {
    DOM.on(btn, 'click', () => {
      showEndingScreen();
    });
  });
}

function showEndingScreen() {
  const endingScreen = DOM.query('.ending-screen');
  
  if (!endingScreen) {
    const screen = DOM.create('div', 'ending-screen');
    screen.innerHTML = `
      <div class="ending-message">I Love You! 💜</div>
      <div class="ending-hearts">❤️ 💜 ✨</div>
    `;
    document.body.appendChild(screen);
  }

  triggerConfetti();
  playBackgroundMusic();
}

// ========== TIMELINE ANIMATION ==========

function initializeTimeline() {
  const timelineItems = DOM.queryAll('.timeline-item');
  
  timelineItems.forEach((item, index) => {
    item.style.animationDelay = (index * 0.1) + 's';
  });
}

// ========== MEMORY GALLERY ==========

function initializeMemoryGallery() {
  const memoryCards = DOM.queryAll('.memory-card');
  
  memoryCards.forEach(card => {
    DOM.on(card, 'click', () => {
      const lightbox = DOM.query('.lightbox');
      if (lightbox) DOM.addClass(lightbox, 'active');
    });
  });
}

// ========== UTILITY FUNCTIONS ==========

function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function animateValue(element, start, end, duration) {
  let current = start;
  const range = end - start;
  const increment = range / (duration / 16);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      current = end;
      clearInterval(timer);
    }
    DOM.setText(element, Math.floor(current));
  }, 16);
}

// ========== PAGE-SPECIFIC INITIALIZATION ==========

// Check if on special page and initialize
if (window.location.pathname.includes('special.html')) {
  document.addEventListener('DOMContentLoaded', () => {
    initializeSpecialPage();
  });
}

// Initialize timeline if on main page
if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
  document.addEventListener('DOMContentLoaded', () => {
    initializeTimeline();
    initializeMemoryGallery();
    initializeLightbox();
  });
}

// ========== ERROR HANDLING ==========

window.addEventListener('error', (e) => {
  console.error('Error occurred:', e.error);
});

// ========== EXPORT FOR USE IN OTHER SCRIPTS ==========

window.MoonlightWebsite = {
  DOM,
  CONFIG,
  gameState,
  showNotification,
  triggerConfetti,
  openGameModal,
  closeGameModal,
  playBackgroundMusic,
  pauseBackgroundMusic,
  showSecretMessage,
  closeSecretMessage,
};

console.log('✨ Moonlight Website - All systems operational!');
