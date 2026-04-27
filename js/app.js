// Elementos DOM
const categoryCards = document.querySelectorAll('.category-card');
const categoriesSection = document.querySelector('.categories');
const gameSelectionSection = document.querySelector('.game-selection');
const memoryGameContainer = document.getElementById('memory-game-container');
const wordMatchContainer = document.getElementById('word-match-container');
const categorizationGameContainer = document.getElementById('categorization-game-container');
const pronunciationGameContainer = document.getElementById('pronunciation-game-container');
const memoryGameBtn = document.getElementById('memory-game');
const wordMatchBtn = document.getElementById('word-match');
const categorizationGameBtn = document.getElementById('categorization-game');
const pronunciationGameBtn = document.getElementById('pronunciation-game');
const learnModeBtn = document.getElementById('learn-mode');
const learnModeContainer = document.getElementById('learn-mode-container');
const wordSearchBtn = document.getElementById('word-search');
const wordSearchContainer = document.getElementById('word-search-container');
const wordGridElement = document.querySelector('.word-grid');
const wordListElement = document.querySelector('.word-list');
  const flashcardImage = document.getElementById('flashcard-image');
  const flashcardWord = document.getElementById('flashcard-word');
  const flashcardFrontText = document.getElementById('flashcard-front-text');
  const flashcardTranslation = document.getElementById('flashcard-translation');
  const flashcardAudio = document.getElementById('flashcard-audio');
  const flashcardCounter = document.getElementById('flashcard-counter');
const prevFlashcardBtn = document.getElementById('prev-flashcard');
const nextFlashcardBtn = document.getElementById('next-flashcard');
const flashcard = document.querySelector('.flashcard');
const backButtons = document.querySelectorAll('.back-btn');
const memoryBoard = document.querySelector('.memory-board');
const wordMatchBoard = document.querySelector('.word-match-board');
const wordsColumn = document.querySelector('.words-column');
const imagesColumn = document.querySelector('.images-column');
const categoriesContainer = document.querySelector('.categories-container');
const wordsContainer = document.querySelector('.words-container');
const checkCategoriesBtn = document.getElementById('check-categories');
const resetCategoriesBtn = document.getElementById('reset-categories');
const currentWordElement = document.querySelector('.current-word');
const wordImageElement = document.querySelector('.word-image');
const listenWordBtn = document.getElementById('listen-word');
const recordPronunciationBtn = document.getElementById('record-pronunciation');
const stopRecordingBtn = document.getElementById('stop-recording');
const playRecordingBtn = document.getElementById('play-recording');
const recordingStatusElement = document.getElementById('recording-status');
const pronunciationScoreElement = document.getElementById('pronunciation-score');
const nextWordBtn = document.getElementById('next-word');

const listeningQuizBtn = document.getElementById('listening-quiz');
const listeningQuizContainer = document.getElementById('listening-quiz-container');
const playSoundBtn = document.getElementById('play-sound-btn');
const quizOptions = document.getElementById('quiz-options');
const listeningModeSelect = document.getElementById('listening-mode');
const listeningNextBtn = document.getElementById('listening-next');
const listeningScoreEl = document.getElementById('listening-score');
const listeningRoundEl = document.getElementById('listening-round');

const twoChoiceQuizBtn = document.getElementById('two-choice-quiz');
const twoChoiceQuizContainer = document.getElementById('two-choice-quiz-container');
const twoChoiceOptions = document.getElementById('two-choice-options');
const twoChoicePlayBtn = document.getElementById('two-choice-play');
const twoChoiceNextBtn = document.getElementById('two-choice-next');
const twoChoiceScoreEl = document.getElementById('two-choice-score');
const twoChoiceRoundEl = document.getElementById('two-choice-round');
const twoChoiceCategorySelect = document.getElementById('two-choice-category');
const twoChoiceQuestionEl = document.getElementById('two-choice-question');
const twoChoiceQuestionEnEl = document.querySelector('#two-choice-question .question-en');
const twoChoiceQuestionPtEl = document.querySelector('#two-choice-question .question-pt');

const imageQuizBtn = document.getElementById('image-quiz');
const imageQuizContainer = document.getElementById('image-quiz-container');
const imageQuizImage = document.getElementById('image-quiz-image');
const imageQuizOptions = document.getElementById('image-quiz-options');
const imageQuizNextBtn = document.getElementById('image-quiz-next');
const imageQuizScoreEl = document.getElementById('image-quiz-score');
const imageQuizRoundEl = document.getElementById('image-quiz-round');
const imageQuizCountSelect = document.getElementById('image-quiz-count');
// Elementos adicionais para modo Phrases no Image Quiz
const imageQuizCard = document.getElementById('image-quiz-card');
const imageQuizPhraseEn = document.getElementById('image-quiz-phrase-en');
const imageQuizPlayBtn = document.getElementById('image-quiz-play');
const memoryPairsCountSelect = document.getElementById('memory-pairs-count');

// Referências da nova home e seções
const homeMenu = document.querySelector('.home-menu');
const modeVocabularyBtn = document.getElementById('mode-vocabulary');
const modeConversationBtn = document.getElementById('mode-conversation');
const modePhrasesBtn = document.getElementById('mode-phrases');
const phrasesCategoriesSection = document.querySelector('.phrases-categories');
const conversationContainer = document.getElementById('conversation-container');
const playConversationBtn = document.getElementById('play-conversation');

// Ícones do header
const homeIconBtn = document.getElementById('home-icon');
const backIconBtn = document.getElementById('back-icon');
const wordSearchDifficultySelect = document.getElementById('word-search-difficulty');

// Inicialização da API de síntese de voz
const speechSynthesis = window.speechSynthesis;
let voices = [];

// Função para carregar as vozes disponíveis
function loadVoices() {
    voices = speechSynthesis.getVoices();
}

// Carregar vozes quando disponíveis
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = loadVoices;
}
loadVoices(); // Tentar carregar imediatamente também

// Labels amigáveis para as categorias (Português)
const categoryLabels = {
    'general': 'Geral (mesclado)',
    'fruits': 'Frutas',
    'colors': 'Cores',
    'numbers-10': 'Números (0–10)',
    'numbers-29': 'Números (0–29)',
    'numbers-100': 'Números (0–100)',
    'farm-animals': 'Animais da Fazenda',
    'zoo-animals': 'Animais do Zoológico',
    'school-supplies': 'Materiais Escolares',
    'toys': 'Brinquedos',
    'body-parts': 'Partes do Corpo',
    'nature': 'Natureza',
    'clothes': 'Roupas',
    'weather': 'Clima',
    'weekdays': 'Dias da Semana',
    'months': 'Meses',
    'vegetables': 'Vegetais',
    'emotions': 'Emoções',
    'pets': 'Animais de Estimação',
    'action-verbs': 'Verbos de Ação',
    'adjectives': 'Adjetivos',
    'shapes': 'Formas',
    'food': 'Comidas',
    'family': 'Família'
};

function humanizeCategoryKey(key) {
    return key
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

function populateTwoChoiceCategorySelect() {
    if (!twoChoiceCategorySelect) return;
    // Limpa e insere a opção Geral
    twoChoiceCategorySelect.innerHTML = '';
    const generalOpt = document.createElement('option');
    generalOpt.value = 'general';
    generalOpt.textContent = categoryLabels['general'] || 'Geral (mesclado)';
    twoChoiceCategorySelect.appendChild(generalOpt);

    // Adiciona todas as categorias disponíveis do vocabularyData
    const keys = Object.keys(vocabularyData);
    keys.forEach(k => {
        const arr = vocabularyData[k];
        if (!Array.isArray(arr) || arr.length < 2) return; // precisa de ao menos 2 itens
        const opt = document.createElement('option');
        opt.value = k;
        opt.textContent = categoryLabels[k] || humanizeCategoryKey(k);
        twoChoiceCategorySelect.appendChild(opt);
    });
}

// Variáveis de estado
let currentCategory = '';
let currentMode = null; // Estado do modo atual
let selectedWordItem = null;
let selectedImageItem = null;
let flippedCards = [];
let matchedPairs = 0;
let totalPairs = 0;
let lockBoard = false;

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Popular seletor do Quiz 2 Alternativas com todas as categorias
    populateTwoChoiceCategorySelect();
    
    // Estado inicial: mostrar somente home menu
    const homeMenu = document.querySelector('.home-menu');
    if (homeMenu) homeMenu.style.display = 'block';
    if (categoriesSection) categoriesSection.style.display = 'none';
    if (gameSelectionSection) gameSelectionSection.style.display = 'none';
    if (conversationContainer) conversationContainer.style.display = 'none';
    if (phrasesCategoriesSection) phrasesCategoriesSection.style.display = 'none';
    
    // Navegação da nova home
    if (modeVocabularyBtn) {
        modeVocabularyBtn.addEventListener('click', () => {
            currentMode = 'vocabulary';
            const homeMenu = document.querySelector('.home-menu');
            if (homeMenu) homeMenu.style.display = 'none';
            categoriesSection.style.display = 'block';
        });
    }
    if (modeConversationBtn) {
        modeConversationBtn.addEventListener('click', () => {
            currentMode = 'conversation';
            const homeMenu = document.querySelector('.home-menu');
            if (homeMenu) homeMenu.style.display = 'none';
            conversationContainer.style.display = 'block';
        });
    }
    if (modePhrasesBtn) {
        modePhrasesBtn.addEventListener('click', () => {
            currentMode = 'phrases';
            const homeMenu = document.querySelector('.home-menu');
            if (homeMenu) homeMenu.style.display = 'none';
            phrasesCategoriesSection.style.display = 'block';
        });
    }
    // Conversation: eventos dos tópicos
    document.querySelectorAll('.conversation-topic-card').forEach(card => {
        card.addEventListener('click', () => {
            const topic = card.getAttribute('data-topic');
            const lines = conversationData[topic] || [];
            const viewer = conversationContainer.querySelector('.dialogue-lines');
            viewer.innerHTML = '';
            lines.forEach(line => {
                const div = document.createElement('div');
                div.className = 'dialogue-line';
                div.textContent = `${line.speaker}: ${line.en} / ${line.pt}`;
                viewer.appendChild(div);
            });
            conversationContainer.dataset.currentTopic = topic;
        });
    });

    document.getElementById('play-conversation').addEventListener('click', () => {
        const topic = conversationContainer.dataset.currentTopic;
        if (!topic) return;
        const lines = conversationData[topic] || [];
        // Falar as falas em inglês (pode alternar idiomas conforme necessidade)
        let idx = 0;
        function speakNext() {
            if (idx >= lines.length) return;
            speakText(lines[idx].en);
            idx++;
            setTimeout(speakNext, 1500);
        }
        speakNext();
    });

    // Adicionar event listeners para cartões de categoria (Vocabulary + Phrases)
    categoryCards.forEach(card => {
        card.addEventListener('click', (event) => {
            // Verificar se o clique foi no botão de áudio
            if (event.target.closest('.audio-btn')) {
                // Não prosseguir com a navegação se o clique foi no botão de áudio
                event.stopPropagation();
                return;
            }
            
            const mode = card.getAttribute('data-mode') || 'vocabulary';
            currentMode = mode;
            currentCategory = card.getAttribute('data-category');
            if (mode === 'vocabulary') {
                categoriesSection.style.display = 'none';
            } else if (mode === 'phrases') {
                phrasesCategoriesSection.style.display = 'none';
            }
            gameSelectionSection.style.display = 'block';
        });
    });
    
    // Adicionar event listeners para botões de áudio
    const audioButtons = document.querySelectorAll('.audio-btn');
    audioButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation(); // Evitar que o clique propague para o cartão
            const word = button.getAttribute('data-word');
            speakText(word);
        });
    });

    // Adicionar event listeners para botões de jogo
    memoryGameBtn.addEventListener('click', () => {
        gameSelectionSection.style.display = 'none';
        memoryGameContainer.style.display = 'block';
        setupMemoryGame(currentCategory);
    });

    // Reiniciar o jogo da memória quando trocar o número de pares
    if (memoryPairsCountSelect) {
        memoryPairsCountSelect.addEventListener('change', () => {
            if (memoryGameContainer.style.display === 'block') {
                setupMemoryGame(currentCategory);
            }
        });
    }

    wordMatchBtn.addEventListener('click', () => {
        gameSelectionSection.style.display = 'none';
        wordMatchContainer.style.display = 'block';
        setupWordMatchGame(currentCategory);
    });
    
    categorizationGameBtn.addEventListener('click', () => {
        gameSelectionSection.style.display = 'none';
        categorizationGameContainer.style.display = 'block';
        setupCategorizationGame();
    });
    
    pronunciationGameBtn.addEventListener('click', () => {
        gameSelectionSection.style.display = 'none';
        pronunciationGameContainer.style.display = 'block';
        setupPronunciationGame(currentCategory);
    });
    
    learnModeBtn.addEventListener('click', () => {
        gameSelectionSection.style.display = 'none';
        learnModeContainer.style.display = 'block';
        setupLearnMode(currentCategory);
    });

    // Adicionar evento de clique para o botão de Prática de Escuta
    listeningQuizBtn.addEventListener('click', () => {
        gameSelectionSection.style.display = 'none';
        listeningQuizContainer.style.display = 'block';
        startListeningQuiz();
    });

    // Adicionar evento para Caça-Palavras
    if (wordSearchBtn) {
        wordSearchBtn.addEventListener('click', () => {
            gameSelectionSection.style.display = 'none';
            wordSearchContainer.style.display = 'block';
            setupWordSearchGame(currentCategory);
        });
    }

    // Nível do Caça-Palavras
    if (wordSearchDifficultySelect) {
        wordSearchDifficultySelect.addEventListener('change', () => {
            wordSearchDifficulty = wordSearchDifficultySelect.value;
            setupWordSearchGame(currentCategory);
        });
    }

    // Adicionar event listeners para botões de voltar
    backButtons.forEach(button => {
        button.addEventListener('click', handleBackButton);
    });
    
    // Event listeners para controles dos flashcards
    if (flashcard) {
        flashcard.addEventListener('click', flipFlashcard);
    }
    
    if (prevFlashcardBtn) {
        prevFlashcardBtn.addEventListener('click', showPreviousFlashcard);
    }
    
    if (nextFlashcardBtn) {
        nextFlashcardBtn.addEventListener('click', showNextFlashcard);
    }
    
    if (flashcardAudio) {
        flashcardAudio.addEventListener('click', playFlashcardAudio);
    }

    // Listening Quiz modo
    if (listeningModeSelect) {
        listeningModeSelect.addEventListener('change', () => {
            listeningMode = listeningModeSelect.value;
            // Reiniciar pergunta para refletir o modo escolhido
            startListeningQuiz();
        });
    }
    if (listeningNextBtn) {
        listeningNextBtn.addEventListener('click', () => {
            startListeningQuiz();
        });
    }

    // Quiz 2 Alternativas
    if (twoChoiceQuizBtn) {
        twoChoiceQuizBtn.addEventListener('click', () => {
            gameSelectionSection.style.display = 'none';
            twoChoiceQuizContainer.style.display = 'block';
            startTwoChoiceQuiz();
        });
    }
    if (twoChoicePlayBtn) {
        twoChoicePlayBtn.addEventListener('click', () => {
            if (currentTwoChoiceQuestionEn) speakText(currentTwoChoiceQuestionEn);
        });
    }
    if (twoChoiceNextBtn) {
        twoChoiceNextBtn.addEventListener('click', () => {
            startTwoChoiceQuiz();
        });
    }
    if (twoChoiceCategorySelect) {
        twoChoiceCategorySelect.addEventListener('change', () => {
            startTwoChoiceQuiz();
        });
    }

    // Image Quiz
    if (imageQuizBtn) {
        imageQuizBtn.addEventListener('click', () => {
            gameSelectionSection.style.display = 'none';
            imageQuizContainer.style.display = 'block';
            startImageQuiz();
        });
    }
    if (imageQuizNextBtn) {
        imageQuizNextBtn.addEventListener('click', () => {
            startImageQuiz();
        });
    }
    if (imageQuizCountSelect) {
        imageQuizCountSelect.addEventListener('change', () => {
            startImageQuiz();
        });
    }

    // Ações do Header
    if (homeIconBtn) {
        homeIconBtn.addEventListener('click', goHome);
    }
    if (backIconBtn) {
        backIconBtn.addEventListener('click', goBackPage);
    }
});

