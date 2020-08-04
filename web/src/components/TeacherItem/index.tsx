import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://avatars3.githubusercontent.com/u/29718462?s=460&u=b2ea8f4d6b9415dcfd000f105710a13ffa33eec9&v=4" alt="Fáiza Schoeninger"/>
        <div>
          <strong>Fáiza Letícia Schoeninger</strong>
          <span>Química</span>
        </div>
      </header>

      <p>
        Entusiasta das melhores tecnologias de química avançada.abs
        <br />
        <br />
        Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 20,00</strong>
        </p>
        <button type="button">
          <img src={ whatsappIcon } alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>
    </article>
  );
}

export default TeacherItem;