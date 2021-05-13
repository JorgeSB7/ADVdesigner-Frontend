import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';
import { character } from 'src/app/model/character';
import { UiService } from 'src/app/services/ui.service';

//_________________________________________________________pdfmake
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { AuthService } from 'src/app/services/auth.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-seecharacter',
  templateUrl: './seecharacter.page.html',
  styleUrls: ['./seecharacter.page.scss'],
})
export class SeecharacterPage implements OnInit {
  @Input("character") character: character;
  private text: string;
  private pdfObj: any;
  private aux: any;
  private aux2: any;
  private aux3: any;
  private aux4: any;
  private loreRaza: string;
  private loreClase: string;
  private fue; des; con; int; sab; car: string
  private urlSafe: SafeResourceUrl;
  private urlSafe2: SafeResourceUrl;

  constructor(private modalController: ModalController,
    private ui: UiService,
    private authS: AuthService,
    private file: File,
    private fileOponer: FileOpener,
    private platform: Platform,
    private navCrtl: NavController,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    // Se determinan la raza y clase del personaje para proporcionar informacion extra.
    this.loreRazas();
    this.loreClases();

    // Se aplican los bonus una vez se entra en la visualizacion del personaje.
    this.fue = this.bonus(this.character.strength);
    this.des = this.bonus(this.character.dexterity);
    this.con = this.bonus(this.character.constitution);
    this.int = this.bonus(this.character.intelligence);
    this.sab = this.bonus(this.character.wisdom);
    this.car = this.bonus(this.character.charisma);

    // Para evitar el error (UNSAFE VALUE USED IN A RESOURCE URL CONTEXT)
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.aux3);
    this.urlSafe2= this.sanitizer.bypassSecurityTrustResourceUrl(this.aux4);
  }

  public exit() {
    this.modalController.dismiss();
  }

  /**
   * La funcion comprueba los valores de las caracteristicas del personaje y proporciona
  un bonus a las tiradas cuando el jugador vaya a jugar con su ficha.
   * @param atributo recibe la caracteristica a la quedar un valor bonus.
   * @returns devuelve el bonus.
   */
  bonus(atributo) {
    var auxbonus;
    if (atributo == 18 || atributo == 19) {
      auxbonus = "+4"
    } else if (atributo == 20) {
      auxbonus = "+5"
    } else if (atributo == 16 || atributo == 17) {
      auxbonus = "+3"
    } else if (atributo == 14 || atributo == 15) {
      auxbonus = "+2"
    } else if (atributo == 12 || atributo == 13) {
      auxbonus = "+1"
    } else if (atributo == 10 || atributo == 11) {
      auxbonus = "+0"
    } else if (atributo == 8 || atributo == 9) {
      auxbonus = "-1"
    } else if (atributo == 6 || atributo == 7) {
      auxbonus = "-2"
    } else if (atributo == 4 || atributo == 5) {
      auxbonus = "-3"
    } else if (atributo == 2 || atributo == 3) {
      auxbonus = "-4"
    } else if (atributo == 0 || atributo == 1) {
      auxbonus = "-5"
    } else {
      auxbonus = "---"
    }
    return auxbonus;
  }

  /**
   * Esta funcion complementa al personaje y al PDF. Añadira una breve descripcion 
   dependiendo de la raza del personaje.
   */
  loreRazas() {
    switch (this.character.race) {
      case 'Humano':
        this.loreRaza = "En los registros de la mayoría de los mundos, los humanos son la más joven de las razas comunes. Han llegado comparativamente tarde al mundo y sus vidas son más cortas que las de enanos, elfos y dragones. Y quizá sea precisamente por estas breves existencias por lo que los humanos aspiran a conseguir tanto como sean capaces en los años que se les han concedido.";
        this.aux4 = "https://www.youtube.com/embed/TIBjbAeV7WQ";
        break;

      case 'Elfo':
        this.loreRaza = "Los elfos circulan libremente por las tierras de los humanos, donde siempre son bienvenidos pero nunca se encuentran como en casa. Son gentes conocidas por su poesía, baile, canto, saber y artes mágicas, y gustan de las cosas cuya belleza sea natural y sencilla.";
        this.aux4 = "https://www.youtube.com/embed/QvOedwKksWA";
        break;

      case 'Enano':
        this.loreRaza = "Los enanos son conocidos por su habilidad en el arte de la guerra, su gran resistencia a los castigos, su conocimiento de los secretos de la tierra, su dedicación al trabajo y su capacidad para beber cerveza. Los enanos son gente poco dada a las risas o las bromas, y suelen mostrarse recelosos con los desconocidos; sin embargo, se comportan de forma generosa con los que se ganan su confianza.";
        this.aux4 = "https://www.youtube.com/embed/ziNLOovtUp0";
        break;

      case 'Gnomo':
        this.loreRaza = "Los gnomos son bienvenidos en todas partes como técnicos, alquimistas e inventores, pero muchos de ellos prefieren quedarse entre los suyos aunque sus habilidades estén muy demandadas. Viven en cómodas madrigueras excavadas bajo colinas onduladas y frondosas. Aunque en estos lugares abundan los animales, ir de caza es una pésima idea.";
        this.aux4 = "https://www.youtube.com/embed/rNrWieFGOnE";
        break;

      case 'Dracónido':
        this.loreRaza = "Tu herencia dracónida se manifiesta en una serie de rasgos que compartes con otros dracónidos. Los dracónidos tienden hacia los extremos en la guerra cósmica entre el bien y el mal. La mayoría son buenos, pero los que se ponen de lado del mal pueden ser terriblemente malignos.";
        this.aux4 = "https://www.youtube.com/embed/_dnOz8u0_o4";
        break;


      case 'Mediano':
        this.loreRaza = "Tu personaje mediano tiene unos cuantos rasgos en común con el resto de medianos. La mayoría de los medianos son neutrales buenos. Como norma general, tienen buen corazón y son amables, odian ver a otros sufrir y no toleran la opresión. También son pacíficos y tradicionales, tienen una fuerte tendencia a apoyar a su comunidad y nunca renuncian a la comodidad de sus costumbres.";
        this.aux4 = "https://www.youtube.com/embed/rZCkwE2hRVg";
        break;


      case 'Semielfo':
        this.loreRaza = "Tu personaje semielfo tiene algunas cracterísticas en común con los elfos y otras que son únicas para los semielfos. Los semielfos comparten la inclinación caótica de su herencia élfica. Valoran tanto la libertad personal como la expresión de la creatividad y no demuestran ni amor por los líderes ni deseo de tener seguidores. Les irritan las reglas, se ofenden ante las exigencias de los demás y a veces son poco fiables o, al menos, impredecibles.";
        this.aux4 = "https://www.youtube.com/embed/W0ScLW9ERcI";
        break;

      case 'Semiorco':
        this.loreRaza = "Tu personaje semiorco tiene ciertos rasgos que derivan de su ancestro orco. Los semiorcos heredan la tendencia hacia el caos de sus progenitores orcos y no están muy inclinados hacia el bien. Los semiorcos que se crían entre orcos y que permanecen entre ellos suelen ser malignos.";
        this.aux4 = "https://www.youtube.com/embed/J4nr1iU1yVQ";
        break;

      case 'Tiefling':
        this.loreRaza = "Puede que los tieflings no tengan una tendencia innata hacia el mal, pero muchos de ellos acaban ahí. Maligna o no, una fuerza externa inclina a muchos tieflings hacia un alineamiento caótico.";
        this.aux4 = "https://www.youtube.com/embed/4-oDA9W4gHc";
        break;

      default:
        break;
    }
  }

  /**
   * Esta funcion complementa al personaje y al PDF. Añadira una breve descripcion, una imagen 
   y competencias dependiendo de la clase del personaje.
   */
  loreClases() {
    switch (this.character.rolclass) {
      case 'Bárbaro':
        this.loreClase = "Para algunos, su rabia brota de la comunión con espíritus de animales salvajes. Otros recurren a su hirviente reserva de ira frente a un mundo lleno de dolor. Para los bárbaros, la furia es un poder que no sólo les proporciona un frenesí ciego en la batalla, sino también extraordinarios reflejos, resistencia y proezas de fuerza. Requisitos para multiclase: Fuerza 13.";
        this.aux = "../assets/imgs/iconclasses/brb.jpg";
        this.aux2 = "Competencia en dos habilidades a escoger entre: Atletismo, Intimidar, Naturaleza, Percepción, Supervivencia y Trato con Animales. Competencia en características: Fuerza y Constitución. Competencia con: Armas sencillas, Armas marciales, Armadura ligera, Armadura intermedia y Escudo.";
        this.aux3 = "https://www.youtube.com/embed/ibRJjgchwlg";
        break;

      case 'Bardo':
        this.aux = "../assets/imgs/iconclasses/brd.jpg";
        this.aux2 = "Competencia en características: Destreza y Carisma. Competencia con: Armas sencillas, Armadura ligera, Instrumentos musicales, Espada corta, Espada larga, Estoque y Ballesta de mano. Competencia en tres habilidades a escoger.";
        this.aux3 = "https://www.youtube.com/embed/n08bH22btNs";
        this.loreClase = "Ya sea un erudito, un poeta o un canalla, un bardo teje su magia a través de sus palabras y su música para inspirar a los aliados, desmoralizar a los enemigos, manipular mentes, crear ilusiones e incluso sanar heridas. Requisitos para multiclase: Carisma 13.";
        break;

      case 'Brujo':
        this.aux = "../assets/imgs/iconclasses/brj.jpg";
        this.aux2 = "Competencia en características: Sabiduría y Carisma. Competencia en dos habilidades a escoger entre: Arcanos, Engañar, Historia, Intimidar, Investigación, Naturaleza y Religión. Competencia con: Armas sencillas y Armadura ligera."
        this.aux3 = "https://www.youtube.com/embed/vPDcElbBu8g";
        this.loreClase = "Los brujos son buscadores del conocimiento que se encuentra escondido en el multiverso. A través de pactos hechos con seres poderosos de poder sobrenatural, los brujos desatan efectos mágicos tanto sutiles como espectaculares y recolectan secretos arcanos para potenciar su propio poder. Requisitos para multiclase: Carisma 13.";
        break;

      case 'Clérigo':
        this.aux = "../assets/imgs/iconclasses/cle.jpg";
        this.aux2 = "Competencia en características: Sabiduría y Carisma. Competencia con: Armas sencillas, Armadura ligera, Armadura intermedia y Escudo. Competencia en dos habilidades a escoger entre: Historia, Medicina, Perspicacia, Persuasión y Religión."
        this.aux3 = "https://www.youtube.com/embed/H7cZIzuOdJo";
        this.loreClase = "Los clérigos son intermediarios entre el mundo mortal y los distantes planos divinos. Tan diferentes entre ellos como los dioses a los que sirven, los clérigos se esfuerzan por personificar las obras de sus deidades. No son sacerdotes ordinarios, un clérigo se encuentra imbuido de magia divina. Requisitos para multiclase: Sabiduría 13.";
        break;

      case 'Druida':
        this.aux = "../assets/imgs/iconclasses/dru.jpg";
        this.aux2 = "Competencia en características: Inteligencia y Sabiduría. Competencia con: Armadura ligera, Armadura intermedia, Escudo, Bastón, Clava, Daga, Hoz, Jabalina, Lanza, Dardo, Honda, Cimitarra, Kit de herborista. Competencia en dos habilidades a escoger entre Arcanos, Medicina, Naturaleza, Percepción, Perspicacia, Religión, Supervivencia y Trato con Animales."
        this.aux3 = "https://www.youtube.com/embed/XgaAy9g4KxI";
        this.loreClase = "Ya sea invocando a las fuerzas elementales o emulando a las criaturas del mundo animal, los druidas son la personificación de la resistencia, astucia y furia de la naturaleza. Dicen no tener un dominio sobre la naturaleza. En lugar de eso, se ven como una extensión de la voluntad indomable de la misma. Requisitos para multiclase: Sabiduría 13.";
        break;

      case 'Explorador':
        this.aux = "../assets/imgs/iconclasses/exp.jpg";
        this.aux2 = "Competencia en características: Fuerza y Destreza. Competencia con: Armas sencillas, Armas marciales, Armadura ligera, Armadura intermedia y Escudo. Competencia en tres habilidades a escoger entre Atletismo, Investigación, Naturaleza, Percepción, Perspicacia, Sigilo, Supervivencia y Trato con Animales."
        this.aux3 = "https://www.youtube.com/embed/NARuhOjHM3c";
        this.loreClase = "Lejos del bullicio de las ciudades y pueblos, más allá de las defensas que mantienen a las granjas más lejanas protegidas de los terrores de la naturaleza, en medio de tupidos bosques sin caminos y a través de enormes y vacías llanuras, los exploradores mantienen su interminable guardia. Requisitos para multiclase: Destreza 13 y Sabiduría 13.";
        break;

      case 'Guerrero':
        this.aux = "../assets/imgs/iconclasses/gue.jpg";
        this.aux2 = "Competencia con: Armas sencillas, Armas marciales, Armadura ligera, Armadura intermedia, Armadura pesada y Escudo. Competencia en características: Fuerza y Constitución. Competencia en dos habilidades a escoger entre: Acrobacias, Atletismo, Historia, Intimidar, Percepción, Perspicacia, Supervivencia y Trato con Animales.";
        this.aux3 = "https://www.youtube.com/embed/8XUKKuvKS3U";
        this.loreClase = "Todos los guerreros comparten un dominio magistral de las armas y armaduras, y un exhaustivo conocimiento de las habilidades del combate. Además, están muy relacionados con la muerte, tanto repartiéndola como mirándola fijamente, desafiantes. Requisitos para multiclase: Fuerza 13 o Destreza 13.";
        break;

      case 'Hechicero':
        this.aux = "../assets/imgs/iconclasses/hch.jpg";
        this.aux2 = "Competencia en características: Constitución y Carisma. Competencia con: Bastón, Daga, Ballesta ligera, Dardo y Honda. Competencia en dos habilidades a escoger entre: Arcanos, Engañar, Intimidar, Perspicacia, Persuasión y Religión.";
        this.aux3 = "https://www.youtube.com/embed/onx7vvq1Hn4";
        this.loreClase = "Los hechiceros tienen una magia innata, conferida por una línea de sangre exótica, una influencia de otro mundo o la exposición a fuerzas cósmicas desconocidas. Uno no puede estudiar hechicería como quien estudia un lenguaje, más de lo que uno puede aprender a vivir una vida legendaria. Nadie elige la hechicería, el poder elige al hechicero. Requisitos para multiclase: Carisma 13.";
        break;

      case 'Mago':
        this.aux = "../assets/imgs/iconclasses/mag.jpg";
        this.aux2 = "Competencia con: Bastón, Daga, Ballesta ligera, Dardo y Honda. Competencia en características: Inteligencia y Sabiduría. Competencia en dos habilidades a escoger entre: Arcanos, Historia, Investigación, Medicina, Perspicacia y Religión.";
        this.aux3 = "https://www.youtube.com/embed/akeg4RvsSOs";
        this.loreClase = "Los magos son los practicantes supremos de la magia, definidos y unidos como una clase por los hechizos que conjuran. A partir de la sutil onda de la magia que impregna el cosmos, los magos lanzan explosivos hechizos de fuego, arcos voltaicos, sutiles engaños y brutales formas de control mental. Requisitos para multiclase: Inteligencia 13.";
        break;

      case 'Paladín':
        this.aux = "../assets/imgs/iconclasses/pal.jpg";
        this.aux2 = "Competencia en: Armas sencillas, Armas marciales, Armadura ligera, Armadura intermedia, Armadura pesada y Escudo. Competencia en características: Sabiduría y Carisma. Competencia en dos habilidades a escoger entre: Atletismo, Intimidar, Medicina, Perspicacia, Persuasión y Religión.";
        this.aux3 = "https://www.youtube.com/embed/qSM7S5Gz-Xo";
        this.loreClase = "Sean cuales sean sus orígenes y sus misiones, los paladines están unidos por sus juramentos para luchar en contra de las fuerzas del mal. El juramento de un paladín es un lazo muy poderoso. Es una fuente de poder que convierte a un devoto guerrero en un campeón bendecido. Requisitos para multiclase: Fuerza 13 y Carisma 13.";
        break;

      case 'Monje':
        this.aux = "../assets/imgs/iconclasses/mon.jpg";
        this.aux2 = "Competencia con: Armas sencillas, Instrumentos musicales, Espada corta y Herramientas de artesano. Competencia en características: Fuerza y Destreza. Competencia en dos habilidades a escoger entre: Acrobacias, Atletismo, Historia, Perspicacia, Religión y Sigilo.";
        this.aux3 = "https://www.youtube.com/embed/9jP4w9tReQ4";
        this.loreClase = "Cualquiera que sea su disciplina, los monjes están unidos por su habilidad para utilizar mágicamente la energía que corre por sus cuerpos. Ya sea canalizada en una impactante demostración de proeza marcial o en el sutil enfoque en la habilidad defensiva y la velocidad, esta energía impulsa todo lo que el monje hace. Requisitos para multiclase: Destreza 13 y Sabiduría 13.";
        break;

      case 'Pícaro':
        this.aux = "../assets/imgs/iconclasses/pic.jpg";
        this.aux2 = "Competencia con: Armas sencillas, Armadura ligera, Espada corta, Espada larga, Estoque, Ballesta de mano y Herramientas de ladrón. Competencia en características: Destreza y Inteligencia. Competencia en cuatro habilidades a escoger entre: Acrobacias, Atletismo, Engañar, Interpretación, Intimidar, Investigación, Juego de Manos, Percepción, Perspicacia, Persuasión y Sigilo.";
        this.aux3 = "https://www.youtube.com/embed/9MC7tCgKvlo";
        this.loreClase = "Los pícaros confían sus habilidades, el sigilo y las vulnerabilidades de sus oponentes para lograr sacar ventaja en cualquier situación. Tienen un don para encontrar la solución a prácticamente cualquier problema, demostrando un ingenio y versatilidad, que es la piedra angular de cualquier buen grupo de aventureros. Requisitos para multiclase: Destreza 13.";
        break;

      default:
        break;
    }
  }

  /**
   * Genera un archivo PDF con toda la informacion del personaje. 
   * Cuenta con la posibilidad de descargar el archivo en el dispositivo del usuario.
   */
  async generatePDF() {
    await this.ui.showLoading();
    try {
      let docDefinition = {
        content: [
          {
            columns: [
              {
                width: 'auto',
                text: "FICHA DE PERSONAJE", style: 'header'
              },
              {
                //image: this.aux, fit: [40, 40], style: 'whiteStyle'
              },
            ],
          },
          {
            columns: [
              {
                width: 'auto',
                text: 'Jugador:', bold: true
              },
              {
                width: 'auto',
                text: this.authS.getUser().name
              },
            ],
            columnGap: 5
          },

          { text: "espacio", style: 'whiteStyle' },
          { text: "espacio", style: 'whiteStyle' },
          { image: this.character.image, fit: [300, 300], style: 'centerStyle' },
          { text: "(retrato)", style: 'centerStyle' },
          { text: "espacio", style: 'whiteStyle' },
          { text: "espacio", style: 'whiteStyle' },
          { text: this.character.namecharacter, style: 'header2' },
          { text: "espacio", style: 'whiteStyle' },

          {
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: [80, 65, 40, '*'],

              body: [
                [{ text: 'Característica', bold: true }, { text: 'Puntuación', bold: true }, { text: 'Bonus', bold: true }, { text: 'Mide', bold: true }],
                ['Fuerza', this.character.strength, this.fue, 'atletismo natural, energía corporal'],
                ['Destreza', this.character.dexterity, this.des, 'agilidad física, reflejos y equilibrio'],
                ['Constitución', this.character.constitution, this.con, 'salud, resistencia, fuerza vital'],
                ['Inteligencia', this.character.intelligence, this.int, 'agudeza mental, habilidad analítica'],
                ['Sabiduría', this.character.wisdom, this.sab, 'percepción, intuición'],
                ['Carisma', this.character.charisma, this.car, 'confianza en uno mismo, elocuencia, liderazgo'],
              ]
            }
          },

          { text: "espacio", style: 'whiteStyle' },
          {
            columns: [
              {
                width: 'auto',
                text: 'Raza -', bold: true, fontSize: 15
              },
              {
                width: 'auto',
                text: this.character.race, bold: true, fontSize: 15
              }
            ],
            columnGap: 3
          },
          { text: this.loreRaza, style: 'justifyStyle' },

          { text: "espacio", style: 'whiteStyle' },
          {
            columns: [
              {
                width: 'auto',
                text: 'Clase -', bold: true, fontSize: 15
              },
              {
                width: 'auto',
                text: this.character.rolclass, bold: true, fontSize: 15
              }
            ],
            columnGap: 3
          },
          { text: this.loreClase, style: 'justifyStyle' },
          { text: "espacio", style: 'whiteStyle' },
          { text: "Competencias de clase:", bold: true, fontSize: 15 },
          { text: this.aux2, style: 'justifyStyle' },
        ],

        styles: {
          header: {
            fontSize: 22,
            bold: true,
          },
          header2: {
            fontSize: 20,
            bold: true,
            italics: true
          },
          whiteStyle: {
            alignment: 'right',
            color: 'white'
          },
          justifyStyle: {
            alignment: 'justify',
          },
          centerStyle: {
            alignment: 'center',
            italics: true,
          },
        }
      };
      console.log(docDefinition);

      this.pdfObj = pdfMake.createPdf(docDefinition);

      this.openPDF();
      await this.ui.hideLoading();
      this.ui.showToast("PDF generado correctamente", "success");
    } catch (error) {
      await this.ui.hideLoading();
      console.log(error);
      this.ui.showToast("Error, no se ha podido generar el PDF", "danger");
    }

  }

  // Abre el PDF.
  openPDF() {
    if (this.platform.is('cordova')) {
      this.pdfObj.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        this.file.writeFile(this.file.dataDirectory, 'pj.pdf', blob, { replace: true }).then(fileEntry => {
          this.fileOponer.open(this.file.dataDirectory + 'pj.pdf', 'application/pdf');
        });
      });
      return true;
    }
  }
}