// Função para lidar com o botão de voltar
function handleBackButton(event) {
    const parentSection = event.target.closest('.game-container') || event.target.closest('section');

    // Se voltar de qualquer seção principal, retorne para a home
    if (parentSection && (
        parentSection.classList.contains('categories') ||
        parentSection.classList.contains('phrases-categories') ||
        parentSection.id === 'conversation-container' ||
        parentSection.id === 'game-selection'
    )) {
        parentSection.style.display = 'none';
        const homeMenu = document.querySelector('.home-menu');
        if (homeMenu) homeMenu.style.display = 'block';
        currentMode = null;
        return;
    }

    if (!parentSection) return;

    // Resetar jogos conforme a seção atual
    switch (parentSection.id) {
        case 'memory-game-container':
            resetMemoryGame();
            break;
        case 'word-match-container':
            resetWordMatchGame();
            break;
        case 'categorization-game-container':
            resetCategorizationGame();
            break;
        case 'pronunciation-game-container':
            resetPronunciationGame();
            break;
        case 'learn-mode-container':
            resetLearnMode();
            break;
        case 'word-search-container':
            resetWordSearchGame();
            break;
        case 'two-choice-quiz-container':
            resetTwoChoiceQuiz();
            break;
        case 'image-quiz-container':
            resetImageQuiz();
            break;
        case 'listening-quiz-container':
            if (typeof resetListeningQuiz === 'function') resetListeningQuiz();
            break;
    }

    // Esconder seção atual
    parentSection.style.display = 'none';

    // Mostrar seção apropriada
    if (parentSection.classList.contains('game-container')) {
        // Voltando de um jogo: mostrar seleção de jogos
        gameSelectionSection.style.display = 'block';
    } else {
        // Outras seções: voltar para o menu do modo atual, ou home se não definido
        if (currentMode === 'vocabulary') {
            categoriesSection.style.display = 'block';
        } else if (currentMode === 'phrases') {
            phrasesCategoriesSection.style.display = 'block';
        } else if (currentMode === 'conversation') {
            conversationContainer.style.display = 'block';
        } else {
            const homeMenu = document.querySelector('.home-menu');
            if (homeMenu) homeMenu.style.display = 'block';
        }
    }
}

// Configurar jogo da memória
function setupMemoryGame(category) {
    // Limpar o tabuleiro
    memoryBoard.innerHTML = '';

    // Obter dados da categoria conforme o modo
    let categoryData = [];
    if (currentMode === 'phrases') {
        const phrases = (typeof phrasesData !== 'undefined' && phrasesData[category]) ? phrasesData[category] : [];
        categoryData = phrases;
    } else {
        categoryData = vocabularyData[category] || [];
    }

    // Definir quantidade de pares (4, 6 ou 8) conforme seletor
    const requestedPairs = memoryPairsCountSelect ? parseInt(memoryPairsCountSelect.value, 10) : 8;
    const pairsCount = Math.min(requestedPairs, categoryData.length);

    // Montar jogo com a quantidade escolhida
    const gameData = categoryData.slice(0, pairsCount);
    totalPairs = gameData.length;
    matchedPairs = 0;

    // Criar pares de cartas
    const cards = [];

    if (currentMode === 'phrases') {
        // Para frases: pares EN ↔ PT (duas cartas de palavra)
        gameData.forEach(item => {
            const enCard = createMemoryCard('word', item.english, 'en');
            const ptCard = createMemoryCard('word', item.portuguese, 'pt');
            cards.push(enCard, ptCard);
        });
    } else {
        // Vocabulário: palavra ↔ imagem
        gameData.forEach(item => {
            const wordCard = createMemoryCard('word', item.english);
            const imageCard = createMemoryCard('image', item.image);
            cards.push(wordCard, imageCard);
        });
    }

    // Embaralhar cartas
    shuffleArray(cards);

    // Adicionar cartas ao tabuleiro
    cards.forEach(card => {
        memoryBoard.appendChild(card);
    });

    // Preview de 5 segundos - mostrar todas as cartas
    showAllCardsPreview();
}

function showAllCardsPreview() {
    const allCards = document.querySelectorAll('.memory-card');
    
    // Mostrar todas as cartas
    allCards.forEach(card => {
        card.classList.add('flipped');
    });
    
    // Bloquear interação durante o preview
    lockBoard = true;
    
    // Após 5 segundos, esconder as cartas e permitir interação
    setTimeout(() => {
        allCards.forEach(card => {
            card.classList.remove('flipped');
        });
        lockBoard = false;
    }, 5000);
}

// Criar carta para o jogo da memória (suporta idioma opcional)
function createMemoryCard(type, content, lang) {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.type = type;
    if (lang) {
        card.dataset.lang = lang;
    }
    
    // Criar frente da carta
    const front = document.createElement('div');
    front.className = 'front';
    
    if (type === 'word') {
        const wordElement = document.createElement('span');
        wordElement.className = 'word';
        wordElement.textContent = content;
        front.appendChild(wordElement);
        card.dataset.value = content;
        
        // Adicionar botão de áudio para cartas de palavra
        const audioBtn = document.createElement('button');
        audioBtn.className = 'audio-btn card-audio-btn';
        audioBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        audioBtn.dataset.word = content;
        audioBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Evitar que o clique vire a carta
            speakText(content);
        });
        front.appendChild(audioBtn);
    } else {
        const img = document.createElement('img');
        img.src = content;
        img.alt = 'Vocabulary Image';
        front.appendChild(img);
        card.dataset.value = content;
    }
    
    // Criar verso da carta
    const back = document.createElement('div');
    back.className = 'back';
    back.innerHTML = '<i class="fas fa-question"></i>';
    
    // Adicionar frente e verso à carta
    card.appendChild(front);
    card.appendChild(back);
    
    // Adicionar event listener
    card.addEventListener('click', flipCard);
    
    return card;
}

// Virar carta no jogo da memória
function flipCard() {
    if (lockBoard) return;
    if (this === flippedCards[0]) return;
    
    this.classList.add('flipped');
    
    // Reproduzir áudio se for uma carta de palavra
    if (this.dataset.type === 'word') {
        speakText(this.dataset.value);
    }
    
    if (flippedCards.length === 0) {
        // Primeira carta virada
        flippedCards.push(this);
        return;
    }
    
    // Segunda carta virada
    const secondCard = this;
    lockBoard = true;
    
    // Verificar se é um par
    const isMatch = checkForMatch(flippedCards[0], secondCard);
    
    if (isMatch) {
        // É um par: marcar cartas como combinadas e desabilitar interação
        flippedCards[0].classList.add('matched');
        secondCard.classList.add('matched');
        resetFlippedCards();
        matchedPairs++;
        
        // Verificar se o jogo acabou
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                alert('Parabéns! Você completou o jogo!');
                resetMemoryGame();
                memoryGameContainer.style.display = 'none';
                gameSelectionSection.style.display = 'block';
            }, 1000);
        }
    } else {
        // Não é um par
        setTimeout(() => {
            flippedCards[0].classList.remove('flipped');
            secondCard.classList.remove('flipped');
            resetFlippedCards();
        }, 1500);
    }
}

// Verificar se as cartas formam um par
function checkForMatch(card1, card2) {
    // Modo Phrases: ambas são cartas de palavra (EN ↔ PT)
    if (currentMode === 'phrases') {
        if (card1.dataset.type === 'word' && card2.dataset.type === 'word') {
            const en = card1.dataset.lang === 'en' ? card1.dataset.value :
                       (card2.dataset.lang === 'en' ? card2.dataset.value : null);
            const pt = card1.dataset.lang === 'pt' ? card1.dataset.value :
                       (card2.dataset.lang === 'pt' ? card2.dataset.value : null);
            if (!en || !pt) return false;
            const items = (typeof phrasesData !== 'undefined' && phrasesData[currentCategory]) ? phrasesData[currentCategory] : [];
            return items.some(it => it.english === en && it.portuguese === pt);
        }
        return false;
    }

    // Vocabulário: palavra ↔ imagem
    if (card1.dataset.type !== card2.dataset.type) {
        // Para imagens, precisamos encontrar o item correspondente nos dados
        if (card1.dataset.type === 'image' || card2.dataset.type === 'image') {
            const imageCard = card1.dataset.type === 'image' ? card1 : card2;
            const wordCard = card1.dataset.type === 'word' ? card1 : card2;

            const imagePath = imageCard.dataset.value;
            const word = wordCard.dataset.value;

            // Encontrar o item nos dados da categoria atual
            const categoryData = vocabularyData[currentCategory];
            const matchingItem = categoryData.find(item =>
                (item.image === imagePath && item.english === word) ||
                (item.english === word && item.image === imagePath)
            );

            return matchingItem !== undefined;
        }
    }

    // Se ambas são palavras ou ambas são imagens, não é um par
    return false;
}

// Resetar cartas viradas
function resetFlippedCards() {
    flippedCards = [];
    lockBoard = false;
}

// Resetar jogo da memória
function resetMemoryGame() {
    memoryBoard.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    totalPairs = 0;
    lockBoard = false;
}

function setupWordMatchGame(category) {
    wordsColumn.innerHTML = '';
    imagesColumn.innerHTML = '';
    let gameData;
    if (currentMode === 'phrases') {
        gameData = (phrasesData[currentCategory] || []).slice(0, 8);
        const words = gameData.map(item => item.english);
        const translations = gameData.map(item => item.portuguese);
        shuffleArray(words);
        shuffleArray(translations);
        words.forEach(word => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.textContent = word;
            wordItem.dataset.value = word;
            wordItem.addEventListener('click', selectWordItem);
            wordsColumn.appendChild(wordItem);
        });
        translations.forEach(pt => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item'; // reaproveita estilo
            imageItem.textContent = pt;
            imageItem.dataset.value = pt;
            imageItem.addEventListener('click', selectImageItem);
            imagesColumn.appendChild(imageItem);
        });
    } else {
        const categoryData = vocabularyData[category];
        gameData = categoryData.slice(0, 8);
        const words = gameData.map(item => item.english);
        const images = gameData.map(item => item.image);
        shuffleArray(words);
        shuffleArray(images);
        words.forEach(word => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.textContent = word;
            wordItem.dataset.value = word;
            wordItem.addEventListener('click', selectWordItem);
            wordsColumn.appendChild(wordItem);
        });
        images.forEach(image => {
            const imageItem = document.createElement('div');
            imageItem.className = 'image-item';
            const img = document.createElement('img');
            img.src = image;
            img.alt = 'Vocabulary Image';
            imageItem.appendChild(img);
            imageItem.dataset.value = image;
            imageItem.addEventListener('click', selectImageItem);
            imagesColumn.appendChild(imageItem);
        });
    }
}
// Selecionar item de palavra
function selectWordItem() {
    // Remover seleção anterior
    if (selectedWordItem) {
        selectedWordItem.classList.remove('selected');
    }
    
    // Selecionar novo item
    this.classList.add('selected');
    selectedWordItem = this;
    
    // Reproduzir áudio da palavra
    speakText(this.dataset.value);
    
    // Verificar se há um par
    checkWordMatch();
}

