let jaPerguntou = [];
let indexPergAtual;
let qtdPerguntasFeitas = 1;
let acertos = 0;
let erros = 0;

const alternativas = document.querySelectorAll('.alternativa');
const alternativaMarcada = document.querySelector('.marcada');
const botaoProx = document.querySelector('.proximo');
const botaoConferir = document.querySelector('.conferir');
const botaoMostrarCorretas = document.querySelector('.mostrar-corretas');
const numeroPergunta = document.querySelector('.numero-pergunta');

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
  indexPergAtual = Math.floor(Math.random() * 10);
  novoQuiz(desenhoAnimado[indexPergAtual]);
  jaPerguntou.push(indexPergAtual);
}

(function marcaDesmarca() {
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
  h2.innerText = quiz.pergunta;
  
  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].innerText = quiz.alternativas[i];
  }
}

function mostrarAlternativasCorretas() {
  for (let i = 0; i < alternativas.length; i++) {
    if (alternativas[i].innerText == desenhoAnimado[indexPergAtual].alternativaCorreta) {
      alternativas[i].classList.add('acertou');
    } else {
      alternativas[i].classList.add('errou'); 
    }
  }
}

function proximaPergunta() {
  if (qtdPerguntasFeitas == 10) {
    console.log(`Acertou: ${acertos}, Errou: ${erros}`);
    return;
  }

  botaoProx.classList.add('sumir');

  botaoConferir.classList.remove('sumir');

  botaoMostrarCorretas.classList.add('sumir'); 

  qtdPerguntasFeitas++;
  numeroPergunta.innerText = `Pergunta ${qtdPerguntasFeitas} de 10`;

  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].classList.remove('acertou', 'errou', 'marcada');
  }

  do {
    indexPergAtual = Math.floor(Math.random() * 10);
  } while(jaPerguntou.includes(indexPergAtual));

  jaPerguntou.push(indexPergAtual);

  novoQuiz(desenhoAnimado[indexPergAtual]);
}

function conferir() {
  if (!alternativaMarcada) return;

  botaoProx.classList.toggle('sumir');

  botaoConferir.classList.toggle('sumir');

  if (alternativaMarcada.innerText == desenhoAnimado[indexPergAtual].alternativaCorreta) {
    alternativaMarcada.classList.add('acertou'); 
    acertos++;
  } else {
    alternativaMarcada.classList.add('errou'); 
    botaoMostrarCorretas.classList.toggle('sumir'); 
    erros++;
  }
}
