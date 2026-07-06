// Dados de vocabulário para cada categoria
const vocabularyData = {
    // Frutas
    'fruits': [
        { english: 'Apple', portuguese: 'Maçã', image: 'images/fruits/apple.png' },
        { english: 'Banana', portuguese: 'Banana', image: 'images/fruits/banana.svg' },
        { english: 'Orange', portuguese: 'Laranja', image: 'images/fruits/orange.png' },
        { english: 'Strawberry', portuguese: 'Morango', image: 'images/fruits/strawberry.svg' },
        { english: 'Grape', portuguese: 'Uva', image: 'images/fruits/grape.svg' },
        { english: 'Watermelon', portuguese: 'Melancia', image: 'images/fruits/watermelon.svg' },
        { english: 'Pineapple', portuguese: 'Abacaxi', image: 'images/fruits/pineapple.svg' },
        { english: 'Pear', portuguese: 'Pera', image: 'images/fruits/pear.svg' }
    ],
    
    // Cores
    'colors': [
        { english: 'Red', portuguese: 'Vermelho', image: 'images/colors/red.svg' },
        { english: 'Blue', portuguese: 'Azul', image: 'images/colors/blue.svg' },
        { english: 'Yellow', portuguese: 'Amarelo', image: 'images/colors/yellow.svg' },
        { english: 'Green', portuguese: 'Verde', image: 'images/colors/green.svg' },
        { english: 'Black', portuguese: 'Preto', image: 'images/colors/black.svg' },
        { english: 'White', portuguese: 'Branco', image: 'images/colors/white.svg' },
        { english: 'Purple', portuguese: 'Roxo', image: 'images/colors/purple.svg' },
        { english: 'Orange', portuguese: 'Laranja', image: 'images/colors/orange.svg' }
    ],
    
    // Números 0-10
    'numbers-10': [
        { english: 'Zero', portuguese: 'Zero', image: 'images/numbers/0.svg' },
        { english: 'One', portuguese: 'Um', image: 'images/numbers/1.svg' },
        { english: 'Two', portuguese: 'Dois', image: 'images/numbers/2.svg' },
        { english: 'Three', portuguese: 'Três', image: 'images/numbers/3.svg' },
        { english: 'Four', portuguese: 'Quatro', image: 'images/numbers/4.svg' },
        { english: 'Five', portuguese: 'Cinco', image: 'images/numbers/5.svg' },
        { english: 'Six', portuguese: 'Seis', image: 'images/numbers/6.svg' },
        { english: 'Seven', portuguese: 'Sete', image: 'images/numbers/7.svg' },
        { english: 'Eight', portuguese: 'Oito', image: 'images/numbers/8.svg' },
        { english: 'Nine', portuguese: 'Nove', image: 'images/numbers/9.svg' },
        { english: 'Ten', portuguese: 'Dez', image: 'images/numbers/10.svg' }
    ],
    
    // Números 11-29
    'numbers-29': [
        { english: 'Eleven', portuguese: 'Onze', image: 'images/numbers/11.svg' },
        { english: 'Twelve', portuguese: 'Doze', image: 'images/numbers/12.svg' },
        { english: 'Thirteen', portuguese: 'Treze', image: 'images/numbers/13.svg' },
        { english: 'Fourteen', portuguese: 'Quatorze', image: 'images/numbers/14.svg' },
        { english: 'Fifteen', portuguese: 'Quinze', image: 'images/numbers/15.svg' },
        { english: 'Sixteen', portuguese: 'Dezesseis', image: 'images/numbers/16.svg' },
        { english: 'Seventeen', portuguese: 'Dezessete', image: 'images/numbers/17.svg' },
        { english: 'Eighteen', portuguese: 'Dezoito', image: 'images/numbers/18.svg' },
        { english: 'Nineteen', portuguese: 'Dezenove', image: 'images/numbers/19.svg' },
        { english: 'Twenty', portuguese: 'Vinte', image: 'images/numbers/20.svg' },
        { english: 'Twenty-One', portuguese: 'Vinte e Um', image: 'images/numbers/21.svg' },
        { english: 'Twenty-Two', portuguese: 'Vinte e Dois', image: 'images/numbers/22.svg' },
        { english: 'Twenty-Three', portuguese: 'Vinte e Três', image: 'images/numbers/23.svg' },
        { english: 'Twenty-Four', portuguese: 'Vinte e Quatro', image: 'images/numbers/24.svg' },
        { english: 'Twenty-Five', portuguese: 'Vinte e Cinco', image: 'images/numbers/25.svg' },
        { english: 'Twenty-Six', portuguese: 'Vinte e Seis', image: 'images/numbers/26.svg' },
        { english: 'Twenty-Seven', portuguese: 'Vinte e Sete', image: 'images/numbers/27.svg' },
        { english: 'Twenty-Eight', portuguese: 'Vinte e Oito', image: 'images/numbers/28.svg' },
        { english: 'Twenty-Nine', portuguese: 'Vinte e Nove', image: 'images/numbers/29.svg' }
    ],
    
    // Números 0-100 (selecionados)
    'numbers-100': [
        { english: 'Zero', portuguese: 'Zero', image: 'images/numbers/0.svg' },
        { english: 'Ten', portuguese: 'Dez', image: 'images/numbers/10.svg' },
        { english: 'Twenty', portuguese: 'Vinte', image: 'images/numbers/20.svg' },
        { english: 'Thirty', portuguese: 'Trinta', image: 'images/numbers/30.svg' },
        { english: 'Forty', portuguese: 'Quarenta', image: 'images/numbers/40.svg' },
        { english: 'Fifty', portuguese: 'Cinquenta', image: 'images/numbers/50.svg' },
        { english: 'Sixty', portuguese: 'Sessenta', image: 'images/numbers/60.svg' },
        { english: 'Seventy', portuguese: 'Setenta', image: 'images/numbers/70.svg' },
        { english: 'Eighty', portuguese: 'Oitenta', image: 'images/numbers/80.svg' },
        { english: 'Ninety', portuguese: 'Noventa', image: 'images/numbers/90.svg' },
        { english: 'One Hundred', portuguese: 'Cem', image: 'images/numbers/100.svg' }
    ],
    
    // Animais da fazenda
    'farm-animals': [
        { english: 'Cow', portuguese: 'Vaca', image: 'images/farm-animals/cow.png' },
        { english: 'Horse', portuguese: 'Cavalo', image: 'images/farm-animals/horse.png' },
        { english: 'Pig', portuguese: 'Porco', image: 'images/farm-animals/pig.png' },
        { english: 'Chicken', portuguese: 'Galinha', image: 'images/farm-animals/chicken.png' },
        { english: 'Sheep', portuguese: 'Ovelha', image: 'images/farm-animals/sheep.png' },
        { english: 'Goat', portuguese: 'Cabra', image: 'images/farm-animals/goat.png' },
        { english: 'Duck', portuguese: 'Pato', image: 'images/farm-animals/duck.png' },
        { english: 'Rabbit', portuguese: 'Coelho', image: 'images/farm-animals/rabbit.png' }
    ],
    
    // Animais do zoológico
    'zoo-animals': [
        { english: 'Lion', portuguese: 'Leão', image: 'images/zoo-animals/lion.png' },
        { english: 'Elephant', portuguese: 'Elefante', image: 'images/zoo-animals/elephant.png' },
        { english: 'Monkey', portuguese: 'Macaco', image: 'images/zoo-animals/monkey.png' },
        { english: 'Tiger', portuguese: 'Tigre', image: 'images/zoo-animals/tiger.png' },
        { english: 'Snake', portuguese: 'Cobra', image: 'images/zoo-animals/snake.png' },
        { english: 'Bird', portuguese: 'Pássaro', image: 'images/zoo-animals/bird.png' },
        { english: 'Zebra', portuguese: 'Zebra', image: 'images/zoo-animals/zebra.png' },
        { english: 'Bear', portuguese: 'Urso', image: 'images/zoo-animals/bear.png' },
        { english: 'Panda', portuguese: 'Panda', image: 'images/zoo-animals/panda.png' }
    ],
    
    // Objetos escolares
    'school-supplies': [
        { english: 'Pencil', portuguese: 'Lápis', image: 'images/school-supplies/pencil.png' },
        { english: 'Pen', portuguese: 'Caneta', image: 'images/school-supplies/pen.png' },
        { english: 'Notebook', portuguese: 'Caderno', image: 'images/school-supplies/notebook.png' },
        { english: 'Eraser', portuguese: 'Borracha', image: 'images/school-supplies/eraser.png' },
        { english: 'Ruler', portuguese: 'Régua', image: 'images/school-supplies/ruler.png' },
        { english: 'Scissors', portuguese: 'Tesoura', image: 'images/school-supplies/scissors.png' },
        { english: 'Backpack', portuguese: 'Mochila', image: 'images/school-supplies/backpack.png' },
        { english: 'Book', portuguese: 'Livro', image: 'images/school-supplies/book.png' }
    ],
    
    // Brinquedos
    'toys': [
        { english: 'Ball', portuguese: 'Bola', image: 'images/toys/ball.png' },
        { english: 'Doll', portuguese: 'Boneca', image: 'images/toys/doll.png' },
        { english: 'Car', portuguese: 'Carro', image: 'images/toys/car.png' },
        { english: 'Teddy Bear', portuguese: 'Ursinho', image: 'images/toys/teddy-bear.png' },
        { english: 'Robot', portuguese: 'Robô', image: 'images/toys/robot.png' },
        { english: 'Blocks', portuguese: 'Blocos', image: 'images/toys/blocks.png' },
        { english: 'Puzzle', portuguese: 'Quebra-cabeça', image: 'images/toys/puzzle.png' },
        { english: 'Kite', portuguese: 'Pipa', image: 'images/toys/kite.png' }
    ],
    
    // Partes do corpo
    'body-parts': [
        { english: 'Head', portuguese: 'Cabeça', image: 'images/body-parts/head.png' },
        { english: 'Eye', portuguese: 'Olho', image: 'images/body-parts/eye.png' },
        { english: 'Nose', portuguese: 'Nariz', image: 'images/body-parts/nose.jpg' },
        { english: 'Mouth', portuguese: 'Boca', image: 'images/body-parts/mouth.png' },
        { english: 'Ear', portuguese: 'Orelha', image: 'images/body-parts/ear.png' },
        { english: 'Hand', portuguese: 'Mão', image: 'images/body-parts/hand.png' },
        { english: 'Foot', portuguese: 'Pé', image: 'images/body-parts/foot.png' },
        { english: 'Arm', portuguese: 'Braço', image: 'images/body-parts/arm.png' }
    ],
    
    // Natureza
    'nature': [
        { english: 'Tree', portuguese: 'Árvore', image: 'images/nature/tree.png' },
        { english: 'Flower', portuguese: 'Flor', image: 'images/nature/flower.png' },
        { english: 'Mountain', portuguese: 'Montanha', image: 'images/nature/mountain.png' },
        { english: 'River', portuguese: 'Rio', image: 'images/nature/river.png' },
        { english: 'Sun', portuguese: 'Sol', image: 'images/nature/sun.png' },
        { english: 'Moon', portuguese: 'Lua', image: 'images/nature/moon.png' },
        { english: 'Star', portuguese: 'Estrela', image: 'images/nature/star.png' },
        { english: 'Cloud', portuguese: 'Nuvem', image: 'images/nature/cloud.png' }
    ],
    
    // Roupas
    'clothes': [
        { english: 'Shirt', portuguese: 'Camisa', image: 'images/clothes/shirt.png' },
        { english: 'Pants', portuguese: 'Calça', image: 'images/clothes/pants.png' },
        { english: 'Dress', portuguese: 'Vestido', image: 'images/clothes/dress.png' },
        { english: 'Shoes', portuguese: 'Sapatos', image: 'images/clothes/shoes.png' },
        { english: 'Hat', portuguese: 'Chapéu', image: 'images/clothes/hat.png' },
        { english: 'Socks', portuguese: 'Meias', image: 'images/clothes/socks.png' },
        { english: 'Jacket', portuguese: 'Jaqueta', image: 'images/clothes/jacket.png' },
        { english: 'Scarf', portuguese: 'Cachecol', image: 'images/clothes/scarf.png' }
    ],
    
    // Clima
    'weather': [
        { english: 'Sunny', portuguese: 'Ensolarado', image: 'images/weather/sunny.png' },
        { english: 'Rainy', portuguese: 'Chuvoso', image: 'images/weather/rainy.png' },
        { english: 'Cloudy', portuguese: 'Nublado', image: 'images/weather/cloudy.png' },
        { english: 'Snowy', portuguese: 'Nevado', image: 'images/weather/snowy.png' },
        { english: 'Windy', portuguese: 'Ventoso', image: 'images/weather/windy.png' },
        { english: 'Stormy', portuguese: 'Tempestuoso', image: 'images/weather/stormy.png' },
        { english: 'Foggy', portuguese: 'Nebuloso', image: 'images/weather/foggy.png' },
        { english: 'Rainbow', portuguese: 'Arco-íris', image: 'images/weather/rainbow.png' }
    ],
    
    // Dias da semana
    'weekdays': [
        { english: 'Monday', portuguese: 'Segunda-feira', image: 'images/weekdays/monday.svg' },
        { english: 'Tuesday', portuguese: 'Terça-feira', image: 'images/weekdays/tuesday.svg' },
        { english: 'Wednesday', portuguese: 'Quarta-feira', image: 'images/weekdays/wednesday.svg' },
        { english: 'Thursday', portuguese: 'Quinta-feira', image: 'images/weekdays/thursday.svg' },
        { english: 'Friday', portuguese: 'Sexta-feira', image: 'images/weekdays/friday.svg' },
        { english: 'Saturday', portuguese: 'Sábado', image: 'images/weekdays/saturday.svg' },
        { english: 'Sunday', portuguese: 'Domingo', image: 'images/weekdays/sunday.svg' }
    ],
    
    // Meses do ano
    'months': [
        { english: 'January', portuguese: 'Janeiro', image: 'images/months/january.svg' },
        { english: 'February', portuguese: 'Fevereiro', image: 'images/months/february.svg' },
        { english: 'March', portuguese: 'Março', image: 'images/months/march.svg' },
        { english: 'April', portuguese: 'Abril', image: 'images/months/april.svg' },
        { english: 'May', portuguese: 'Maio', image: 'images/months/may.svg' },
        { english: 'June', portuguese: 'Junho', image: 'images/months/june.svg' },
        { english: 'July', portuguese: 'Julho', image: 'images/months/july.svg' },
        { english: 'August', portuguese: 'Agosto', image: 'images/months/august.svg' },
        { english: 'September', portuguese: 'Setembro', image: 'images/months/september.svg' },
        { english: 'October', portuguese: 'Outubro', image: 'images/months/october.svg' },
        { english: 'November', portuguese: 'Novembro', image: 'images/months/november.svg' },
        { english: 'December', portuguese: 'Dezembro', image: 'images/months/december.svg' }
    ],
    
    // Vegetais
    'vegetables': [
        { english: 'Carrot', portuguese: 'Cenoura', image: 'images/vegetables/carrot.png' },
        { english: 'Tomato', portuguese: 'Tomate', image: 'images/vegetables/tomato.png' },
        { english: 'Potato', portuguese: 'Batata', image: 'images/vegetables/potato.png' },
        { english: 'Broccoli', portuguese: 'Brócolis', image: 'images/vegetables/broccoli.png' },
        { english: 'Corn', portuguese: 'Milho', image: 'images/vegetables/corn.png' },
        { english: 'Cucumber', portuguese: 'Pepino', image: 'images/vegetables/cucumber.png' },
        { english: 'Lettuce', portuguese: 'Alface', image: 'images/vegetables/lettuce.png' },
        { english: 'Onion', portuguese: 'Cebola', image: 'images/vegetables/onion.png' }
    ],
    
    // Emoções
    'emotions': [
        { english: 'Happy', portuguese: 'Feliz', image: 'images/emotions/happy.png' },
        { english: 'Sad', portuguese: 'Triste', image: 'images/emotions/sad.png' },
        { english: 'Angry', portuguese: 'Bravo', image: 'images/emotions/angry.png' },
        { english: 'Scared', portuguese: 'Assustado', image: 'images/emotions/scared.png' },
        { english: 'Surprised', portuguese: 'Surpreso', image: 'images/emotions/surprised.png' },
        { english: 'Tired', portuguese: 'Cansado', image: 'images/emotions/tired.png' },
        { english: 'Excited', portuguese: 'Animado', image: 'images/emotions/excited.png' },
        { english: 'Confused', portuguese: 'Confuso', image: 'images/emotions/confused.png' }
    ],
    
    // Animais de estimação
    'pets': [
        { english: 'Dog', portuguese: 'Cachorro', image: 'images/pets/dog.png' },
        { english: 'Cat', portuguese: 'Gato', image: 'images/pets/cat.png' },
        { english: 'Fish', portuguese: 'Peixe', image: 'images/pets/fish.png' },
        { english: 'Bird', portuguese: 'Pássaro', image: 'images/pets/bird.png' },
        { english: 'Rabbit', portuguese: 'Coelho', image: 'images/pets/rabbit.png' },
        { english: 'Hamster', portuguese: 'Hamster', image: 'images/pets/hamster.png' },
        { english: 'Turtle', portuguese: 'Tartaruga', image: 'images/pets/turtle.png' },
        { english: 'Guinea Pig', portuguese: 'Porquinho da Índia', image: 'images/pets/guinea-pig.png' }
    ],
    
    // Verbos de ação
    'action-verbs': [
        { english: 'Run', portuguese: 'Correr', image: 'images/action-verbs/run.png' },
        { english: 'Jump', portuguese: 'Pular', image: 'images/action-verbs/jump.png' },
        { english: 'Swim', portuguese: 'Nadar', image: 'images/action-verbs/swim.png' },
        { english: 'Eat', portuguese: 'Comer', image: 'images/action-verbs/eat.png' },
        { english: 'Sleep', portuguese: 'Dormir', image: 'images/action-verbs/sleep.png' },
        { english: 'Play', portuguese: 'Brincar', image: 'images/action-verbs/play.png' },
        { english: 'Read', portuguese: 'Ler', image: 'images/action-verbs/read.png' },
        { english: 'Write', portuguese: 'Escrever', image: 'images/action-verbs/write.png' }
    ],
    
    // Adjetivos
    'adjectives': [
        { english: 'Big', portuguese: 'Grande', image: 'images/adjectives/big.png' },
        { english: 'Small', portuguese: 'Pequeno', image: 'images/adjectives/small.png' },
        { english: 'Hot', portuguese: 'Quente', image: 'images/adjectives/hot.png' },
        { english: 'Cold', portuguese: 'Frio', image: 'images/adjectives/cold.png' },
        { english: 'Fast', portuguese: 'Rápido', image: 'images/adjectives/fast.png' },
        { english: 'Slow', portuguese: 'Lento', image: 'images/adjectives/slow.png' },
        { english: 'Tall', portuguese: 'Alto', image: 'images/adjectives/tall.png' },
        { english: 'Short', portuguese: 'Baixo', image: 'images/adjectives/short.png' }
    ],
    
    // Formas
    'shapes': [
        { english: 'Circle', portuguese: 'Círculo', image: 'images/shapes/circle.png' },
        { english: 'Square', portuguese: 'Quadrado', image: 'images/shapes/square.png' },
        { english: 'Triangle', portuguese: 'Triângulo', image: 'images/shapes/triangle.png' },
        { english: 'Rectangle', portuguese: 'Retângulo', image: 'images/shapes/rectangle.png' },
        { english: 'Star', portuguese: 'Estrela', image: 'images/shapes/star.png' },
        { english: 'Heart', portuguese: 'Coração', image: 'images/shapes/heart.png' },
        { english: 'Diamond', portuguese: 'Diamante', image: 'images/shapes/diamond.png' },
        { english: 'Oval', portuguese: 'Oval', image: 'images/shapes/oval.png' }
    ],
    
    // Comidas
    'food': [
        { english: 'Bread', portuguese: 'Pão', image: 'images/food/bread.png' },
        { english: 'Cheese', portuguese: 'Queijo', image: 'images/food/cheese.png' },
        { english: 'Egg', portuguese: 'Ovo', image: 'images/food/egg.png' },
        { english: 'Milk', portuguese: 'Leite', image: 'images/food/milk.png' },
        { english: 'Rice', portuguese: 'Arroz', image: 'images/food/rice.png' },
        { english: 'Chicken', portuguese: 'Frango', image: 'images/food/chicken.png' },
        { english: 'Pizza', portuguese: 'Pizza', image: 'images/food/pizza.png' },
        { english: 'Ice Cream', portuguese: 'Sorvete', image: 'images/food/ice-cream.png' }
    ],
    
    // Família
    'family': [
        { english: 'Mother', portuguese: 'Mãe', image: 'images/family/mother.png' },
        { english: 'Father', portuguese: 'Pai', image: 'images/family/father.png' },
        { english: 'Sister', portuguese: 'Irmã', image: 'images/family/sister.png' },
        { english: 'Brother', portuguese: 'Irmão', image: 'images/family/brother.png' },
        { english: 'Grandmother', portuguese: 'Avó', image: 'images/family/grandmother.png' },
        { english: 'Grandfather', portuguese: 'Avô', image: 'images/family/grandfather.png' },
        { english: 'Baby', portuguese: 'Bebê', image: 'images/family/baby.png' },
        { english: 'Family', portuguese: 'Família', image: 'images/family/family.png' }
    ],

    // Jobs & Occupations 1
    'jobs-occupations-1': [
        { english: 'Doctor', portuguese: 'Médico(a)', image: 'images/jobs-occupations/doctor.png' },
        { english: 'Builder', portuguese: 'Construtor(a)', image: 'images/jobs-occupations/builder.png' },
        { english: 'Chef', portuguese: 'Cozinheiro(a)', image: 'images/jobs-occupations/chef.png' },
        { english: 'Nurse', portuguese: 'Enfermeiro(a)', image: 'images/jobs-occupations/nurse.png' },
        { english: 'Veterinarian', portuguese: 'Veterinário(a)', image: 'images/jobs-occupations/veterinarian.png' },
        { english: 'Teacher', portuguese: 'Professor(a)', image: 'images/jobs-occupations/teacher.png' },
        { english: 'Police Officer', portuguese: 'Policial', image: 'images/jobs-occupations/police-officer.png' },
        { english: 'Farmer', portuguese: 'Fazendeiro(a)', image: 'images/jobs-occupations/farmer.png' }
    ],

    // Jobs & Occupations 2
    'jobs-occupations-2': [
        { english: 'Engineer', portuguese: 'Engenheiro(a)', image: 'images/objects/book.png' },
        { english: 'Dentist', portuguese: 'Dentista', image: 'images/objects/book.png' },
        { english: 'Driver', portuguese: 'Motorista', image: 'images/objects/book.png' },
        { english: 'Pilot', portuguese: 'Piloto(a)', image: 'images/objects/book.png' },
        { english: 'Scientist', portuguese: 'Cientista', image: 'images/objects/book.png' },
        { english: 'Artist', portuguese: 'Artista', image: 'images/objects/book.png' },
        { english: 'Mechanic', portuguese: 'Mecânico(a)', image: 'images/objects/book.png' },
        { english: 'Firefighter', portuguese: 'Bombeiro(a)', image: 'images/objects/book.png' }
    ]
};