// Selecionar item de imagem
function selectImageItem() {
    // Remover seleção anterior
    if (selectedImageItem) {
        selectedImageItem.classList.remove('selected');
    }
    
    // Selecionar novo item
    this.classList.add('selected');
    selectedImageItem = this;
    
    // Verificar se há um par
    checkWordMatch();
}

// Verificar correspondência no jogo de palavras
function checkWordMatch() {
    if (!selectedWordItem || !selectedImageItem) return;

    const word = selectedWordItem.dataset.value;
    const imagePathOrPt = selectedImageItem.dataset.value;

    // Modo de frases: EN ↔ PT
    if (currentMode === 'phrases') {
        const items = phrasesData[currentCategory] || [];
        const matchingItem = items.find(item => item.english === word && item.portuguese === imagePathOrPt);
        if (matchingItem) {
            // É um par
            selectedWordItem.classList.remove('selected');
            selectedImageItem.classList.remove('selected');

            selectedWordItem.classList.add('matched', 'correct');
            selectedImageItem.classList.add('matched', 'correct');

            // Reproduzir áudio de sucesso e falar a palavra
            playSuccessSound();
            setTimeout(() => speakText(word), 700);

            selectedWordItem = null;
            selectedImageItem = null;

            // Verificar se o jogo acabou considerando o tamanho real dos itens
            const matchedItems = document.querySelectorAll('.word-item.matched').length;
            if (matchedItems === Math.min(8, items.length)) {
                setTimeout(() => {
                    alert('Parabéns! Você completou o jogo!');
                    resetWordMatchGame();
                    wordMatchContainer.style.display = 'none';
                    gameSelectionSection.style.display = 'block';
                }, 1500);
            }
        }
        return;
    }

    // Vocabulário: palavra ↔ imagem
    const categoryData = vocabularyData[currentCategory];
    const isMatch = categoryData.some(item => item.english === word && item.image === imagePathOrPt);

    if (isMatch) {
        // É um par
        selectedWordItem.classList.remove('selected');
        selectedImageItem.classList.remove('selected');

        selectedWordItem.classList.add('matched', 'correct');
        selectedImageItem.classList.add('matched', 'correct');

        // Reproduzir áudio de sucesso e falar a palavra
        playSuccessSound();

        // Pequeno atraso antes de falar a palavra para não sobrepor o som de sucesso
        setTimeout(() => {
            speakText(word);
        }, 700);

        selectedWordItem = null;
        selectedImageItem = null;

        // Verificar se o jogo acabou
        const matchedItems = document.querySelectorAll('.word-item.matched').length;
        if (matchedItems === 8) {
            setTimeout(() => {
                alert('Parabéns! Você completou o jogo!');
                resetWordMatchGame();
                wordMatchContainer.style.display = 'none';
                gameSelectionSection.style.display = 'block';
            }, 1500);
        }
    }
}

// Configuração do jogo de categorização
function setupCategorizationGame() {
    // Limpar os contêineres
    categoriesContainer.innerHTML = '';
    wordsContainer.innerHTML = '';
    
    // Selecionar categorias aleatórias (3-4 categorias)
    const availableCategories = Object.keys(vocabularyData).filter(cat => 
        vocabularyData[cat].length >= 3 && !cat.includes('numbers-'));
    
    const numCategories = Math.min(4, availableCategories.length);
    const selectedCategories = [];
    
    while (selectedCategories.length < numCategories) {
        const randomIndex = Math.floor(Math.random() * availableCategories.length);
        const category = availableCategories[randomIndex];
        
        if (!selectedCategories.includes(category)) {
            selectedCategories.push(category);
        }
    }
    
    // Criar caixas de categoria
    selectedCategories.forEach(category => {
        const categoryBox = document.createElement('div');
        categoryBox.className = 'category-box';
        categoryBox.dataset.category = category;
        
        const categoryTitle = document.createElement('div');
        categoryTitle.className = 'category-title';
        
        // Obter nome da categoria em português
        let categoryName = '';
        switch(category) {
            case 'fruits': categoryName = 'Frutas'; break;
            case 'colors': categoryName = 'Cores'; break;
            case 'body-parts': categoryName = 'Partes do Corpo'; break;
            case 'weather': categoryName = 'Clima'; break;
            case 'weekdays': categoryName = 'Dias da Semana'; break;
            case 'months': categoryName = 'Meses'; break;
            case 'vegetables': categoryName = 'Vegetais'; break;
            case 'emotions': categoryName = 'Emoções'; break;
            case 'pets': categoryName = 'Pets'; break;
            case 'farm-animals': categoryName = 'Animais da Fazenda'; break;
            case 'zoo-animals': categoryName = 'Animais do Zoológico'; break;
            case 'toys': categoryName = 'Brinquedos'; break;
            case 'clothes': categoryName = 'Roupas'; break;
            case 'school-supplies': categoryName = 'Material Escolar'; break;
            default: categoryName = category;
        }
        
        categoryTitle.textContent = categoryName;
        
        const categoryItems = document.createElement('div');
        categoryItems.className = 'category-items';
        
        categoryBox.appendChild(categoryTitle);
        categoryBox.appendChild(categoryItems);
        categoriesContainer.appendChild(categoryBox);
    });
    
    // Criar palavras arrastáveis
    const allWords = [];
    
    selectedCategories.forEach(category => {
        // Selecionar 3-4 palavras aleatórias de cada categoria
        const categoryWords = vocabularyData[category];
        const numWords = Math.min(4, categoryWords.length);
        const shuffledWords = [...categoryWords].sort(() => 0.5 - Math.random());
        const selectedWords = shuffledWords.slice(0, numWords);
        
        selectedWords.forEach(word => {
            allWords.push({
                english: word.english,
                portuguese: word.portuguese,
                category: category
            });
        });
    });
    
    // Embaralhar todas as palavras
    const shuffledAllWords = [...allWords].sort(() => 0.5 - Math.random());
    
    // Adicionar palavras ao contêiner
    shuffledAllWords.forEach(word => {
        const wordElement = document.createElement('div');
        wordElement.className = 'draggable-word';
        wordElement.textContent = word.english;
        wordElement.dataset.category = word.category;
        wordElement.dataset.portuguese = word.portuguese;
        wordElement.draggable = true;
        
        // Adicionar event listeners para arrastar
        wordElement.addEventListener('dragstart', dragStart);
        wordElement.addEventListener('dragend', dragEnd);
        
        wordsContainer.appendChild(wordElement);
    });
    
    // Adicionar event listeners para as caixas de categoria
    document.querySelectorAll('.category-items').forEach(container => {
        container.addEventListener('dragover', dragOver);
        container.addEventListener('dragenter', dragEnter);
        container.addEventListener('dragleave', dragLeave);
        container.addEventListener('drop', drop);
    });
    
    // Adicionar event listeners para os botões
    checkCategoriesBtn.addEventListener('click', checkCategories);
    resetCategoriesBtn.addEventListener('click', resetCategorizationGame);
}

// Funções para arrastar e soltar
function dragStart() {
    this.classList.add('dragging');
}

function dragEnd() {
    this.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function dragLeave() {
    this.classList.remove('drag-over');
}

function drop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    const draggable = document.querySelector('.dragging');
    if (draggable) {
        this.appendChild(draggable);
        
        // Reproduzir o som da palavra
        speakText(draggable.textContent);
    }
}

// Verificar se as palavras estão nas categorias corretas
function checkCategories() {
    let allCorrect = true;
    let correctCount = 0;
    let totalCount = 0;
    
    document.querySelectorAll('.category-box').forEach(categoryBox => {
        const categoryName = categoryBox.dataset.category;
        const words = categoryBox.querySelectorAll('.draggable-word');
        
        words.forEach(word => {
            totalCount++;
            const wordCategory = word.dataset.category;
            
            if (wordCategory === categoryName) {
                word.classList.add('correct');
                word.classList.remove('incorrect');
                correctCount++;
                // Reproduzir som de acerto
                playSuccessSound();
            } else {
                word.classList.add('incorrect');
                word.classList.remove('correct');
                allCorrect = false;
            }
        });
    });
    
    // Verificar se todas as palavras foram categorizadas e estão corretas
    if (allCorrect && correctCount > 0 && correctCount === document.querySelectorAll('.draggable-word').length) {
        setTimeout(() => {
            alert(`Parabéns! Você categorizou todas as ${correctCount} palavras corretamente!`);
            resetCategorizationGame();
            categorizationGameContainer.style.display = 'none';
            gameSelectionSection.style.display = 'block';
        }, 1000);
    } else if (correctCount > 0) {
        alert(`Você acertou ${correctCount} de ${totalCount} palavras. Continue tentando!`);
    } else {
        alert('Tente novamente! Arraste as palavras para as categorias corretas.');
    }
}

// Resetar o jogo de categorização
function resetCategorizationGame() {
    // Mover todas as palavras de volta para o contêiner de palavras
    document.querySelectorAll('.draggable-word').forEach(word => {
        word.classList.remove('correct', 'incorrect');
        wordsContainer.appendChild(word);
    });
    
    // Remover event listeners dos botões para evitar duplicação
    checkCategoriesBtn.removeEventListener('click', checkCategories);
    resetCategoriesBtn.removeEventListener('click', resetCategorizationGame);
}

// Resetar jogo de correspondência de palavras
function resetWordMatchGame() {
    wordsColumn.innerHTML = '';
    imagesColumn.innerHTML = '';
    selectedWordItem = null;
    selectedImageItem = null;
}

// Variáveis para o jogo de pronúncia
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;
let currentPronunciationWord;
let pronunciationScore = 0;
let currentCategoryWords = [];
let usedWords = [];

// Variáveis do modo aprender
let learnModeData = [];
let currentFlashcardIndex = 0;

// Configurar o jogo de pronúncia
function setupPronunciationGame(category) {
    // Resetar o jogo
    resetPronunciationGame();
    
    // Obter palavras da categoria selecionada
    if (category && vocabularyData[category]) {
        currentCategoryWords = [...vocabularyData[category]];
        usedWords = [];
        pronunciationScore = 0;
        pronunciationScoreElement.textContent = pronunciationScore;
        
        // Selecionar a primeira palavra
        selectRandomWord();
        
        // Adicionar event listeners
        listenWordBtn.addEventListener('click', playCurrentWord);
        recordPronunciationBtn.addEventListener('click', startRecording);
        stopRecordingBtn.addEventListener('click', stopRecording);
        playRecordingBtn.addEventListener('click', playRecording);
        nextWordBtn.addEventListener('click', selectRandomWord);
    } else {
        alert('Por favor, selecione uma categoria válida!');
        handleBackButton();
    }
}

// Selecionar uma palavra aleatória para o jogo de pronúncia
function selectRandomWord() {
    // Resetar estado da gravação
    resetRecordingState();
    
    // Se todas as palavras foram usadas, reiniciar
    if (usedWords.length === currentCategoryWords.length) {
        usedWords = [];
    }
    
    // Filtrar palavras não usadas
    const availableWords = currentCategoryWords.filter(word => !usedWords.includes(word.english));
    
    if (availableWords.length > 0) {
        // Selecionar uma palavra aleatória
        const randomIndex = Math.floor(Math.random() * availableWords.length);
        currentPronunciationWord = availableWords[randomIndex];
        usedWords.push(currentPronunciationWord.english);
        
        // Exibir a palavra e a imagem
        currentWordElement.textContent = currentPronunciationWord.english;
        wordImageElement.innerHTML = `<img src="${currentPronunciationWord.image}" alt="${currentPronunciationWord.english}">`;
    }
}

// Reproduzir a palavra atual
function playCurrentWord() {
    if (currentPronunciationWord) {
        speakText(currentPronunciationWord.english);
    }
}

// Iniciar gravação
function startRecording() {
    // Verificar suporte a gravação de áudio
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert('Seu navegador não suporta gravação de áudio!');
        return;
    }
    
    // Solicitar permissão para usar o microfone
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            audioChunks = [];
            mediaRecorder = new MediaRecorder(stream);
            
            mediaRecorder.ondataavailable = (e) => {
                audioChunks.push(e.data);
            };
            
            // Nota: A lógica de onstop foi movida para a função stopRecording
            // para implementar o reconhecimento de fala real
            mediaRecorder.onstop = () => {
                // Esta função agora está vazia pois a lógica foi movida
                // para evitar duplicação de código
            };
            
            mediaRecorder.start();
            recordPronunciationBtn.disabled = true;
            stopRecordingBtn.disabled = false;
            recordingStatusElement.textContent = "Gravando...";
            recordingStatusElement.classList.add('recording');
        })
        .catch(error => {
            console.error('Erro ao acessar o microfone:', error);
            alert('Não foi possível acessar o microfone. Verifique as permissões.');
        });
}

