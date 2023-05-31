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

// 1 tema - Objeto com 1 pergunta, 5 alternativas, 1 alternativa correta;
const algoritmos = new Quiz('Qual o nome do carinha que mora logo ali?', 'Phelipe', 'Jorge', 'Cláudio', 'Irineu', 'Cauã', 'Phelipe');

function start() {
  const h2 = document.querySelector('.pergunta > h2');
  const alternativas = document.querySelectorAll('.alternativa');

  h2.innerText = algoritmos.pergunta;
  for (let i = 0; i < alternativas.length; i++) {
    alternativas[i].innerText = algoritmos.alternativas[i];

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

  const alternativas = document.querySelectorAll('.alternativa');
  const botaoProx = document.querySelector('.proximo');
  const botaoConferir = document.querySelector('.conferir');
  botaoConferir.classList.toggle('sumir');
  botaoProx.classList.toggle('sumir');

  for (let i = 0; i < alternativas.length; i++) {
    if (alternativas[i].innerText == algoritmos.alternativaCorreta) {
      alternativas[i].classList.add('acertou');
    } else {
      alternativas[i].classList.add('errou'); 
    }
  }

  if (alternativaMarcada.innerText == algoritmos.alternativaCorreta) {
    alternativaMarcada.classList.add('acertou'); 
  } else {
    alternativaMarcada.classList.add('errou'); 
  }
}
