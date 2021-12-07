import React from "react";
import Card from "./Card";
import proyec from "../assets/proyec.png";

const cards = [
    {
      id: 1,
      title: "Proyectos",
      image: proyec,
      text: "En esta modulo se pueden gestionar los proyectos de investigacion .",
    },
    {
      id: 2,
      title: "Avances",
      image: proyec,
      text: "En esta modulo se podrán realizar los avances de los proyectos de investigacion.",
    },
    {
      id: 3,
      title: "Inscripciones",
      image: proyec,
      text: "En este modulo se pueden realizar las inscripciones a los proyectos de investigacion.",
    },
  ];
  
  function Cards() {
    return (
      <div>
        <div className="flex flex-row flex-wrap py-14  px-10 justify-center">
          {cards.map((card) => (
            <div className="w-full lg:w-3/6 xl:w-4/12 px-8 mb-5 " key={card.id}>
              <Card                title={card.title}
                imageSource={card.image}
                text={card.text}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default Cards;