// Parar gravação
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        recordPronunciationBtn.disabled = false;
        stopRecordingBtn.disabled = true;
        recordingStatusElement.classList.remove('recording');
        recordingStatusElement.textContent = "Analisando pronúncia...";
        
        // Iniciar reconhecimento de fala quando a gravação estiver pronta
        mediaRecorder.onstop = () => {
            audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            audioUrl = URL.createObjectURL(audioBlob);
            playRecordingBtn.disabled = false;
            
            // Usar reconhecimento de fala para avaliar a pronúncia
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.continuous = false;
            recognition.interimResults = false;
            
            // Criar um elemento de áudio para reproduzir a gravação para o reconhecimento
            const audioElement = new Audio(audioUrl);
            
            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript.toLowerCase();
                const confidence = event.results[0][0].confidence;
                const targetWord = (currentPronunciationWord && currentPronunciationWord.english ? currentPronunciationWord.english : '').toLowerCase();
                
                console.log("Palavra falada:", transcript);
                console.log("Palavra alvo:", targetWord);
                console.log("Confiança:", confidence);
                
                // Calcular pontuação baseada na similaridade e confiança
                let score = 0;
                
                if (transcript.includes(targetWord)) {
                    // Palavra exata encontrada
                    score = Math.round(confidence * 10);
                } else if (levenshteinDistance(transcript, targetWord) <= 2) {
                    // Palavra similar (até 2 caracteres diferentes)
                    score = Math.round(confidence * 7);
                } else {
                    // Palavra diferente
                    score = 0;
                }
                
                // Atualizar pontuação e feedback
                pronunciationScore += score;
                pronunciationScoreElement.textContent = pronunciationScore;
                
                // Feedback visual
                if (score >= 7) {
                    recordingStatusElement.textContent = "Excelente pronúncia!";
                    recordingStatusElement.style.backgroundColor = "#4CAF50";
                    recordingStatusElement.style.color = "white";
                    playAudio('correct');
                } else if (score >= 4) {
                    recordingStatusElement.textContent = "Boa pronúncia!";
                    recordingStatusElement.style.backgroundColor = "#2196F3";
                    recordingStatusElement.style.color = "white";
                } else {
                    recordingStatusElement.textContent = "Tente novamente!";
                    recordingStatusElement.style.backgroundColor = "#F44336";
                    recordingStatusElement.style.color = "white";
                    playAudio('incorrect');
                }
            };
            
            recognition.onerror = (event) => {
                console.error('Erro no reconhecimento:', event.error);
                recordingStatusElement.textContent = "Erro na análise. Tente novamente.";
            };
            
            // Iniciar reconhecimento quando o áudio começar a tocar
            audioElement.onplay = () => {
                recognition.start();
            };
            
            // Reproduzir o áudio para o reconhecimento
            audioElement.play();
        };
    }
}

// Função para calcular a distância de Levenshtein (similaridade entre strings)
function levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;
    
    const matrix = [];
    
    // Inicializar matriz
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }
    
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }
    
    // Preencher matriz
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i-1) === a.charAt(j-1)) {
                matrix[i][j] = matrix[i-1][j-1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i-1][j-1] + 1, // substituição
                    matrix[i][j-1] + 1,   // inserção
                    matrix[i-1][j] + 1    // remoção
                );
            }
        }
    }
    
    return matrix[b.length][a.length];
}

// Reproduzir gravação
function playRecording() {
    if (audioUrl) {
        const audio = new Audio(audioUrl);
        audio.play();
    }
}

// Resetar estado da gravação
function resetRecordingState() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }
    
    audioChunks = [];
    audioBlob = null;
    audioUrl = null;
    
    recordPronunciationBtn.disabled = false;
    stopRecordingBtn.disabled = true;
    playRecordingBtn.disabled = true;
    
    recordingStatusElement.textContent = "Pronto para gravar";
    recordingStatusElement.classList.remove('recording');
    recordingStatusElement.style.backgroundColor = "";
    recordingStatusElement.style.color = "";
}

// Resetar jogo de pronúncia
function resetPronunciationGame() {
    resetRecordingState();
    currentPronunciationWord = null;
    pronunciationScore = 0;
    pronunciationScoreElement.textContent = pronunciationScore;
    currentWordElement.textContent = "";
    wordImageElement.innerHTML = "";
    
    // Remover event listeners para evitar duplicação
    listenWordBtn.removeEventListener('click', playCurrentWord);
    recordPronunciationBtn.removeEventListener('click', startRecording);
    stopRecordingBtn.removeEventListener('click', stopRecording);
    playRecordingBtn.removeEventListener('click', playRecording);
    nextWordBtn.removeEventListener('click', selectRandomWord);
}

// Função para embaralhar array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para reproduzir texto usando a API de síntese de voz
function speakText(text) {
    // Cancelar qualquer fala anterior
    speechSynthesis.cancel();
    
    // Criar um novo objeto de fala
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Configurar a voz (preferência para vozes em inglês)
    const englishVoice = voices.find(voice => voice.lang.includes('en-'));
    if (englishVoice) {
        utterance.voice = englishVoice;
    }
    
    // Configurar parâmetros da fala
    utterance.rate = 0.9; // Um pouco mais lento para crianças
    utterance.pitch = 1.1; // Um pouco mais agudo
    utterance.volume = 1.0; // Volume máximo
    
    // Reproduzir a fala
    speechSynthesis.speak(utterance);
}

// Função para reproduzir som de sucesso
function playSuccessSound() {
    // Criar um contexto de áudio
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Criar um oscilador para o som
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Configurar o oscilador
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // Dó (C5)
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2); // Mi (E5)
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.4); // Sol (G5)
    
    // Configurar o volume
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
    
    // Conectar os nós
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Reproduzir o som
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.6);
}

// Funções do Modo Aprender
function setupLearnMode(category) {
    // Obter dados da categoria (vocabulário ou frases)
    const categoryData = (currentMode === 'phrases')
        ? (phrasesData[category] || [])
        : (vocabularyData[category] || []);
    learnModeData = [...categoryData];
    currentFlashcardIndex = 0;
    
    // Mostrar o primeiro flashcard
    showCurrentFlashcard();
}

function showCurrentFlashcard() {
    if (learnModeData.length === 0) return;
    
    const currentItem = learnModeData[currentFlashcardIndex];
    
    // Atualizar conteúdo conforme o modo
    if (currentMode === 'phrases') {
        // Frente com texto (EN), sem imagem
        if (flashcardImage) flashcardImage.style.display = 'none';
        if (flashcardFrontText) {
            flashcardFrontText.textContent = currentItem.english;
            flashcardFrontText.style.display = 'block';
        }
        // Verso com tradução (PT) e referência (EN menor)
        flashcardWord.textContent = currentItem.portuguese;
        if (flashcardTranslation) {
            flashcardTranslation.textContent = currentItem.english;
            flashcardTranslation.style.display = 'block';
        }
    } else {
        // Vocabulário: frente imagem, verso palavra em EN
        if (flashcardImage) {
            flashcardImage.src = currentItem.image;
            flashcardImage.alt = currentItem.english;
            flashcardImage.style.display = 'block';
        }
        if (flashcardFrontText) {
            flashcardFrontText.textContent = '';
            flashcardFrontText.style.display = 'none';
        }
        flashcardWord.textContent = currentItem.english;
        if (flashcardTranslation) {
            flashcardTranslation.textContent = '';
            flashcardTranslation.style.display = 'none';
        }
    }
    
    // Atualizar contador
    flashcardCounter.textContent = `${currentFlashcardIndex + 1} / ${learnModeData.length}`;
    
    // Resetar estado do flashcard (mostrar frente)
    flashcard.classList.remove('flipped');
    
    // Atualizar estado dos botões
    prevFlashcardBtn.disabled = currentFlashcardIndex === 0;
    nextFlashcardBtn.disabled = currentFlashcardIndex === learnModeData.length - 1;
}

function flipFlashcard() {
    flashcard.classList.toggle('flipped');
}

function showPreviousFlashcard() {
    if (currentFlashcardIndex > 0) {
        currentFlashcardIndex--;
        showCurrentFlashcard();
    }
}

function showNextFlashcard() {
    if (currentFlashcardIndex < learnModeData.length - 1) {
        currentFlashcardIndex++;
        showCurrentFlashcard();
    }
}

function playFlashcardAudio() {
    if (learnModeData.length === 0) return;
    
    const currentItem = learnModeData[currentFlashcardIndex];
    speakText(currentItem.english);
}

function resetLearnMode() {
    learnModeData = [];
    currentFlashcardIndex = 0;
    flashcard.classList.remove('flipped');
}

// ==========================
// Caça-Palavras
// ==========================

let wordSearchGrid = [];
let placedWords = [];
let isSelecting = false;
let selectionCells = [];
let selectionPositions = [];
let foundWordsCount = 0;
let wordSearchDifficulty = 'normal';

function setupWordSearchGame(category) {
    resetWordSearchGame();
    if (!category || !vocabularyData[category]) {
        alert('Por favor, selecione uma categoria válida!');
        return;
    }

    // Selecionar até 8 palavras da categoria respeitando o tamanho da grade
    const categoryData = [...vocabularyData[category]];
    let size = (wordSearchDifficulty === 'easy') ? 10 : 12;
    const fits = categoryData.filter(item => item.english.replace(/\s+/g, '').length <= size);
    let selected = [];
    if (fits.length >= 8) {
        selected = fits.slice(0, 8);
    } else {
        // Não há palavras suficientes que caibam na grade fácil, usar grade 12x12
        size = 12;
        selected = categoryData.slice(0, Math.min(8, categoryData.length));
    }

    // Preparar palavras (remover espaços para posicionamento)
    const wordsForPlacement = selected.map(item => ({
        original: item.english,
        normalized: item.english.replace(/\s+/g, '').toUpperCase()
    }));

    // Criar grade vazia conforme dificuldade
    wordSearchGrid = Array.from({ length: size }, () => Array.from({ length: size }, () => ''));
    placedWords = [];
    foundWordsCount = 0;

    // Posicionar palavras na grade
    wordsForPlacement.forEach(w => placeWordInGrid(wordSearchGrid, w));

    // Preencher espaços vazios com letras aleatórias
    fillEmptyWithRandomLetters(wordSearchGrid);

    // Renderizar grade
    renderWordSearchGrid(wordSearchGrid);

    // Renderizar lista de palavras
    renderWordList(selected.map(i => i.english));

    // Listener global para finalizar seleção
    document.addEventListener('mouseup', endSelection);
}

function placeWordInGrid(grid, wordObj) {
    const size = grid.length;
    const word = wordObj.normalized;
    const maxAttempts = 100;
    const directions = ['H', 'V']; // Horizontal ou Vertical

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        const dir = directions[Math.floor(Math.random() * directions.length)];
        let row = Math.floor(Math.random() * size);
        let col = Math.floor(Math.random() * size);

        if (dir === 'H') {
            if (col + word.length > size) {
                col = size - word.length;
            }
            if (canPlaceWord(grid, word, row, col, 0, 1)) {
                const positions = [];
                for (let i = 0; i < word.length; i++) {
                    grid[row][col + i] = word[i];
                    positions.push({ r: row, c: col + i });
                }
                placedWords.push({ original: wordObj.original, normalized: word, positions, found: false });
                return true;
            }
        } else {
            if (row + word.length > size) {
                row = size - word.length;
            }
            if (canPlaceWord(grid, word, row, col, 1, 0)) {
                const positions = [];
                for (let i = 0; i < word.length; i++) {
                    grid[row + i][col] = word[i];
                    positions.push({ r: row + i, c: col });
                }
                placedWords.push({ original: wordObj.original, normalized: word, positions, found: false });
                return true;
            }
        }
    }
    // Se não conseguir posicionar, ignorar (palavra não entra)
    return false;
}

function canPlaceWord(grid, word, row, col, dr, dc) {
    for (let i = 0; i < word.length; i++) {
        const r = row + dr * i;
        const c = col + dc * i;
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
            return false;
        }
    }
    return true;
}

function fillEmptyWithRandomLetters(grid) {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            if (!grid[r][c]) {
                grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }
}

function renderWordSearchGrid(grid) {
    if (!wordGridElement) return;
    wordGridElement.innerHTML = '';
    // Ajustar colunas conforme o tamanho da grade
    wordGridElement.style.gridTemplateColumns = `repeat(${grid.length}, 40px)`;
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.textContent = grid[r][c];
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener('mousedown', startSelection);
            cell.addEventListener('mouseover', continueSelection);
            wordGridElement.appendChild(cell);
        }
    }
}

function renderWordList(words) {
    if (!wordListElement) return;
    wordListElement.innerHTML = '';
    words.forEach(w => {
        const item = document.createElement('div');
        item.className = 'word-item';
        item.textContent = w;
        item.dataset.word = w;
        wordListElement.appendChild(item);
    });
}

function startSelection(e) {
    isSelecting = true;
    clearTemporarySelection();
    addCellToSelection(e.target);
}

function continueSelection(e) {
    if (!isSelecting) return;
    addCellToSelection(e.target);
}

function endSelection() {
    if (!isSelecting) return;
    isSelecting = false;
    // Verificar se seleção corresponde a alguma palavra posicionada
    const match = placedWords.find(p => comparePositions(selectionPositions, p.positions));
    if (match && !match.found) {
        // Marcar como encontrada
        selectionCells.forEach(cell => {
            cell.classList.remove('selected');
            cell.classList.add('found');
        });
        match.found = true;
        foundWordsCount++;
        // Atualizar lista
        const listItem = wordListElement.querySelector(`[data-word="${match.original}"]`);
        if (listItem) listItem.classList.add('found');

        // Verificar término
        if (foundWordsCount === placedWords.length) {
            setTimeout(() => {
                alert('Parabéns! Você encontrou todas as palavras!');
                resetWordSearchGame();
                wordSearchContainer.style.display = 'none';
                gameSelectionSection.style.display = 'block';
            }, 500);
        }
    } else {
        // Limpar seleção temporária
        clearTemporarySelection();
    }
    selectionCells = [];
    selectionPositions = [];
}

function addCellToSelection(cell) {
    if (!cell.classList.contains('grid-cell')) return;
    const r = parseInt(cell.dataset.row, 10);
    const c = parseInt(cell.dataset.col, 10);

    // Se primeira célula, apenas adiciona
    if (selectionPositions.length === 0) {
        selectionPositions.push({ r, c });
        selectionCells.push(cell);
        cell.classList.add('selected');
        return;
    }

    // Garantir linha reta (horizontal ou vertical) e adjacência
    const last = selectionPositions[selectionPositions.length - 1];
    const drTotal = r - selectionPositions[0].r;
    const dcTotal = c - selectionPositions[0].c;

    let direction = null;
    if (Math.abs(drTotal) >= Math.abs(dcTotal)) {
        direction = 'V';
    } else {
        direction = 'H';
    }

    let valid = false;
    if (direction === 'H') {
        valid = (r === selectionPositions[0].r) && (Math.abs(c - last.c) === 1);
    } else {
        valid = (c === selectionPositions[0].c) && (Math.abs(r - last.r) === 1);
    }

    if (!valid) return;

    if (selectionPositions.some(pos => pos.r === r && pos.c === c)) return;

    selectionPositions.push({ r, c });
    selectionCells.push(cell);
    cell.classList.add('selected');
}