// Phrases data: tópicos com frases EN ↔ PT
const phrasesData = {
    'phrases-greetings': [
        { english: 'Hello!', portuguese: 'Olá!' },
        { english: 'Good morning!', portuguese: 'Bom dia!' },
        { english: 'Good afternoon!', portuguese: 'Boa tarde!' },
        { english: 'Good evening!', portuguese: 'Boa noite!' },
        { english: 'How are you?', portuguese: 'Como você está?' },
        { english: 'I am fine, thank you.', portuguese: 'Estou bem, obrigado.' },
        { english: 'Nice to meet you.', portuguese: 'Prazer em conhecê-lo.' },
        { english: 'What is your name?', portuguese: 'Qual é o seu nome?' },
        { english: 'My name is...', portuguese: 'Meu nome é...' },
        { english: 'See you later!', portuguese: 'Até mais!' },
        { english: 'Welcome!', portuguese: 'Bem-vindo!' },
        { english: 'How’s it going?', portuguese: 'Como vai?' },
        { english: 'Long time no see!', portuguese: 'Quanto tempo!' }
    ],
    'phrases-classroom': [
        { english: 'May I ask a question?', portuguese: 'Posso fazer uma pergunta?' },
        { english: 'I don’t understand.', portuguese: 'Eu não entendo.' },
        { english: 'Please repeat.', portuguese: 'Por favor, repita.' },
        { english: 'What does this mean?', portuguese: 'O que isso significa?' },
        { english: 'Can you help me?', portuguese: 'Você pode me ajudar?' },
        { english: 'Open your book, please.', portuguese: 'Abra seu livro, por favor.' },
        { english: 'Listen carefully.', portuguese: 'Ouça com atenção.' },
        { english: 'Work in pairs.', portuguese: 'Trabalhem em dupla.' },
        { english: 'Raise your hand.', portuguese: 'Levante a mão.' },
        { english: 'What page is it?', portuguese: 'Em que página está?' },
        { english: 'I finished.', portuguese: 'Eu terminei.' },
        { english: 'Can I go to the bathroom?', portuguese: 'Posso ir ao banheiro?' }
    ],
    'phrases-shopping': [
        { english: 'How much is this?', portuguese: 'Quanto custa isso?' },
        { english: 'I would like to buy it.', portuguese: 'Eu gostaria de comprar.' },
        { english: 'Do you accept cards?', portuguese: 'Vocês aceitam cartão?' },
        { english: 'Where is the cashier?', portuguese: 'Onde fica o caixa?' },
        { english: 'Can I try it on?', portuguese: 'Posso experimentar?' },
        { english: 'Do you have a smaller size?', portuguese: 'Tem um tamanho menor?' },
        { english: 'I’m just looking.', portuguese: 'Estou só olhando.' },
        { english: 'Where is the fitting room?', portuguese: 'Onde é o provador?' },
        { english: 'Can I get a discount?', portuguese: 'Posso ter desconto?' },
        { english: 'I need a receipt.', portuguese: 'Eu preciso de recibo.' },
        { english: 'Do you have this in blue?', portuguese: 'Você tem isso em azul?' },
        { english: 'Can I pay with cash?', portuguese: 'Posso pagar em dinheiro?' }
    ],
    // Novos tópicos
    'phrases-travel': [
        { english: 'Where is the bus station?', portuguese: 'Onde fica a rodoviária?' },
        { english: 'I need a taxi.', portuguese: 'Preciso de um táxi.' },
        { english: 'How long is the trip?', portuguese: 'Quanto tempo é a viagem?' },
        { english: 'I have a reservation.', portuguese: 'Eu tenho uma reserva.' },
        { english: 'What time does it leave?', portuguese: 'A que horas sai?' },
        { english: 'Where is gate B?', portuguese: 'Onde fica o portão B?' },
        { english: 'My luggage is missing.', portuguese: 'Minha bagagem sumiu.' },
        { english: 'Can you show me on the map?', portuguese: 'Você pode me mostrar no mapa?' }
    ],
    'phrases-restaurant': [
        { english: 'A table for two, please.', portuguese: 'Uma mesa para dois, por favor.' },
        { english: 'Could I see the menu?', portuguese: 'Eu poderia ver o menu?' },
        { english: 'I’d like water, please.', portuguese: 'Eu gostaria de água, por favor.' },
        { english: 'What do you recommend?', portuguese: 'O que você recomenda?' },
        { english: 'I am allergic to peanuts.', portuguese: 'Sou alérgico a amendoim.' },
        { english: 'The bill, please.', portuguese: 'A conta, por favor.' },
        { english: 'Can we split the bill?', portuguese: 'Podemos dividir a conta?' },
        { english: 'It was delicious!', portuguese: 'Estava delicioso!' }
    ],
    'phrases-directions': [
        { english: 'Excuse me, where is the bank?', portuguese: 'Com licença, onde fica o banco?' },
        { english: 'Turn left.', portuguese: 'Vire à esquerda.' },
        { english: 'Turn right.', portuguese: 'Vire à direita.' },
        { english: 'Go straight ahead.', portuguese: 'Siga em frente.' },
        { english: 'It’s near.', portuguese: 'É perto.' },
        { english: 'It’s far.', portuguese: 'É longe.' },
        { english: 'At the corner.', portuguese: 'Na esquina.' },
        { english: 'Across the street.', portuguese: 'Do outro lado da rua.' },
        { english: 'Next to the school.', portuguese: 'Ao lado da escola.' },
        { english: 'Between the park and the library.', portuguese: 'Entre o parque e a biblioteca.' }
    ],
    'phrases-daily-routine': [
        { english: 'I wake up at seven.', portuguese: 'Eu acordo às sete.' },
        { english: 'I brush my teeth.', portuguese: 'Eu escovo os dentes.' },
        { english: 'I take a shower.', portuguese: 'Eu tomo banho.' },
        { english: 'I have breakfast.', portuguese: 'Eu tomo café da manhã.' },
        { english: 'I go to school.', portuguese: 'Eu vou para a escola.' },
        { english: 'I do my homework.', portuguese: 'Eu faço meu dever de casa.' },
        { english: 'I have dinner.', portuguese: 'Eu janto.' },
        { english: 'I go to bed at nine.', portuguese: 'Eu vou dormir às nove.' }
    ],
    'phrases-health': [
        { english: 'I don’t feel well.', portuguese: 'Eu não me sinto bem.' },
        { english: 'I have a headache.', portuguese: 'Estou com dor de cabeça.' },
        { english: 'I have a cold.', portuguese: 'Estou resfriado.' },
        { english: 'I need a doctor.', portuguese: 'Eu preciso de um médico.' },
        { english: 'Take this medicine.', portuguese: 'Tome este remédio.' },
        { english: 'Rest and drink water.', portuguese: 'Descanse e beba água.' },
        { english: 'Do you have allergies?', portuguese: 'Você tem alergias?' },
        { english: 'I need a bandage.', portuguese: 'Eu preciso de um curativo.' }
    ],
    'phrases-weather': [
        { english: 'It’s hot today.', portuguese: 'Está quente hoje.' },
        { english: 'It’s cold today.', portuguese: 'Está frio hoje.' },
        { english: 'It’s raining.', portuguese: 'Está chovendo.' },
        { english: 'It’s windy.', portuguese: 'Está ventando.' },
        { english: 'It’s sunny.', portuguese: 'Está ensolarado.' },
        { english: 'What’s the weather like?', portuguese: 'Como está o clima?' },
        { english: 'I forgot my umbrella.', portuguese: 'Eu esqueci meu guarda-chuva.' },
        { english: 'The sky is cloudy.', portuguese: 'O céu está nublado.' },
        { english: 'There is a rainbow.', portuguese: 'Tem um arco-íris.' }
    ],
    'phrases-family': [
        { english: 'This is my mother.', portuguese: 'Esta é minha mãe.' },
        { english: 'I have two brothers.', portuguese: 'Eu tenho dois irmãos.' },
        { english: 'My family is big.', portuguese: 'Minha família é grande.' },
        { english: 'We live together.', portuguese: 'Nós moramos juntos.' },
        { english: 'I love my family.', portuguese: 'Eu amo minha família.' },
        { english: 'She is my sister.', portuguese: 'Ela é minha irmã.' },
        { english: 'He is my father.', portuguese: 'Ele é meu pai.' },
        { english: 'They are my grandparents.', portuguese: 'Eles são meus avós.' }
    ],
    'phrases-emotions': [
        { english: 'I am happy.', portuguese: 'Eu estou feliz.' },
        { english: 'I am sad.', portuguese: 'Eu estou triste.' },
        { english: 'I am excited.', portuguese: 'Eu estou animado.' },
        { english: 'I am scared.', portuguese: 'Eu estou com medo.' },
        { english: 'I am angry.', portuguese: 'Eu estou bravo.' },
        { english: 'I am tired.', portuguese: 'Eu estou cansado.' },
        { english: 'I feel better now.', portuguese: 'Eu me sinto melhor agora.' },
        { english: 'Don’t worry.', portuguese: 'Não se preocupe.' }
    ]
};

// Conversation data: tópicos com diálogos (lista de linhas)
const conversationData = {
    'greetings': [
        { speaker: 'A', en: 'Hello!', pt: 'Olá!' },
        { speaker: 'B', en: 'Hi! How are you?', pt: 'Oi! Como você está?' },
        { speaker: 'A', en: 'I’m fine, thank you.', pt: 'Estou bem, obrigado.' }
    ],
    'at-school': [
        { speaker: 'A', en: 'Good morning, teacher!', pt: 'Bom dia, professora!' },
        { speaker: 'B', en: 'Good morning! Please sit down.', pt: 'Bom dia! Por favor, sente-se.' }
    ],
    'at-the-store': [
        { speaker: 'A', en: 'Excuse me, how much is this?', pt: 'Com licença, quanto custa isto?' },
        { speaker: 'B', en: 'It is ten dollars.', pt: 'São dez dólares.' }
    ]
};
