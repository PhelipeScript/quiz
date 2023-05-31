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
  const aleatorio = Math.floor(Math.random() * 10);
  
  novoQuiz(desenhoAnimado[aleatorio]);
  
}

function novoQuiz(quiz) {
  const h2 = document.querySelector('.pergunta > h2');
  const alternativas = document.querySelectorAll('.alternativa');

  h2.innerText = quiz.pergunta;
  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].innerText = quiz.alternativas[i];

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
}

function conferir() {
  const alternativaMarcada = document.querySelector('.marcada');
  if (!alternativaMarcada) return;

  const botaoProx = document.querySelector('.proximo');
  botaoProx.classList.toggle('sumir');

  const botaoConferir = document.querySelector('.conferir');
  botaoConferir.classList.toggle('sumir');

  const alternativas = document.querySelectorAll('.alternativa');

  for (let i = 0; i < alternativas.length; i++) {
    if (alternativas[i].innerText == desenhoAnimado[9].alternativaCorreta) {
      alternativas[i].classList.add('acertou');
    } else {
      alternativas[i].classList.add('errou'); 
    }
  }

  if (alternativaMarcada.innerText == desenhoAnimado[9].alternativaCorreta) {
    alternativaMarcada.classList.add('acertou'); 
  } else {
    alternativaMarcada.classList.add('errou'); 
  }
}