function clearTemporarySelection() {
    selectionCells.forEach(cell => cell.classList.remove('selected'));
}

function comparePositions(a, b) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i].r !== b[i].r || a[i].c !== b[i].c) return false;
    }
    return true;
}

function resetWordSearchGame() {
    // Limpar UI
    if (wordGridElement) wordGridElement.innerHTML = '';
    if (wordListElement) wordListElement.innerHTML = '';
    // Remover listeners globais
    document.removeEventListener('mouseup', endSelection);
    // Resetar estado
    wordSearchGrid = [];
    placedWords = [];
    isSelecting = false;
    selectionCells = [];
    selectionPositions = [];
    foundWordsCount = 0;
}

// Iniciar o jogo de escuta
let listeningMode = 'general';
let currentListeningCorrectWord = null;
let listeningRound = 0;
let listeningScore = 0;

function startListeningQuiz() {
    // Obter conjunto de perguntas conforme o modo atual (vocabulário x frases)
    const allWords = (currentMode === 'phrases')
        ? Object.values(phrasesData).flat()
        : Object.values(vocabularyData).flat();
    const dataset = (listeningMode === 'category' && currentCategory)
        ? ((currentMode === 'phrases') ? (phrasesData[currentCategory] || []) : (vocabularyData[currentCategory] || []))
        : allWords;
    
    if (!dataset || dataset.length === 0) return;

    // Selecionar uma palavra aleatória como correta
    const correctWord = dataset[Math.floor(Math.random() * dataset.length)];
    currentListeningCorrectWord = correctWord;
    listeningRound += 1;
    if (typeof updateListeningStats === 'function') updateListeningStats();
    
    // Falar a palavra correta
    speakText(correctWord.english);
    
    // Obter 3 palavras aleatórias e diferentes como opções incorretas
    const incorrectOptions = [];
    while (incorrectOptions.length < 3) {
        const randomWord = dataset[Math.floor(Math.random() * dataset.length)];
        if (randomWord.english !== correctWord.english && !incorrectOptions.some(option => option.english === randomWord.english)) {
            incorrectOptions.push(randomWord);
        }
    }
    
    // Juntar e embaralhar as opções
    const options = shuffleArray([correctWord, ...incorrectOptions]);
    
    // Limpar as opções anteriores
    quizOptions.innerHTML = '';
    
    // Criar e adicionar as novas opções (imagem para vocabulário, texto para frases)
    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.dataset.en = option.english;
        if (currentMode === 'phrases') {
            // Mostrar tradução em PT como opção
            optionElement.textContent = option.portuguese;
        } else {
            optionElement.innerHTML = `<img src="${option.image}" alt="${option.english}">`;
        }
        
        optionElement.addEventListener('click', () => {
            // Remover a classe 'selected' de todas as opções
            document.querySelectorAll('#quiz-options .option').forEach(el => el.classList.remove('selected'));
            
            // Adicionar a classe 'selected' à opção clicada
            optionElement.classList.add('selected');
            
            // Verificar a resposta usando o valor EN associado
            checkListeningAnswer(optionElement.dataset.en, correctWord.english, optionElement);
        });
        
        quizOptions.appendChild(optionElement);
    });
}

// Verificar a resposta do jogo de escuta
function checkListeningAnswer(selectedWord, correctWord, element) {
    // Desabilitar cliques para evitar múltiplas respostas
    document.querySelectorAll('#quiz-options .option').forEach(el => el.style.pointerEvents = 'none');
    
    if (selectedWord === correctWord) {
        element.classList.add('correct');
        playSuccessSound();
        listeningScore += 1;
        if (typeof updateListeningStats === 'function') updateListeningStats();
        
        // Ir para a próxima pergunta após um pequeno atraso
        setTimeout(() => {
            startListeningQuiz();
            // Reabilitar cliques
            document.querySelectorAll('#quiz-options .option').forEach(el => el.style.pointerEvents = 'auto');
        }, 1500);
        
    } else {
        element.classList.add('incorrect');
        
        // Encontrar e destacar a resposta correta (compatível com imagem/texto)
        const correctElement = Array.from(document.querySelectorAll('#quiz-options .option')).find(el => el.dataset.en === correctWord);
        if (correctElement) {
            correctElement.classList.add('correct');
        }
        
        // Ir para a próxima pergunta após um atraso maior
        setTimeout(() => {
            startListeningQuiz();
            // Reabilitar cliques
            document.querySelectorAll('#quiz-options .option').forEach(el => el.style.pointerEvents = 'auto');
        }, 2500);
    }
}

// Adicionar evento de clique ao botão de som do quiz
playSoundBtn.addEventListener('click', () => {
    if (currentListeningCorrectWord) {
        speakText(currentListeningCorrectWord.english);
    }
});

function updateListeningStats() {
    if (listeningScoreEl) listeningScoreEl.textContent = listeningScore;
    if (listeningRoundEl) listeningRoundEl.textContent = listeningRound;
}

function resetListeningQuiz() {
    quizOptions.innerHTML = '';
    currentListeningCorrectWord = null;
    listeningRound = 0;
    listeningScore = 0;
    updateListeningStats();
}

// ==========================
// Quiz 2 Alternativas (Animais)
// ==========================
let currentTwoChoiceCorrect = null;
let twoChoiceRound = 0;
let twoChoiceScore = 0;
let currentTwoChoiceQuestionEn = '';
let currentTwoChoiceQuestionPt = '';

function extractNumberFromImagePath(imagePath) {
    const m = imagePath && imagePath.match(/numbers\/(\d+)\.svg/i);
    return m ? parseInt(m[1], 10) : null;
}

