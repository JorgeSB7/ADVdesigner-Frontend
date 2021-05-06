import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { magic } from 'src/app/model/magic';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-seemagic',
  templateUrl: './seemagic.page.html',
  styleUrls: ['./seemagic.page.scss'],
})
export class SeemagicPage implements OnInit {
  @Input("magic") magic: magic;
  text: string;
  aux: any;
  loreCon: string;

  constructor(private modalController: ModalController, private readh: ReadService) { }

  ngOnInit() {
    this.loreConjuros();
  }

  public exit() {
    this.modalController.dismiss();
  }

  /**
   * Reproduce por voz la funcion del conjuro.
   */
  repro() {
    this.text = this.magic.lorem
    this.readh.talk(this.text);
  }

  /**
   * Esta funcion proporciona al usuario una breve descripcion de la escuala de magia a la que pertene el conjuro.
   */
  loreConjuros() {
    switch (this.magic.typem) {
      case 'Abjuración':
        this.loreCon = "La Escuela de la Abjuración es la que está centrada en la Defensa y la Protección. Cualquier conjuro que advierta de un peligro o nos proteja del daño pertenece a esta escuela. Puede que no sea una escuela demasiado espectacular que haga que tus enemigos exploten en mil pedazos, pero tiene alguno de los conjuros más versátiles y útiles del repertorio de cualquier lanzador de conjuros sensato.";
        break;

      case 'Adivinación':
        this.loreCon = "La Escuela de la Adivinación se centra en lo Oculto, en el conocimiento más allá de las ataduras mortales, en traspasar los engaños de la mente y ver la verdad de las cosas, e incluso en levantar las nieblas del futuro y echar un rápido vistazo. Su utilidad está alejada de las situaciones de combate, pero se convierte en una férrea aliada en situaciones sociales o para preparar situaciones peligrosas.";
        break;

      case 'Conjuración':
        this.loreCon = "La Escuela de Conjuración se centra en dos tipos de hechizos: aquellos que tienen que ver con la modificación del tiempo y el espacio atravesando dimensiones y planos de existencia, y los que permiten convocar objetos y elementos de la nada que dañen a tus adversarios.";
        break;

      case 'Encantamiento':
        this.loreCon = "La Escuela de Encantamiento es también una de esas que saca su mayor partido fuera del terreno de combate y que puede ayudar mucho a una clase a rolear y a obtener información, aunque a niveles altos se puede mostrar como decisiva en un duro enfrentamiento. Con la escuela de Encantamiento un lanzador de conjuros puede afectar la mente de los adversarios. Amistad, Calmar Emociones, Confusión, Dormir... son algunos de los efectos más sencillos que puedes provocar.";
        break;

      case 'Evocación':
        this.loreCon = "Evocación es la escuela que contiene el mayor número de conjuros ofensivos de todas. Es la Escuela de la Bola de Fuego, del Muro de Fuerza, del Proyectil Mágico, de la Rociada Prismática, de Rayo de Hechicería, del Terremoto... Si quieres hacer pupa a tus enemigos de forma directa, quemándolos, congelándolos, haciendo que les caiga encima rocas, esta debería ser tu escuela favorita... Curiosamente, esta también es la escuela de los conjuros de curación ya que, en cierta medida, la energía positiva se considera un tipo de elemento.";
        break;

      case 'Ilusionismo':
        this.loreCon = "El Ilusionismo es la Escuela que busca engañar a los sentidos y convencerlos de lo extraordinario. De nuevo, es una escuela más centrada en lo que ocurre fuera del combate y un buen ejemplo de esto son los hechizos de Invisibilidad, Disfrazarse, Espejismo, Silencio, Simulacro... Todos ellos buscan alterar la realidad para afectar a los sentidos, ocultando, camuflando y engañando a los sentidos.";
        break;

      case 'Nigromancia':
        this.loreCon = "La Nigromancia es la escuela que se dedica a tratar la muerte y la decadencia, la podredumbre y debilidad de la carne. En contra de lo que pueda parecer, no es una disciplina maligna, aunque es cierto que la tendencia es mostrar a los nigromantes como líderes de ejércitos de muertos y que disfrutan agostando a sus adversarios, arrebatándoles su energía vital.";
        break;

      case 'Transmutación':
        this.loreCon = "Con Transmutación el lanzador de conjuros es capaz de alterar la naturaleza física de las cosas, de cambiar su forma, color, naturaleza e incluso de afectar el mismo tiempo. Moldear la Piedra y Prestidigitación son ejemplos de cómo alterar la materia alrededor del hechicero.";
        break;

      default:
        break;
    }
  }
}
