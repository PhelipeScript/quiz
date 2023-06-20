let jaPerguntou = [];
let indexPergAtual;
let qtdPerguntasFeitas = 1;
let acertos = 0;
let erros = 0;

class Quiz {
  constructor (pergunta, alternativa1, alternativa2, alternativa3, alternativa4, alternativa5, alternativaCorreta) {
    this.pergunta = pergunta;
    this.alternativas = [
      alternativa1,
      alternativa2,
      alternativa3,
      alternativa4,
      alternativa5,
    ];
    this.alternativaCorreta = alternativaCorreta;
  }
}

const matematica = [
  new Quiz('Como é chamado um ângulo com abertura maior que 180° e menor que 360°?', 'Ângulo agudo', 'Ângulo reto', 'Ângulo obtuso', 'Ângulo raso', 'Ângulo Côncavo', 'Ângulo Côncavo'),

  new Quiz('A operação inversa da potenciação é a:', 'Adição', 'Divisão', 'Radiciação', 'Subtração', 'Multiplicação', 'Radiciação'),

  new Quiz('5π/6 rad equivale a quantos graus?', '150°', '180°', '210°', '225°', '135°', '150°'),

  new Quiz('Qual das alternativas abaixo não é uma função matemática?', 'Função afim', 'Função segmentada', 'Função quadrática', 'Função exponencial', 'Função logarítmica', 'Função segmentada'),

  new Quiz('Segundo a equação exponencial 2ˣ=128 responda: Qual o valor de x?', 'x = 4', 'x = 6', 'x = 7', 'x = 5', 'x = 8', 'x = 7'),

  new Quiz('Qual é o nome da figura geométrica que tem cinco lados?', 'Eneágono', 'Retângulo', 'Hexágono', 'Pentágono', 'Heptágono', 'Pentágono'),

  new Quiz('Qual é o resultado de 13 - 8 x 6?', '35', '-35', '30', '-30', '56', '-35'),

  new Quiz('Qual é o nome da figura geométrica que tem quinze lados?', 'Pentadecágono', 'Undecágono', 'Icoságono', 'Decágono', 'Dodecágono', 'Pentadecágono'),

  new Quiz('Qual é o cosseno de 30°?', '√2/2', '√3/2', '1/2', '√3/3', '√3', '√3/2'),

  new Quiz('Qual é o seno de 330°?', '√2/2', '-√3/2', '-1/2', '-√2/2', '√3/2', '-1/2'),
]

function start() {
  const numeroPergunta = document.querySelector('.numero-pergunta');
  numeroPergunta.innerText = `Pergunta ${qtdPerguntasFeitas} de 10`;

  indexPergAtual = Math.floor(Math.random() * 10);
  novoQuiz(matematica[indexPergAtual]);
  jaPerguntou.push(indexPergAtual);
}

(function marcaDesmarca() {
  const alternativas = document.querySelectorAll('.alternativa');

  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].addEventListener('click', () => {
      const estaMarcada = alternativas[i].classList.contains('marcada');
      
      for (let i = 0; i < alternativas.length; i++) {
        alternativas[i].classList.remove('marcada');
      }

      if (!estaMarcada) {
        alternativas[i].classList.add('marcada');
      } 
    })
  }
}) ();

function novoQuiz(quiz) {
  const h2 = document.querySelector('.pergunta > h2');
  const alternativas = document.querySelectorAll('.alternativa');

  h2.innerText = quiz.pergunta;
  
  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].innerText = quiz.alternativas[i];
  }
}

function mostrarAlternativasCorretas() {
  const botaoMostrarCorretas = document.querySelector('.mostrar-corretas');
  botaoMostrarCorretas.classList.add('sumir'); 

  const alternativas = document.querySelectorAll('.alternativa');

  for (let i = 0; i < alternativas.length; i++) {
    if (alternativas[i].innerText == matematica[indexPergAtual].alternativaCorreta) {
      alternativas[i].classList.add('acertou');
    } else {
      alternativas[i].classList.add('errou'); 
    }
  }
}

function proximaPergunta() {
  const botaoProx = document.querySelector('.proximo');
  botaoProx.classList.add('sumir');

  const botaoConferir = document.querySelector('.conferir');
  botaoConferir.classList.remove('sumir');

  const botaoMostrarCorretas = document.querySelector('.mostrar-corretas');
  botaoMostrarCorretas.classList.add('sumir'); 
  
  const alternativas = document.querySelectorAll('.alternativa');
  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].classList.remove('acertou', 'errou', 'marcada');
  }

  if (qtdPerguntasFeitas == 10) {
    novoResultado(acertos, erros);

    const quiz = document.querySelector('.quiz')
    quiz.classList.add('sumir');

    const resultado = document.querySelector('.resultado');
    resultado.classList.remove('sumir');

    return;
  }

  qtdPerguntasFeitas++;
  const numeroPergunta = document.querySelector('.numero-pergunta');
  numeroPergunta.innerText = `Pergunta ${qtdPerguntasFeitas} de 10`;

  do {
    indexPergAtual = Math.floor(Math.random() * 10);
  } while(jaPerguntou.includes(indexPergAtual));
  jaPerguntou.push(indexPergAtual);
  novoQuiz(matematica[indexPergAtual]);
}

function conferir() {
  const alternativaMarcada = document.querySelector('.marcada');
  if (!alternativaMarcada) return;

  const botaoProx = document.querySelector('.proximo');
  botaoProx.classList.toggle('sumir');

  const botaoConferir = document.querySelector('.conferir');
  botaoConferir.classList.toggle('sumir');

  const botaoMostrarCorretas = document.querySelector('.mostrar-corretas');
  
  if (alternativaMarcada.innerText == matematica[indexPergAtual].alternativaCorreta) {
    alternativaMarcada.classList.add('acertou'); 
    acertos++;
  } else {
    alternativaMarcada.classList.add('errou'); 
    botaoMostrarCorretas.classList.toggle('sumir'); 
    erros++;
  }
}

function jogarDeNovo() {
  jaPerguntou = [];
  indexPergAtual = '';
  qtdPerguntasFeitas = 1;
  acertos = 0;
  erros = 0;
  start(matematica);

  const resultado = document.querySelector('.resultado');
  resultado.classList.add('sumir');

  const quiz = document.querySelector('.quiz');
  quiz.classList.remove('sumir');
}

function novoResultado(qtdAcertos, qtdErros) {
  const tbody = document.querySelector('tbody');
  
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>Acertou: <span>${qtdAcertos}</span></td>
    <td>Errou: <span>${qtdErros}</span></td>
  `

  tbody.appendChild(tr);
}