function generateTwoChoiceQuestion(catKey) {
    const dataset = vocabularyData[catKey] || [];
    if (!dataset || dataset.length < 2) return null;

    // Numbers categories: generate basic math questions
    if (catKey.startsWith('numbers')) {
        const correctItem = dataset[Math.floor(Math.random() * dataset.length)];
        const values = dataset
            .map(it => extractNumberFromImagePath(it.image))
            .filter(v => typeof v === 'number');
        const maxVal = values.length ? Math.max(...values) : 10;
        const correctVal = extractNumberFromImagePath(correctItem.image);
        if (typeof correctVal !== 'number') return null;

        const ops = ['+', '-'];
        const op = ops[Math.floor(Math.random() * ops.length)];
        let a, b, text;
        if (op === '+') {
            a = Math.floor(Math.random() * (correctVal + 1));
            b = correctVal - a;
            const textEn = `What is ${a} + ${b}?`;
            const textPt = `Quanto é ${a} + ${b}?`;
            // pick a wrong item
            let wrongItem = correctItem;
            while (wrongItem === correctItem) {
                wrongItem = dataset[Math.floor(Math.random() * dataset.length)];
            }
            return { textEn, textPt, correctItem, wrongItem };
        } else { // '-'
            const extra = Math.floor(Math.random() * (Math.max(1, maxVal - correctVal + 1)));
            a = correctVal + extra;
            b = a - correctVal;
            const textEn = `What is ${a} - ${b}?`;
            const textPt = `Quanto é ${a} - ${b}?`;
            // pick a wrong item
            let wrongItem = correctItem;
            while (wrongItem === correctItem) {
                wrongItem = dataset[Math.floor(Math.random() * dataset.length)];
            }
            return { textEn, textPt, correctItem, wrongItem };
        }
        // (handled in branches)
    }
    // Thematic fact-based questions for animals, colors, fruits, and body parts
    const available = new Set(dataset.map(it => it.english));
    let factBank = [];

    if (catKey === 'farm-animals') {
        if (available.has('Cow')) factBank.push({ textEn: 'Which animal provides milk?', textPt: 'Qual animal fornece leite?', answerEnglish: 'Cow' });
        if (available.has('Sheep')) factBank.push({ textEn: 'Which animal has wool?', textPt: 'Qual animal tem lã?', answerEnglish: 'Sheep' });
        if (available.has('Chicken')) factBank.push({ textEn: 'Which animal lays eggs?', textPt: 'Qual animal bota ovos?', answerEnglish: 'Chicken' });
        if (available.has('Duck')) factBank.push({ textEn: 'Which animal lives in water and lays eggs?', textPt: 'Qual animal vive na água e bota ovos?', answerEnglish: 'Duck' });
        if (available.has('Pig')) factBank.push({ textEn: "Which animal says 'oink'?", textPt: "Qual animal faz 'oink'?", answerEnglish: 'Pig' });
        if (available.has('Horse')) factBank.push({ textEn: 'Which animal is used for riding?', textPt: 'Qual animal é usado para montar?', answerEnglish: 'Horse' });
        if (available.has('Goat')) factBank.push({ textEn: 'Which animal has horns?', textPt: 'Qual animal tem chifres?', answerEnglish: 'Goat' });
        if (available.has('Rabbit')) factBank.push({ textEn: 'Which animal is known for liking carrots?', textPt: 'Qual animal é conhecido por gostar de cenouras?', answerEnglish: 'Rabbit' });
        // Advanced: sound-based questions
        if (available.has('Cow')) factBank.push({ textEn: "Which animal says 'moo'?", textPt: "Qual animal faz 'muu'?", answerEnglish: 'Cow' });
        if (available.has('Sheep')) factBank.push({ textEn: "Which animal says 'baa'?", textPt: "Qual animal faz 'bé'?", answerEnglish: 'Sheep' });
        if (available.has('Horse')) factBank.push({ textEn: "Which animal says 'neigh'?", textPt: "Qual animal faz 'relincha'?", answerEnglish: 'Horse' });
        if (available.has('Goat')) factBank.push({ textEn: "Which animal says 'bleat'?", textPt: "Qual animal faz 'balir'?", answerEnglish: 'Goat' });
        if (available.has('Chicken')) factBank.push({ textEn: "Which animal says 'cluck'?", textPt: "Qual animal faz 'cócó'?", answerEnglish: 'Chicken' });
        if (available.has('Duck')) factBank.push({ textEn: "Which animal says 'quack'?", textPt: "Qual animal faz 'quá-quá'?", answerEnglish: 'Duck' });
    } else if (catKey === 'zoo-animals') {
        if (available.has('Lion')) factBank.push({ textEn: 'Which animal is called the king of the jungle?', textPt: 'Qual animal é chamado de rei da selva?', answerEnglish: 'Lion' });
        if (available.has('Elephant')) factBank.push({ textEn: 'Which animal has a long trunk?', textPt: 'Qual animal tem uma tromba longa?', answerEnglish: 'Elephant' });
        if (available.has('Giraffe')) factBank.push({ textEn: 'Which animal has a very long neck?', textPt: 'Qual animal tem o pescoço muito longo?', answerEnglish: 'Giraffe' });
        if (available.has('Zebra')) factBank.push({ textEn: 'Which animal has black and white stripes?', textPt: 'Qual animal tem listras pretas e brancas?', answerEnglish: 'Zebra' });
        if (available.has('Hippo')) factBank.push({ textEn: 'Which big animal lives in water?', textPt: 'Qual animal é grande e vive na água?', answerEnglish: 'Hippo' });
        if (available.has('Tiger')) factBank.push({ textEn: 'Which big cat has stripes and lives in forests?', textPt: 'Qual felino tem listras e vive em florestas?', answerEnglish: 'Tiger' });
        if (available.has('Penguin')) factBank.push({ textEn: 'Which animal lives in cold places and cannot fly?', textPt: 'Qual animal vive no frio e não voa?', answerEnglish: 'Penguin' });
        if (available.has('Monkey')) factBank.push({ textEn: 'Which animal is agile and likes climbing trees?', textPt: 'Qual animal é ágil e gosta de escalar árvores?', answerEnglish: 'Monkey' });
        // Advanced: emphasis on roar for lion
        if (available.has('Lion')) factBank.push({ textEn: "Which animal roars loudly?", textPt: "Qual animal ruge bem alto?", answerEnglish: 'Lion' });
    } else if (catKey === 'pets') {
        if (available.has('Dog')) factBank.push({ textEn: 'Which animal is known as man’s best friend?', textPt: 'Qual animal é conhecido como o melhor amigo do homem?', answerEnglish: 'Dog' });
        if (available.has('Cat')) factBank.push({ textEn: 'Which animal likes to meow and purr?', textPt: 'Qual animal gosta de miar e ronronar?', answerEnglish: 'Cat' });
        if (available.has('Bird')) factBank.push({ textEn: 'Which animal can fly?', textPt: 'Qual animal pode voar?', answerEnglish: 'Bird' });
        if (available.has('Fish')) factBank.push({ textEn: 'Which animal lives in water and breathes through gills?', textPt: 'Qual animal vive na água e respira pelas brânquias?', answerEnglish: 'Fish' });
        if (available.has('Rabbit')) factBank.push({ textEn: 'Which animal is small, fast, and loves carrots?', textPt: 'Qual animal é pequeno, rápido e adora cenouras?', answerEnglish: 'Rabbit' });
        // Advanced: sound-based
        if (available.has('Dog')) factBank.push({ textEn: "Which animal barks?", textPt: "Qual animal late?", answerEnglish: 'Dog' });
        if (available.has('Cat')) factBank.push({ textEn: "Which animal meows?", textPt: "Qual animal mia?", answerEnglish: 'Cat' });
        if (available.has('Bird')) factBank.push({ textEn: "Which animal chirps?", textPt: "Qual animal chilreia?", answerEnglish: 'Bird' });
    } else if (catKey === 'colors') {
        if (available.has('Blue')) factBank.push({ textEn: 'Which color is the sky?', textPt: 'Qual cor é o céu?', answerEnglish: 'Blue' });
        if (available.has('Green')) factBank.push({ textEn: 'Which color is grass?', textPt: 'Qual cor é a grama?', answerEnglish: 'Green' });
        if (available.has('Yellow')) factBank.push({ textEn: 'Which color is a banana?', textPt: 'Qual cor é uma banana?', answerEnglish: 'Yellow' });
        if (available.has('Red')) factBank.push({ textEn: 'Which color is a ripe strawberry?', textPt: 'Qual cor é um morango maduro?', answerEnglish: 'Red' });
        if (available.has('White')) factBank.push({ textEn: 'Which color are clouds?', textPt: 'Qual cor são as nuvens?', answerEnglish: 'White' });
        if (available.has('Black')) factBank.push({ textEn: 'Which color is coal?', textPt: 'Qual cor é o carvão?', answerEnglish: 'Black' });
        if (available.has('Purple')) factBank.push({ textEn: 'Which color is made by mixing red and blue?', textPt: 'Qual cor resulta da mistura de vermelho e azul?', answerEnglish: 'Purple' });
        if (available.has('Orange')) factBank.push({ textEn: 'Which color is the fruit orange?', textPt: 'Qual cor é a fruta laranja?', answerEnglish: 'Orange' });
        // Advanced: mixing colors
        if (available.has('Green') && available.has('Blue') && available.has('Yellow')) {
            factBank.push({ textEn: 'Which color is made by mixing blue and yellow?', textPt: 'Qual cor resulta da mistura de azul e amarelo?', answerEnglish: 'Green' });
        }
        if (available.has('Orange') && available.has('Red') && available.has('Yellow')) {
            factBank.push({ textEn: 'Which color is made by mixing red and yellow?', textPt: 'Qual cor resulta da mistura de vermelho e amarelo?', answerEnglish: 'Orange' });
        }
    } else if (catKey === 'fruits') {
        if (available.has('Banana')) factBank.push({ textEn: 'Which fruit is yellow and curved?', textPt: 'Qual fruta é amarela e curvada?', answerEnglish: 'Banana' });
        if (available.has('Strawberry')) factBank.push({ textEn: 'Which fruit is red with seeds on the outside?', textPt: 'Qual fruta é vermelha com sementes por fora?', answerEnglish: 'Strawberry' });
        if (available.has('Orange')) factBank.push({ textEn: 'Which fruit is orange and round?', textPt: 'Qual fruta é laranja e redonda?', answerEnglish: 'Orange' });
        if (available.has('Apple')) factBank.push({ textEn: 'Which fruit is often red and grows on trees?', textPt: 'Qual fruta costuma ser vermelha e cresce em árvores?', answerEnglish: 'Apple' });
        if (available.has('Grape')) factBank.push({ textEn: 'Which fruit is small and grows in bunches?', textPt: 'Qual fruta é pequena e cresce em cachos?', answerEnglish: 'Grape' });
        if (available.has('Watermelon')) factBank.push({ textEn: 'Which big fruit is green outside and red inside?', textPt: 'Qual fruta grande é verde por fora e vermelha por dentro?', answerEnglish: 'Watermelon' });
        if (available.has('Pineapple')) factBank.push({ textEn: 'Which fruit has a spiky crown?', textPt: 'Qual fruta tem uma coroa pontiaguda?', answerEnglish: 'Pineapple' });
        if (available.has('Pear')) factBank.push({ textEn: 'Which fruit is green and shaped like a teardrop?', textPt: 'Qual fruta é verde e em formato de gota?', answerEnglish: 'Pear' });
        // Advanced: classification hints
        if (available.has('Orange')) factBank.push({ textEn: 'Which fruit is a citrus?', textPt: 'Qual fruta é cítrica?', answerEnglish: 'Orange' });
        if (available.has('Pineapple')) factBank.push({ textEn: 'Which fruit has rough, spiky skin?', textPt: 'Qual fruta tem casca áspera e pontiaguda?', answerEnglish: 'Pineapple' });
        if (available.has('Grape')) factBank.push({ textEn: 'Which fruit grows in clusters/bunches?', textPt: 'Qual fruta cresce em cachos?', answerEnglish: 'Grape' });
        if (available.has('Apple')) factBank.push({ textEn: 'Which fruit is round and often red?', textPt: 'Qual fruta é redonda e muitas vezes vermelha?', answerEnglish: 'Apple' });
    } else if (catKey === 'body-parts') {
        if (available.has('Eye')) factBank.push({ textEn: 'Which body part do we use to see?', textPt: 'Qual parte do corpo usamos para ver?', answerEnglish: 'Eye' });
        if (available.has('Ear')) factBank.push({ textEn: 'Which body part do we use to hear?', textPt: 'Qual parte do corpo usamos para ouvir?', answerEnglish: 'Ear' });
        if (available.has('Nose')) factBank.push({ textEn: 'Which body part do we use to smell?', textPt: 'Qual parte do corpo usamos para cheirar?', answerEnglish: 'Nose' });
        if (available.has('Mouth')) factBank.push({ textEn: 'Which body part do we use to talk and eat?', textPt: 'Qual parte do corpo usamos para falar e comer?', answerEnglish: 'Mouth' });
        if (available.has('Hand')) factBank.push({ textEn: 'Which body part do we use to hold things?', textPt: 'Qual parte do corpo usamos para segurar objetos?', answerEnglish: 'Hand' });
        if (available.has('Foot')) factBank.push({ textEn: 'Which body part do we use to walk?', textPt: 'Qual parte do corpo usamos para andar?', answerEnglish: 'Foot' });
        if (available.has('Arm')) factBank.push({ textEn: 'Which body part connects shoulder to hand?', textPt: 'Qual parte do corpo liga o ombro à mão?', answerEnglish: 'Arm' });
        if (available.has('Head')) factBank.push({ textEn: 'Which body part contains the brain?', textPt: 'Qual parte do corpo contém o cérebro?', answerEnglish: 'Head' });
    } else if (catKey === 'school-supplies') {
        if (available.has('Pencil')) factBank.push({ textEn: 'Which item writes without ink?', textPt: 'Qual item escreve sem tinta?', answerEnglish: 'Pencil' });
        if (available.has('Pen')) factBank.push({ textEn: 'Which item writes with ink?', textPt: 'Qual item escreve com tinta?', answerEnglish: 'Pen' });
        if (available.has('Scissors')) factBank.push({ textEn: 'Which item cuts paper?', textPt: 'Qual item corta papel?', answerEnglish: 'Scissors' });
        if (available.has('Ruler')) factBank.push({ textEn: 'Which item measures length?', textPt: 'Qual item mede comprimento?', answerEnglish: 'Ruler' });
        if (available.has('Eraser')) factBank.push({ textEn: 'Which item removes pencil marks?', textPt: 'Qual item apaga marcas de lápis?', answerEnglish: 'Eraser' });
        if (available.has('Notebook')) factBank.push({ textEn: 'Which item has pages to write on?', textPt: 'Qual item tem páginas para escrever?', answerEnglish: 'Notebook' });
        if (available.has('Backpack')) factBank.push({ textEn: 'Which item carries school things?', textPt: 'Qual item carrega materiais escolares?', answerEnglish: 'Backpack' });
        if (available.has('Book')) factBank.push({ textEn: 'Which item has many pages to read?', textPt: 'Qual item tem muitas páginas para ler?', answerEnglish: 'Book' });
    } else if (catKey === 'toys') {
        if (available.has('Ball')) factBank.push({ textEn: 'Which toy bounces?', textPt: 'Qual brinquedo quica?', answerEnglish: 'Ball' });
        if (available.has('Car')) factBank.push({ textEn: 'Which toy has wheels?', textPt: 'Qual brinquedo tem rodas?', answerEnglish: 'Car' });
        if (available.has('Puzzle')) factBank.push({ textEn: 'Which toy has pieces that fit together?', textPt: 'Qual brinquedo tem peças que se encaixam?', answerEnglish: 'Puzzle' });
        if (available.has('Teddy Bear')) factBank.push({ textEn: 'Which toy is soft to cuddle?', textPt: 'Qual brinquedo é macio para abraçar?', answerEnglish: 'Teddy Bear' });
        if (available.has('Robot')) factBank.push({ textEn: 'Which toy is a robot?', textPt: 'Qual brinquedo é um robô?', answerEnglish: 'Robot' });
        if (available.has('Blocks')) factBank.push({ textEn: 'Which toy is for building?', textPt: 'Qual brinquedo é de blocos para construir?', answerEnglish: 'Blocks' });
        if (available.has('Kite')) factBank.push({ textEn: 'Which toy flies in the wind?', textPt: 'Qual brinquedo voa ao vento?', answerEnglish: 'Kite' });
        if (available.has('Doll')) factBank.push({ textEn: 'Which toy is a doll?', textPt: 'Qual brinquedo é uma boneca?', answerEnglish: 'Doll' });
    } else if (catKey === 'nature') {
        if (available.has('Sun')) factBank.push({ textEn: 'Which object shines during the day?', textPt: 'Qual objeto brilha durante o dia?', answerEnglish: 'Sun' });
        if (available.has('Moon')) factBank.push({ textEn: 'Which object shines at night?', textPt: 'Qual objeto brilha à noite?', answerEnglish: 'Moon' });
        if (available.has('River')) factBank.push({ textEn: 'Which natural feature is a flowing water?', textPt: 'Qual elemento natural é um curso de água?', answerEnglish: 'River' });
        if (available.has('Flower')) factBank.push({ textEn: 'Which natural item has petals?', textPt: 'Qual elemento natural tem pétalas?', answerEnglish: 'Flower' });
        if (available.has('Tree')) factBank.push({ textEn: 'Which natural item has a trunk and leaves?', textPt: 'Qual elemento natural tem tronco e folhas?', answerEnglish: 'Tree' });
        if (available.has('Rainbow')) factBank.push({ textEn: 'Which phenomenon has many colors?', textPt: 'Qual fenômeno tem muitas cores?', answerEnglish: 'Rainbow' });
        if (available.has('Cloud')) factBank.push({ textEn: 'Which item is white and fluffy in the sky?', textPt: 'Qual item é branco e fofo no céu?', answerEnglish: 'Cloud' });
        if (available.has('Star')) factBank.push({ textEn: 'Which item twinkles in the night sky?', textPt: 'Qual item cintila no céu noturno?', answerEnglish: 'Star' });
    } else if (catKey === 'clothes') {
        if (available.has('Shirt')) factBank.push({ textEn: 'Which clothing is worn on the upper body?', textPt: 'Qual roupa é usada na parte superior do corpo?', answerEnglish: 'Shirt' });
        if (available.has('Pants')) factBank.push({ textEn: 'Which clothing is worn on the legs?', textPt: 'Qual roupa é usada nas pernas?', answerEnglish: 'Pants' });
        if (available.has('Dress')) factBank.push({ textEn: 'Which clothing is a dress?', textPt: 'Qual roupa é um vestido?', answerEnglish: 'Dress' });
        if (available.has('Shoes')) factBank.push({ textEn: 'Which clothing is footwear?', textPt: 'Qual roupa é um calçado?', answerEnglish: 'Shoes' });
        if (available.has('Hat')) factBank.push({ textEn: 'Which clothing is worn on the head?', textPt: 'Qual roupa é usada na cabeça?', answerEnglish: 'Hat' });
        if (available.has('Socks')) factBank.push({ textEn: 'Which clothing is worn on the feet inside shoes?', textPt: 'Qual roupa é usada nos pés, dentro dos sapatos?', answerEnglish: 'Socks' });
        if (available.has('Jacket')) factBank.push({ textEn: 'Which clothing is a jacket?', textPt: 'Qual roupa é uma jaqueta?', answerEnglish: 'Jacket' });
        if (available.has('Scarf')) factBank.push({ textEn: 'Which clothing is worn around the neck?', textPt: 'Qual roupa é usada ao redor do pescoço?', answerEnglish: 'Scarf' });
    } else if (catKey === 'weather') {
        if (available.has('Sunny')) factBank.push({ textEn: 'Which weather has sun?', textPt: 'Qual clima tem sol?', answerEnglish: 'Sunny' });
        if (available.has('Rainy')) factBank.push({ textEn: 'Which weather has rain?', textPt: 'Qual clima tem chuva?', answerEnglish: 'Rainy' });
        if (available.has('Cloudy')) factBank.push({ textEn: 'Which weather has clouds?', textPt: 'Qual clima tem nuvens?', answerEnglish: 'Cloudy' });
        if (available.has('Snowy')) factBank.push({ textEn: 'Which weather has snow?', textPt: 'Qual clima tem neve?', answerEnglish: 'Snowy' });
        if (available.has('Windy')) factBank.push({ textEn: 'Which weather has strong wind?', textPt: 'Qual clima tem vento forte?', answerEnglish: 'Windy' });
        if (available.has('Stormy')) factBank.push({ textEn: 'Which weather has thunder and lightning?', textPt: 'Qual clima tem trovões e relâmpagos?', answerEnglish: 'Stormy' });
        if (available.has('Foggy')) factBank.push({ textEn: 'Which weather has fog?', textPt: 'Qual clima tem neblina?', answerEnglish: 'Foggy' });
        if (available.has('Rainbow')) factBank.push({ textEn: 'Which appears after rain with sun?', textPt: 'O que aparece após a chuva com sol?', answerEnglish: 'Rainbow' });
    } else if (catKey === 'weekdays') {
        if (available.has('Monday')) factBank.push({ textEn: 'Which day starts the week for many people?', textPt: 'Qual dia inicia a semana para muitas pessoas?', answerEnglish: 'Monday' });
        if (available.has('Tuesday')) factBank.push({ textEn: 'Which day comes after Monday?', textPt: 'Qual dia vem após a segunda-feira?', answerEnglish: 'Tuesday' });
        if (available.has('Thursday')) factBank.push({ textEn: 'Which day comes before Friday?', textPt: 'Qual dia vem antes da sexta-feira?', answerEnglish: 'Thursday' });
        if (available.has('Saturday')) factBank.push({ textEn: 'Which day is part of the weekend?', textPt: 'Qual dia faz parte do fim de semana?', answerEnglish: 'Saturday' });
        if (available.has('Sunday')) factBank.push({ textEn: 'Which day is the last day of the week for many?', textPt: 'Qual dia é o último da semana para muitos?', answerEnglish: 'Sunday' });

        // Advanced: dynamic sequence questions (before/after with offsets)
        const weekdaysOrder = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
        const weekdaysPt = {
            'Monday': 'Segunda-feira',
            'Tuesday': 'Terça-feira',
            'Wednesday': 'Quarta-feira',
            'Thursday': 'Quinta-feira',
            'Friday': 'Sexta-feira',
            'Saturday': 'Sábado',
            'Sunday': 'Domingo'
        };
        (function makeWeekdaySequenceQuestion() {
            const validBases = weekdaysOrder.filter(d => available.has(d));
            if (validBases.length === 0) return;
            const offsets = [1, -1, 2, -2];
            let attempts = 10;
            while (attempts-- > 0) {
                const base = validBases[Math.floor(Math.random() * validBases.length)];
                const baseIdx = weekdaysOrder.indexOf(base);
                const offset = offsets[Math.floor(Math.random() * offsets.length)];
                const ansIdx = baseIdx + offset;
                if (ansIdx >= 0 && ansIdx < weekdaysOrder.length) {
                    const answer = weekdaysOrder[ansIdx];
                    if (available.has(answer)) {
                        const textPt = offset > 0
                            ? `Qual dia vem ${offset === 1 ? 'depois' : `${offset} dias depois`} de ${weekdaysPt[base]}?`
                            : `Qual dia vem ${offset === -1 ? 'antes' : `${Math.abs(offset)} dias antes`} de ${weekdaysPt[base]}?`;
                        const textEn = offset > 0
                            ? `Which day comes ${offset === 1 ? 'after' : `${offset} days after`} ${base}?`
                            : `Which day comes ${offset === -1 ? 'before' : `${Math.abs(offset)} days before`} ${base}?`;
                        factBank.push({ textEn, textPt, answerEnglish: answer });
                        break;
                    }
                }
            }
        })();
    } else if (catKey === 'months') {
        if (available.has('January')) factBank.push({ textEn: 'Which is the first month of the year?', textPt: 'Qual é o primeiro mês do ano?', answerEnglish: 'January' });
        if (available.has('December')) factBank.push({ textEn: 'Which is the last month of the year?', textPt: 'Qual é o último mês do ano?', answerEnglish: 'December' });
        if (available.has('November')) factBank.push({ textEn: 'Which month comes after October?', textPt: 'Qual mês vem após outubro?', answerEnglish: 'November' });
        if (available.has('February')) factBank.push({ textEn: 'Which month comes before March?', textPt: 'Qual mês vem antes de março?', answerEnglish: 'February' });

        // Advanced: dynamic order questions (next/previous months)
        const monthsOrder = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        const monthsPt = {
            'January': 'Janeiro',
            'February': 'Fevereiro',
            'March': 'Março',
            'April': 'Abril',
            'May': 'Maio',
            'June': 'Junho',
            'July': 'Julho',
            'August': 'Agosto',
            'September': 'Setembro',
            'October': 'Outubro',
            'November': 'Novembro',
            'December': 'Dezembro'
        };
        (function makeMonthSequenceQuestion() {
            const validBases = monthsOrder.filter(m => available.has(m));
            if (validBases.length === 0) return;
            const offsets = [1, -1, 2]; // keep reasonable difficulty
            let attempts = 10;
            while (attempts-- > 0) {
                const base = validBases[Math.floor(Math.random() * validBases.length)];
                const baseIdx = monthsOrder.indexOf(base);
                const offset = offsets[Math.floor(Math.random() * offsets.length)];
                const ansIdx = baseIdx + offset;
                if (ansIdx >= 0 && ansIdx < monthsOrder.length) {
                    const answer = monthsOrder[ansIdx];
                    if (available.has(answer)) {
                        const textPt = offset > 0
                            ? `Qual mês vem ${offset === 1 ? 'depois' : `${offset} meses depois`} de ${monthsPt[base]}?`
                            : `Qual mês vem ${offset === -1 ? 'antes' : `${Math.abs(offset)} meses antes`} de ${monthsPt[base]}?`;
                        const textEn = offset > 0
                            ? `Which month comes ${offset === 1 ? 'after' : `${offset} months after`} ${base}?`
                            : `Which month comes ${offset === -1 ? 'before' : `${Math.abs(offset)} months before`} ${base}?`;
                        factBank.push({ textEn, textPt, answerEnglish: answer });
                        break;
                    }
                }
            }
        })();
    } else if (catKey === 'vegetables') {
        if (available.has('Carrot')) factBank.push({ textEn: 'Which vegetable is orange and long?', textPt: 'Qual vegetal é laranja e comprido?', answerEnglish: 'Carrot' });
        if (available.has('Tomato')) factBank.push({ textEn: 'Which vegetable is red and used in salads?', textPt: 'Qual vegetal é vermelho e usado em saladas?', answerEnglish: 'Tomato' });
        if (available.has('Potato')) factBank.push({ textEn: 'Which vegetable is a brown tuber?', textPt: 'Qual vegetal é um tubérculo marrom?', answerEnglish: 'Potato' });
        if (available.has('Broccoli')) factBank.push({ textEn: 'Which vegetable is green and looks like a small tree?', textPt: 'Qual vegetal é verde e parece uma pequena árvore?', answerEnglish: 'Broccoli' });
        if (available.has('Corn')) factBank.push({ textEn: 'Which vegetable has yellow kernels?', textPt: 'Qual vegetal tem grãos amarelos?', answerEnglish: 'Corn' });
        if (available.has('Cucumber')) factBank.push({ textEn: 'Which vegetable is green and long, used in salads?', textPt: 'Qual vegetal é verde e comprido, usado em saladas?', answerEnglish: 'Cucumber' });
        if (available.has('Lettuce')) factBank.push({ textEn: 'Which vegetable is leafy and green?', textPt: 'Qual vegetal é verde e de folhas?', answerEnglish: 'Lettuce' });
        if (available.has('Onion')) factBank.push({ textEn: 'Which vegetable has layers and can make you cry?', textPt: 'Qual vegetal tem camadas e pode fazer chorar?', answerEnglish: 'Onion' });
    } else if (catKey === 'emotions') {
        if (available.has('Happy')) factBank.push({ textEn: 'Which emotion shows happiness?', textPt: 'Qual emoção mostra felicidade?', answerEnglish: 'Happy' });
        if (available.has('Sad')) factBank.push({ textEn: 'Which emotion shows sadness?', textPt: 'Qual emoção mostra tristeza?', answerEnglish: 'Sad' });
        if (available.has('Angry')) factBank.push({ textEn: 'Which emotion shows anger?', textPt: 'Qual emoção mostra raiva?', answerEnglish: 'Angry' });
        if (available.has('Scared')) factBank.push({ textEn: 'Which emotion shows fear?', textPt: 'Qual emoção mostra medo?', answerEnglish: 'Scared' });
        if (available.has('Surprised')) factBank.push({ textEn: 'Which emotion shows surprise?', textPt: 'Qual emoção mostra surpresa?', answerEnglish: 'Surprised' });
        if (available.has('Tired')) factBank.push({ textEn: 'Which emotion shows tiredness?', textPt: 'Qual emoção mostra cansaço?', answerEnglish: 'Tired' });
        if (available.has('Excited')) factBank.push({ textEn: 'Which emotion shows excitement?', textPt: 'Qual emoção mostra empolgação?', answerEnglish: 'Excited' });
        if (available.has('Confused')) factBank.push({ textEn: 'Which emotion shows confusion?', textPt: 'Qual emoção mostra confusão?', answerEnglish: 'Confused' });
    } else if (catKey === 'action-verbs') {
        if (available.has('Run')) factBank.push({ textEn: 'Which action shows moving fast?', textPt: 'Qual ação mostra movimento rápido?', answerEnglish: 'Run' });
        if (available.has('Jump')) factBank.push({ textEn: 'Which action shows jumping?', textPt: 'Qual ação mostra pular?', answerEnglish: 'Jump' });
        if (available.has('Swim')) factBank.push({ textEn: 'Which action is done in water?', textPt: 'Qual ação é feita na água?', answerEnglish: 'Swim' });
        if (available.has('Eat')) factBank.push({ textEn: 'Which action means to have food?', textPt: 'Qual ação significa comer?', answerEnglish: 'Eat' });
        if (available.has('Sleep')) factBank.push({ textEn: 'Which action means to rest at night?', textPt: 'Qual ação significa descansar à noite?', answerEnglish: 'Sleep' });
        if (available.has('Play')) factBank.push({ textEn: 'Which action means to have fun?', textPt: 'Qual ação significa se divertir?', answerEnglish: 'Play' });
        if (available.has('Read')) factBank.push({ textEn: 'Which action means to read a book?', textPt: 'Qual ação significa ler um livro?', answerEnglish: 'Read' });
        if (available.has('Write')) factBank.push({ textEn: 'Which action means to write words?', textPt: 'Qual ação significa escrever palavras?', answerEnglish: 'Write' });
    } else if (catKey === 'adjectives') {
        if (available.has('Big')) factBank.push({ textEn: 'Which adjective means large?', textPt: 'Qual adjetivo significa grande?', answerEnglish: 'Big' });
        if (available.has('Small')) factBank.push({ textEn: 'Which adjective means little?', textPt: 'Qual adjetivo significa pequeno?', answerEnglish: 'Small' });
        if (available.has('Fast')) factBank.push({ textEn: 'Which adjective means quick?', textPt: 'Qual adjetivo significa rápido?', answerEnglish: 'Fast' });
        if (available.has('Slow')) factBank.push({ textEn: 'Which adjective means not fast?', textPt: 'Qual adjetivo significa não rápido?', answerEnglish: 'Slow' });
        if (available.has('Hot')) factBank.push({ textEn: 'Which adjective means high temperature?', textPt: 'Qual adjetivo significa alta temperatura?', answerEnglish: 'Hot' });
        if (available.has('Cold')) factBank.push({ textEn: 'Which adjective means low temperature?', textPt: 'Qual adjetivo significa baixa temperatura?', answerEnglish: 'Cold' });
        if (available.has('Tall')) factBank.push({ textEn: 'Which adjective means having great height?', textPt: 'Qual adjetivo significa ter grande altura?', answerEnglish: 'Tall' });
        if (available.has('Short')) factBank.push({ textEn: 'Which adjective means not tall?', textPt: 'Qual adjetivo significa não alto?', answerEnglish: 'Short' });
    } else if (catKey === 'shapes') {
        if (available.has('Circle')) factBank.push({ textEn: 'Which shape is round?', textPt: 'Qual forma é redonda?', answerEnglish: 'Circle' });
        if (available.has('Square')) factBank.push({ textEn: 'Which shape has four equal sides?', textPt: 'Qual forma tem quatro lados iguais?', answerEnglish: 'Square' });
        if (available.has('Triangle')) factBank.push({ textEn: 'Which shape has three sides?', textPt: 'Qual forma tem três lados?', answerEnglish: 'Triangle' });
        if (available.has('Rectangle')) factBank.push({ textEn: 'Which shape has two long and two short sides?', textPt: 'Qual forma tem dois lados longos e dois curtos?', answerEnglish: 'Rectangle' });
        if (available.has('Star')) factBank.push({ textEn: 'Which shape looks like a star?', textPt: 'Qual forma parece uma estrela?', answerEnglish: 'Star' });
        if (available.has('Heart')) factBank.push({ textEn: 'Which shape looks like a heart?', textPt: 'Qual forma parece um coração?', answerEnglish: 'Heart' });
        if (available.has('Diamond')) factBank.push({ textEn: 'Which shape looks like a diamond?', textPt: 'Qual forma parece um diamante?', answerEnglish: 'Diamond' });
        if (available.has('Oval')) factBank.push({ textEn: 'Which shape looks like an egg?', textPt: 'Qual forma parece um ovo?', answerEnglish: 'Oval' });
    } else if (catKey === 'food') {
        if (available.has('Bread')) factBank.push({ textEn: 'Which food is a baked loaf?', textPt: 'Qual alimento é um pão assado?', answerEnglish: 'Bread' });
        if (available.has('Cheese')) factBank.push({ textEn: 'Which food is a dairy product?', textPt: 'Qual alimento é um produto lácteo?', answerEnglish: 'Cheese' });
        if (available.has('Egg')) factBank.push({ textEn: 'Which food comes from chickens?', textPt: 'Qual alimento vem das galinhas?', answerEnglish: 'Egg' });
        if (available.has('Milk')) factBank.push({ textEn: 'Which food is a drink from cows?', textPt: 'Qual alimento é uma bebida de vacas?', answerEnglish: 'Milk' });
        if (available.has('Rice')) factBank.push({ textEn: 'Which food is many small white grains?', textPt: 'Qual alimento são muitos grãos pequenos e brancos?', answerEnglish: 'Rice' });
        if (available.has('Chicken')) factBank.push({ textEn: 'Which food is cooked white meat?', textPt: 'Qual alimento é carne branca cozida?', answerEnglish: 'Chicken' });
        if (available.has('Pizza')) factBank.push({ textEn: 'Which food is round with toppings?', textPt: 'Qual alimento é redondo com coberturas?', answerEnglish: 'Pizza' });
        if (available.has('Ice Cream')) factBank.push({ textEn: 'Which food is cold and sweet?', textPt: 'Qual alimento é frio e doce?', answerEnglish: 'Ice Cream' });
    } else if (catKey === 'family') {
        if (available.has('Mother')) factBank.push({ textEn: 'Who is your mom?', textPt: 'Quem é sua mãe?', answerEnglish: 'Mother' });
        if (available.has('Father')) factBank.push({ textEn: 'Who is your dad?', textPt: 'Quem é seu pai?', answerEnglish: 'Father' });
        if (available.has('Sister')) factBank.push({ textEn: 'Who is your female sibling?', textPt: 'Quem é sua irmã?', answerEnglish: 'Sister' });
        if (available.has('Brother')) factBank.push({ textEn: 'Who is your male sibling?', textPt: 'Quem é seu irmão?', answerEnglish: 'Brother' });
        if (available.has('Grandmother')) factBank.push({ textEn: 'Who is your grandma?', textPt: 'Quem é sua avó?', answerEnglish: 'Grandmother' });
        if (available.has('Grandfather')) factBank.push({ textEn: 'Who is your grandpa?', textPt: 'Quem é seu avô?', answerEnglish: 'Grandfather' });
        if (available.has('Baby')) factBank.push({ textEn: 'Who is the youngest family member?', textPt: 'Quem é o membro mais jovem da família?', answerEnglish: 'Baby' });
        if (available.has('Family')) factBank.push({ textEn: 'Which picture shows all members together?', textPt: 'Qual imagem mostra todos os membros juntos?', answerEnglish: 'Family' });
    }

    // If we built a fact-based question, use it
    if (factBank.length) {
        const fact = factBank[Math.floor(Math.random() * factBank.length)];
        const correctItem = dataset.find(it => it.english === fact.answerEnglish);
        if (!correctItem) return null;
        let wrongItem = correctItem;
        while (wrongItem === correctItem) {
            wrongItem = dataset[Math.floor(Math.random() * dataset.length)];
        }
        return { textEn: fact.textEn, textPt: fact.textPt, correctItem, wrongItem };
    }

    // Generic fallback for other categories: match the word to its image
    const correctItem = dataset[Math.floor(Math.random() * dataset.length)];
    let wrongItem = correctItem;
    while (wrongItem === correctItem) {
        wrongItem = dataset[Math.floor(Math.random() * dataset.length)];
    }
    const textEn = `Which image shows "${correctItem.english}"?`;
    const textPt = `Qual imagem mostra "${correctItem.portuguese}"?`;
    return { textEn, textPt, correctItem, wrongItem };
}

