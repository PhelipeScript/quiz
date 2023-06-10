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

const desenhoAnimado = [
  new Quiz('Qual o nome das meninas super poderosas ?', 'Lindinha, Margarita e Melzinho', 'Melzinho, Lindinha e Docinho', 'Florzinha, Melzinho e Docinho', 'Florzinha, Lindinha e Docinho', 'Florzinha, Moranguinho e Lindinha', 'Florzinha, Lindinha e Docinho'),

  new Quiz('Qual o nome do animal de estimação do Bob Esponja ?', 'Jerry', 'Gary', 'Mary', 'Larry', 'Perry', 'Gary'),

  new Quiz('Qual a cor do cabelo da Branca de Neve ?', 'Branco', 'Loiro', 'Preto', 'Ruivo', 'Castanho', 'Preto'),

  new Quiz('O Patolino mora com qual personagem ?', 'Gaguinho', 'Vovó',  'Papa-Léguas', 'Frajola', 'Pernalonga', 'Pernalonga'),

  new Quiz('Qual o nome da mulher do Fred Flintstone ?', 'Wilma Flintstone', 'Betty Flintstone', 'Wilma Rubble', 'Pebbles Flintstone', 'Hanna Flintstone', 'Wilma Flintstone'), 

  new Quiz('Qual o nome do cachorro que tinha no Tom & Jerry ?', 'Pluto', 'Thomas', 'Lupe', 'Spike', 'Bred', 'Spike'),

  new Quiz('Qual o nome do amigo do Bart Simpson ?', 'Milhouse', 'Milcar', 'Millamp', 'Muller', 'Milton', 'Milhouse'),

  new Quiz('Qual o nome do ornitorrinco de Phineas e Ferb ?', 'Gary', 'Perry', 'Lary', 'Terry', 'Berry', 'Perry'), 

  new Quiz('No Bob esponja, a filha do sr. sirigueijo é uma: ', 'Água-viva', 'Caranguejo', 'Baleia', 'Esquilo', 'Camarão', 'Baleia'),

  new Quiz('Em Scooby-Doo, Qual personagem usava óculos ?', 'Scooby', 'Velma', 'Daphne', 'Fred', 'Salsicha', 'Velma')
];

function start() {
  const numeroPergunta = document.querySelector('.numero-pergunta');
  numeroPergunta.innerText = `Pergunta ${qtdPerguntasFeitas} de 10`;

  indexPergAtual = Math.floor(Math.random() * 10);
  novoQuiz(desenhoAnimado[indexPergAtual]);
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
  const alternativas = document.querySelectorAll('.alternativa');

  for (let i = 0; i < alternativas.length; i++) {
    if (alternativas[i].innerText == desenhoAnimado[indexPergAtual].alternativaCorreta) {
      alternativas[i].classList.add('acertou');
    } else {
      alternativas[i].classList.add('errou'); 
    }
  }
}

function proximaPergunta() {
  const alternativas = document.querySelectorAll('.alternativa');
  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].classList.remove('acertou', 'errou', 'marcada');
  }

  if (qtdPerguntasFeitas == 10) {
    console.log(`Acertou: ${acertos}, Errou: ${erros}`);

    const quiz = document.querySelector('.quiz')
    quiz.classList.add('sumir');

    const resultado = document.querySelector('.resultado');
    resultado.classList.remove('sumir');

    return;
  }

  const botaoProx = document.querySelector('.proximo');
  botaoProx.classList.add('sumir');

  const botaoConferir = document.querySelector('.conferir');
  botaoConferir.classList.remove('sumir');

  const botaoMostrarCorretas = document.querySelector('.mostrar-corretas');
  botaoMostrarCorretas.classList.add('sumir'); 

  qtdPerguntasFeitas++;
  const numeroPergunta = document.querySelector('.numero-pergunta');
  numeroPergunta.innerText = `Pergunta ${qtdPerguntasFeitas} de 10`;

  do {
    indexPergAtual = Math.floor(Math.random() * 10);
  } while(jaPerguntou.includes(indexPergAtual));
  jaPerguntou.push(indexPergAtual);
  novoQuiz(desenhoAnimado[indexPergAtual]);
}

function conferir() {
  const alternativaMarcada = document.querySelector('.marcada');
  if (!alternativaMarcada) return;

  const botaoProx = document.querySelector('.proximo');
  botaoProx.classList.toggle('sumir');

  const botaoConferir = document.querySelector('.conferir');
  botaoConferir.classList.toggle('sumir');

  const botaoMostrarCorretas = document.querySelector('.mostrar-corretas');
  
  if (alternativaMarcada.innerText == desenhoAnimado[indexPergAtual].alternativaCorreta) {
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
  start();

  const resultado = document.querySelector('.resultado');
  resultado.classList.add('sumir');

  const quiz = document.querySelector('.quiz');
  quiz.classList.remove('sumir');
}
