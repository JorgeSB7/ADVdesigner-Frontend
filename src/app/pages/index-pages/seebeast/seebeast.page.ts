import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { beast } from 'src/app/model/beast';
import { ReadService } from 'src/app/services/read.service';

@Component({
  selector: 'app-seebeast',
  templateUrl: './seebeast.page.html',
  styleUrls: ['./seebeast.page.scss'],
})
export class SeebeastPage implements OnInit {
  @Input("beast") beast: beast;
  private text: string;
  private aux: any;
  private aux2: any;
  private loreCon: string;

  constructor(private modalController: ModalController, private readh: ReadService) { }

  ngOnInit() {
    this.loreTipo();
    this.rango();
  }

  public exit() {
    this.modalController.dismiss();
  }

  /**
   * Reproduce por audio la descripcion de la bestia.
   */
  repro() {
    this.text = this.beast.lore
    this.readh.talk(this.text);
  }

  /**
   * Proporciona informacion extra de la bestia dependiendo del tipo de criatura a la que pertenece.
   */
  loreTipo() {
    switch (this.beast.type) {
      case 'Aberración':
        this.loreCon = "Las aberraciones son seres en extremo anómalos y extraños. Muchos poseen habilidades mágicas que se originan en sus mentes anómalas y no en las fuerzas místicas de la naturaleza.";
        break;

      case 'Bestia':
        this.loreCon = "Las bestias son todos los animales no-humanoides que son parte del mundo natural. Algunos podrían poseer ciertos poderes mágicos, pero la gran mayoría no poseen ni inteligencia, ni organización social ni lenguaje. Dentro del tipo “bestia” se incluyen todos los animales conocidos, incluso dinosaurios o versiones gigantes de animales normales.";
        break;

      case 'Celestial':
        this.loreCon = "Los celestiales son seres nativos de los Planos Superiores. Muchos son sirvientes de las deidades como mensajeros o agentes en el mundo mortal o en otros planos. Los celestiales son buenos por naturaleza, así que el celestial que se desvía de la alineación benéfica es una horrible rareza. Entre los celestiales están: ángeles, couátles y pegasos.";
        break;

      case 'Cieno':
        this.loreCon = "Los cienos son seres gelatinosos que rara vez tiene forma fija. Son usualmente subterráneos, viven en cuevas y mazmorras alimentándose de basura, carroña, y seres desgraciados que tengan la mala suerte de topar con ellos. Los cubos gelatinosos son los más comunes.";
        break;

      case 'Constructo':
        this.loreCon = "Un constructo es crea, no nace. Algunos son programados para seguir instrucciones sencillas, mientras que otros son capacitados con inteligencia y conciencia propias. Los golems son los constructos más icónicos. Muchos seres nativos de Mechanus, tales como los modrones, son constructos creados de la materia pura de ese plano por la voluntad de poderosos seres.";
        break;

      case 'Infernal':
        this.loreCon = "Los infernales son seres retorcidos de los Planos Inferiores. Algunos son sirvientes de deidades, pero muchos trabajan para archidiablos y príncipes demoníacos. En ocasiones, algún sacerdote maligno o magos invoca un infernal al mundo material para pactar algún servicio a cambio de poder. Si un celestial maligno es una rareza, un infernal bueno es casi inconcebible. Los infernales incluyen: demonios, diablos, perros infernales, rakshasas y yugolotes.";
        break;

      case 'Dragón':
        this.loreCon = "Los dragones son seres de orígenes ancestrales y temibles poderes. Los dragones verdaderos, que incluye a los dragones metálicos benéficos y los dragones cromáticos malignos, son seres de gran inteligencia y capacidades mágicas innatas. Dentro de esta categoría se incluyen seres relacionados con los verdaderos dragones pero menos poderosos, inteligentes y mágicos, tales como guivernos y pseudodragones.";
        break;

      case 'Elemental':
        this.loreCon = "Los elementales son seres nativos de las planos elementales. Algunos son simples masas animadas de sus respectivos elementos. Otros poseen energía elemental influída en su forma biológica. Las razas de genios, incluyendo los jinn y los efrit, forman las más importantes civilizaciones del Plano Elemental. Otros seres elementales son: azeres, acechadores invisibles y aguararas.";
        break;

      case 'Ejambre':
        this.loreCon = "Los enjambres pueden están formados por diferentes tipos de insectos o criaturas pequeñas. Pueden suponer una ameneza crítica para los aventureros distraídos.";
        break;

      case 'Fata':
        this.loreCon = "Los fata, o hadas, son seres mágicos fuertemente ligados a las fuerzas de la naturaleza. Suelen vivir en grutas oscuras y bosques nublosos. En otras palabras, están fuertemente relacionados al Plano de Faerie. Algunos también se encuentran en los Planos Exteriores, particularmente en Arbórea y Bestialia. Las hadas incluyen: Dríades, pixis y sátiros.";
        break;

      case 'Gigante':
        this.loreCon = "Los gigantes son humanoides de tamaños extremos, pueden poseer múltiples cabezas como los etinos o deformidades como los fomorianos. Existen seis variedades principales de gigantes verdaderos: gigantes de montaña, de piedra, de frío, de fuego, de nube y de tormenta. Además, otros como ogros y troles son considerados también gigantes.";
        break;

      case 'Humanoide':
        this.loreCon = "Los humanoides son los principales seres de los mundos de fantasía. Pueden ser civilizados o salvajes. Poseen lenguaje y cultura, muy pocos nacen con habilidades mágicas, aunque la mayoría puede aprender magia. Todos son bípedos. Las razas más comunes son las más adecuadas para los jugadores: humanos, enanos, elfos y medianos.";
        break;

      case 'Monstruosidad':
        this.loreCon = "Las monstruosidades son en sentido estricto los verdaderos “monstruos”, seres temibles, fuera de lo común, de lo natural y casi nunca benignos. Algunos son resultado de fallos en la experimentación mágica, otros productos de terribles maldiciones como los minotauros y los yuan-ti. Las monstruosidades desafían toda explicación y su categoría se utiliza para cualquier ser que no pueda ser incluído en otros tipos.";
        break;

      case 'No muerto':
        this.loreCon = "Los no-muertos fueron alguna vez seres vivos, arrastrados a un horrible estado de no-muerte por medio de prácticas necrománticas o alguna maldición impía. Los no-muertos incluyen cadáveres andantes, como vampiros y zombis, también espíritus sin cuerpos como fantasmas y espectros.";
        break;

      case 'Planta':
        this.loreCon = "Las plantas en este contexto son seres vegetales extraordinarios. La mayoría son ambulatorios y algunos carnívoros. Las plantas más conocidas son las marañas y los treant. Seres fungosos como el gas de esporas y los micónidos entran en esta categoría.";
        break;

      case 'Otro':
        this.loreCon = "En esta categoría entran las criaturas desconocidas o las que no se puedan clasificar en el resto de tipos.";
        break;

      default:
        break;
    }
  }

  /**
   * Dependiendo del poder la bestia la clasifica en un rango.
   */
  rango() {
    if (this.beast.power >= 100) {
      this.aux2 = "Pesadilla"
    } else if (this.beast.power >= 90 && this.beast.power < 100) {
      this.aux2 = "Legendario"
    } else if (this.beast.power >= 80 && this.beast.power < 90) {
      this.aux2 = "Maestro"
    } else if (this.beast.power >= 70 && this.beast.power < 80) {
      this.aux2 = "Difícil"
    } else if (this.beast.power >= 45 && this.beast.power < 70) {
      this.aux2 = "Medio"
    } else if (this.beast.power >= 5 && this.beast.power < 25) {
      this.aux2 = "Fácil"
    } else if (this.beast.power >= 0 && this.beast.power < 5) {
      this.aux2 = "Inofensivo"
    } else {
      this.aux2 = "---"
    }
  }

}