function startTwoChoiceQuiz() {
    const selected = twoChoiceCategorySelect ? twoChoiceCategorySelect.value : 'general';
    let catKey = selected;
    // Categoria geral: escolhe uma categoria aleatória a cada rodada
    if (selected === 'general') {
        const keys = Object.keys(vocabularyData).filter(k => Array.isArray(vocabularyData[k]) && vocabularyData[k].length >= 2);
        catKey = keys[Math.floor(Math.random() * keys.length)] || 'pets';
    }
    // Compatibilidade: se uma chave antiga 'animals' aparecer, use 'pets'
    if (!vocabularyData[catKey] && selected === 'animals') {
        catKey = 'pets';
    }
    const question = generateTwoChoiceQuestion(catKey);
    if (!question) {
        alert(`Categoria "${catKey}" insuficiente para o quiz.`);
        return;
    }
    currentTwoChoiceCorrect = question.correctItem;
    currentTwoChoiceQuestionEn = question.textEn || '';
    currentTwoChoiceQuestionPt = question.textPt || '';
    if (twoChoiceQuestionEnEl) twoChoiceQuestionEnEl.textContent = currentTwoChoiceQuestionEn;
    if (twoChoiceQuestionPtEl) twoChoiceQuestionPtEl.textContent = currentTwoChoiceQuestionPt;
    const options = shuffleArray([question.correctItem, question.wrongItem]);

    twoChoiceOptions.innerHTML = '';
    options.forEach(option => {
        const el = document.createElement('div');
        el.className = 'option';
        el.innerHTML = `
            <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
                <img src="${option.image}" alt="${option.english}">
                <span>${option.english}</span>
                <button class="audio-btn" data-word="${option.english}"><i class="fas fa-volume-up"></i></button>
            </div>
        `;
        // áudio da opção
        el.querySelector('.audio-btn').addEventListener('click', (ev) => {
            ev.stopPropagation();
            speakText(option.english);
        });
        // verificação
        el.addEventListener('click', () => {
            document.querySelectorAll('#two-choice-options .option').forEach(o => o.style.pointerEvents = 'none');
            if (option.english === currentTwoChoiceCorrect.english) {
                el.classList.add('correct');
                playSuccessSound();
                twoChoiceScore += 1;
            } else {
                el.classList.add('incorrect');
                const correctEl = Array.from(document.querySelectorAll('#two-choice-options .option'))
                    .find(e => e.querySelector('img').alt === currentTwoChoiceCorrect.english);
                if (correctEl) correctEl.classList.add('correct');
            }
            twoChoiceRound += 1;
            updateTwoChoiceStats();
            setTimeout(() => {
                startTwoChoiceQuiz();
                document.querySelectorAll('#two-choice-options .option').forEach(o => o.style.pointerEvents = 'auto');
            }, 1800);
        });
        twoChoiceOptions.appendChild(el);
    });
}

function resetTwoChoiceQuiz() {
    twoChoiceOptions.innerHTML = '';
    currentTwoChoiceCorrect = null;
    twoChoiceRound = 0;
    twoChoiceScore = 0;
    updateTwoChoiceStats();
}

function updateTwoChoiceStats() {
    if (twoChoiceScoreEl) twoChoiceScoreEl.textContent = twoChoiceScore;
    if (twoChoiceRoundEl) twoChoiceRoundEl.textContent = twoChoiceRound;
}

// ==========================
// Image Quiz
// ==========================
let currentImageQuizCorrect = null;
let imageQuizRound = 0;
let imageQuizScore = 0;

function startImageQuiz() {
    // Seleção de dados de acordo com o modo
    const vocabAll = Object.values(vocabularyData).flat();
    const phrasesAll = typeof phrasesData !== 'undefined' ? Object.values(phrasesData).flat() : [];
    const isPhrasesMode = (currentMode === 'phrases');
    const dataset = (() => {
        if (isPhrasesMode) {
            if (currentCategory && phrasesData && phrasesData[currentCategory]) return phrasesData[currentCategory];
            return phrasesAll;
        } else {
            if (currentCategory && vocabularyData[currentCategory]) return vocabularyData[currentCategory];
            return vocabAll;
        }
    })();
    const count = imageQuizCountSelect ? parseInt(imageQuizCountSelect.value, 10) : 3;
    if (dataset.length < 3) {
        alert('Categoria insuficiente para o Image Quiz.');
        return;
    }
    // escolher correta
    currentImageQuizCorrect = dataset[Math.floor(Math.random() * dataset.length)];
    // Exibição conforme o modo
    if (isPhrasesMode) {
        // ocultar imagem e mostrar card da frase
        if (imageQuizImage) imageQuizImage.style.display = 'none';
        if (imageQuizCard) imageQuizCard.style.display = 'flex';
        if (imageQuizPhraseEn) imageQuizPhraseEn.textContent = currentImageQuizCorrect.english;
        if (imageQuizPlayBtn) imageQuizPlayBtn.onclick = () => speakText(currentImageQuizCorrect.english);
    } else {
        if (imageQuizCard) imageQuizCard.style.display = 'none';
        if (imageQuizImage) {
            imageQuizImage.style.display = '';
            imageQuizImage.src = currentImageQuizCorrect.image;
            imageQuizImage.alt = currentImageQuizCorrect.english;
        }
    }

    // escolher incorretas baseado em count
    const incorrect = [];
    while (incorrect.length < (count - 1)) {
        const r = dataset[Math.floor(Math.random() * dataset.length)];
        if (r.english !== currentImageQuizCorrect.english && !incorrect.some(i => i.english === r.english)) {
            incorrect.push(r);
        }
    }
    const options = shuffleArray([currentImageQuizCorrect, ...incorrect]);
    imageQuizRound += 1;
    updateImageQuizStats();
    imageQuizOptions.innerHTML = '';
    options.forEach(option => {
        const el = document.createElement('div');
        el.className = 'option';
        if (isPhrasesMode) {
            // Alternativas em português, sem áudio
            el.innerHTML = `<span>${option.portuguese}</span>`;
        } else {
            // Vocabulário: inglês com botão de áudio
            el.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
                    <span>${option.english}</span>
                    <button class="audio-btn" data-word="${option.english}"><i class="fas fa-volume-up"></i></button>
                </div>
            `;
            el.querySelector('.audio-btn').addEventListener('click', (ev) => {
                ev.stopPropagation();
                speakText(option.english);
            });
        }
        el.addEventListener('click', () => {
            document.querySelectorAll('#image-quiz-options .option').forEach(o => o.style.pointerEvents = 'none');
            const isCorrect = isPhrasesMode
                ? (option.portuguese === currentImageQuizCorrect.portuguese)
                : (option.english === currentImageQuizCorrect.english);
            if (isCorrect) {
                el.classList.add('correct');
                playSuccessSound();
                imageQuizScore += 1;
                updateImageQuizStats();
            } else {
                el.classList.add('incorrect');
                const correctEl = Array.from(document.querySelectorAll('#image-quiz-options .option'))
                    .find(e => {
                        const text = e.querySelector('span')?.textContent;
                        return isPhrasesMode
                            ? (text === currentImageQuizCorrect.portuguese)
                            : (text === currentImageQuizCorrect.english);
                    });
                if (correctEl) correctEl.classList.add('correct');
            }
            setTimeout(() => {
                startImageQuiz();
                document.querySelectorAll('#image-quiz-options .option').forEach(o => o.style.pointerEvents = 'auto');
            }, 1800);
        });
        imageQuizOptions.appendChild(el);
    });
}

function resetImageQuiz() {
    if (imageQuizImage) {
        imageQuizImage.src = '';
        imageQuizImage.alt = '';
        imageQuizImage.style.display = '';
    }
    if (imageQuizCard) {
        imageQuizCard.style.display = 'none';
    }
    if (imageQuizPhraseEn) imageQuizPhraseEn.textContent = '';
    imageQuizOptions.innerHTML = '';
    currentImageQuizCorrect = null;
    imageQuizRound = 0;
    imageQuizScore = 0;
    updateImageQuizStats();
}

function updateImageQuizStats() {
    if (imageQuizScoreEl) imageQuizScoreEl.textContent = imageQuizScore;
    if (imageQuizRoundEl) imageQuizRoundEl.textContent = imageQuizRound;
}

function goHome() {
    // Esconder todos os containers de jogo e seções
    document.querySelectorAll('.game-container').forEach(sec => sec.style.display = 'none');
    gameSelectionSection.style.display = 'none';
    if (categoriesSection) categoriesSection.style.display = 'none';
    if (phrasesCategoriesSection) phrasesCategoriesSection.style.display = 'none';
    if (conversationContainer) conversationContainer.style.display = 'none';
    // Mostrar Home
    const homeMenu = document.querySelector('.home-menu');
    if (homeMenu) homeMenu.style.display = 'block';
    // Reset estados dos jogos
    resetMemoryGame();
    resetWordMatchGame();
    resetCategorizationGame();
    resetPronunciationGame();
    resetLearnMode();
    resetWordSearchGame();
    resetTwoChoiceQuiz();
    resetImageQuiz();
    if (typeof resetListeningQuiz === 'function') {
        resetListeningQuiz();
    }
    currentCategory = '';
    currentMode = null;
}

function goBackPage() {
    // Voltar para a tela anterior dentro do app (sem ir para Home)
    const visibleGameSection = document.querySelector('.game-container:not([style*="display: none"])');
    if (visibleGameSection) {
        const id = visibleGameSection.id;
        if (id === 'memory-game-container') {
            resetMemoryGame();
        } else if (id === 'word-match-container') {
            resetWordMatchGame();
        } else if (id === 'categorization-game-container') {
            resetCategorizationGame();
        } else if (id === 'pronunciation-game-container') {
            resetPronunciationGame();
        } else if (id === 'learn-mode-container') {
            resetLearnMode();
        } else if (id === 'word-search-container') {
            resetWordSearchGame();
        } else if (id === 'two-choice-quiz-container') {
            resetTwoChoiceQuiz();
        } else if (id === 'image-quiz-container') {
            resetImageQuiz();
        }
        visibleGameSection.style.display = 'none';
        gameSelectionSection.style.display = 'block';
        return;
    }
    if (gameSelectionSection.style.display !== 'none') {
        gameSelectionSection.style.display = 'none';
        // Voltar para a seção do modo atual
        if (currentMode === 'vocabulary') {
            if (categoriesSection) categoriesSection.style.display = 'block';
        } else if (currentMode === 'phrases') {
            if (phrasesCategoriesSection) phrasesCategoriesSection.style.display = 'block';
        } else if (currentMode === 'conversation') {
            if (conversationContainer) conversationContainer.style.display = 'block';
        } else {
            const homeMenu = document.querySelector('.home-menu');
            if (homeMenu) homeMenu.style.display = 'block';
        }
        return;
    }
    // Já está nas categorias/phrases/conversation: não faz nada
}
