# ROMI Form Test

Prueba Técnica para ROMI: Evaluación

## 🛠 Tecnologías usadas

<div align="center">
    <a href='https://react.dev/' target='_blank'> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React" height="50px" /> </a>
    <a href='https://vitejs.dev/' target='_blank'> <img src="https://vitejs.dev/logo.svg" alt="Vite" height="50px" /> </a>
    <a href='https://tailwindcss.com/docs/installation/using-vite' target='_blank'> <img src="https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg" alt="Tailwind CSS" height="50px" /></a>
</div>

## Instalación y Correr el Proyecto

### 1. Clonar el proyecto usando Git:

| Comando (Command)                                        | Uso (Usage)                   |
| -------------------------------------------------------- | ----------------------------- |
| `https://github.com/ingrauladolfo/romi-form.git` | Para usarlo con **HTTPS**     |
| `git@github.com:ingrauladolfo/romi-form.git`     | Para usarlo con **SSH**       |
| `gh repo clone ingrauladolfo/romi-form.git`          | Para usarlo en **GitHub CLI** |

### 2. Una vez clonado el repositorio, instalar las dependencias:

| Comando (Command) | Descripción (Description) |
| ----------------- | ------------------------- |
| `npm install`     | Versión completa          |
| `npm i`           | Versión corta             |

### 3. Correr el proyecto usando el comando `npm run dev`

## Correr el archivo db.json

Para poder correr la base de datos, usa el comando `npx json-server src/common/assets/db/db.json`.

```
{
   "symptoms": [
    {
      "id": 1,
      "key": "dolorCabeza",
      "label": "Dolor de cabeza"
    },
    {
      "id": 2,
      "key": "fiebre",
      "label": "Fiebre"
    },
    {
      "id": 3,
      "key": "tos",
      "label": "Tos"
    },
    {
      "id": 4,
      "key": "fatiga",
      "label": "Fatiga"
    },
    {
      "id": 5,
      "key": "nausea",
      "label": "Náusea"
    },
    {
      "id": 6,
      "key": "vomito",
      "label": "Vómito"
    },
    {
      "id": 7,
      "key": "diarrea",
      "label": "Diarrea"
    },
    {
      "id": 8,
      "key": "dolorAbdomen",
      "label": "Dolor abdominal"
    },
    {
      "id": 9,
      "key": "dolorMuscular",
      "label": "Dolor muscular"
    },
    {
      "id": 10,
      "key": "dificultadRespirar",
      "label": "Dificultad para respirar"
    },
    {
      "id": 11,
      "key": "dolorPecho",
      "label": "Dolor en el pecho"
    },
    {
      "id": 12,
      "key": "confusion",
      "label": "Confusión"
    },
    {
      "id": 13,
      "key": "mareo",
      "label": "Mareo"
    },
    {
      "id": 14,
      "key": "sudoracionExcesiva",
      "label": "Sudoración excesiva"
    },
    {
      "id": 15,
      "key": "cansancioExtremo",
      "label": "Cansancio extremo"
    },
    {
      "id": 16,
      "key": "sangrado",
      "label": "Sangrado"
    },
    {
      "id": 17,
      "key": "hinchazon",
      "label": "Hinchazón"
    },
    {
      "id": 18,
      "key": "dolorArticulaciones",
      "label": "Dolor en las articulaciones"
    },
    {
      "id": 19,
      "key": "faltaApetito",
      "label": "Falta de apetito"
    },
    {
      "id": 20,
      "key": "enrojecimiento",
      "label": "Enrojecimiento de la piel"
    },
    {
      "id": 21,
      "key": "dificultadHablar",
      "label": "Dificultad para hablar"
    },
    {
      "id": 22,
      "key": "erupciones",
      "label": "Erupciones cutáneas"
    },
    {
      "id": 23,
      "key": "dolorEspalda",
      "label": "Dolor de espalda"
    },
    {
      "id": 24,
      "key": "sangradoEncías",
      "label": "Sangrado de encías"
    },
    {
      "id": 25,
      "key": "dolorGarganta",
      "label": "Dolor de garganta"
    },
    {
      "id": 26,
      "key": "dificultadDeglucion",
      "label": "Dificultad para tragar"
    },
    {
      "id": 27,
      "key": "glositis",
      "label": "Glositis (inflamación de la lengua)"
    },
    {
      "id": 28,
      "key": "ronquidos",
      "label": "Ronquidos"
    },
    {
      "id": 29,
      "key": "temblores",
      "label": "Temblores"
    },
    {
      "id": 30,
      "key": "calambres",
      "label": "Calambres musculares"
    },
    {
      "id": 31,
      "key": "visibilidadBorrosa",
      "label": "Visión borrosa"
    },
    {
      "id": 32,
      "key": "zumbidosOidos",
      "label": "Zumbidos en los oídos"
    },
    {
      "id": 33,
      "key": "escurrimientoNasal",
      "label": "Escurrimiento nasal"
    },
    {
      "id": 34,
      "key": "congestionNasal",
      "label": "Congestión nasal"
    },
    {
      "id": 35,
      "key": "tinnitus",
      "label": "Tinnitus (sonido en los oídos)"
    },
    {
      "id": 36,
      "key": "faltaConcentracion",
      "label": "Falta de concentración"
    },
    {
      "id": 37,
      "key": "malaCirculacion",
      "label": "Mala circulación"
    },
    {
      "id": 38,
      "key": "infeccionUrinaria",
      "label": "Infección urinaria"
    },
    {
      "id": 39,
      "key": "ictericia",
      "label": "Ictericia (piel amarilla)"
    },
    {
      "id": 40,
      "key": "insomnio",
      "label": "Insomnio"
    },
    {
      "id": 41,
      "key": "hipertermia",
      "label": "Hipertermia (temperatura corporal alta)"
    },
    {
      "id": 42,
      "key": "hipotermia",
      "label": "Hipotermia (temperatura corporal baja)"
    },
    {
      "id": 43,
      "key": "sibilancias",
      "label": "Sibilancias"
    },
    {
      "id": 44,
      "key": "dificultadOrinar",
      "label": "Dificultad para orinar"
    },
    {
      "id": 45,
      "key": "urticaria",
      "label": "Urticaria (ronchas en la piel)"
    },
    {
      "id": 46,
      "key": "debiliad",
      "label": "Debilidad general"
    },
    {
      "id": 47,
      "key": "dolorHombros",
      "label": "Dolor en los hombros"
    },
    {
      "id": 48,
      "key": "dolorCadera",
      "label": "Dolor en la cadera"
    },
    {
      "id": 49,
      "key": "tension",
      "label": "Tensión muscular"
    },
    {
      "id": 50,
      "key": "mareoDePie",
      "label": "Mareo al estar de pie"
    },
    {
      "id": 51,
      "key": "bajoNivelEnergía",
      "label": "Bajo nivel de energía"
    },
    {
      "id": 52,
      "key": "tembloresManos",
      "label": "Temblores en las manos"
    },
    {
      "id": 53,
      "key": "hiperglucemia",
      "label": "Hiperglucemia (azúcar en sangre alta)"
    },
    {
      "id": 54,
      "key": "dolorCuerpo",
      "label": "Dolor general en el cuerpo"
    },
    {
      "id": 55,
      "key": "palpitaciones",
      "label": "Palpitaciones"
    },
    {
      "id": 56,
      "key": "angustia",
      "label": "Angustia"
    },
    {
      "id": 57,
      "key": "escalofríos",
      "label": "Escalofríos"
    },
    {
      "id": 58,
      "key": "irritabilidad",
      "label": "Irritabilidad"
    },
    {
      "id": 59,
      "key": "hinchazonAbdomen",
      "label": "Hinchazón abdominal"
    },
    {
      "id": 60,
      "key": "sangradoRectal",
      "label": "Sangrado rectal"
    },
    {
      "id": 61,
      "key": "dolorCuello",
      "label": "Dolor de cuello"
    },
    {
      "id": 62,
      "key": "dificultadCaminar",
      "label": "Dificultad para caminar"
    },
    {
      "id": 63,
      "key": "disminucionAudicion",
      "label": "Disminución de la audición"
    },
    {
      "id": 64,
      "key": "calafrios",
      "label": "Calafrios"
    },
    {
      "id": 65,
      "key": "flemas",
      "label": "Flemas"
    },
    {
      "id": 66,
      "key": "dolorPies",
      "label": "Dolor en los pies"
    },
    {
      "id": 67,
      "key": "piernasInquietas",
      "label": "Síndrome de piernas inquietas"
    },
    {
      "id": 68,
      "key": "somnolencia",
      "label": "Somnolencia excesiva"
    },
    {
      "id": 69,
      "key": "picores",
      "label": "Picores (prurito)"
    },
    {
      "id": 70,
      "key": "dolorMenstrual",
      "label": "Dolor menstrual"
    },
    {
      "id": 71,
      "key": "hiperactividad",
      "label": "Hiperactividad"
    },
    {
      "id": 72,
      "key": "hipotension",
      "label": "Hipotensión"
    },
    {
      "id": 73,
      "key": "hipertension",
      "label": "Hipertensión"
    },
    {
      "id": 74,
      "key": "artritis",
      "label": "Artritis"
    },
    {
      "id": 75,
      "key": "sindromeFatigaCronica",
      "label": "Síndrome de fatiga crónica"
    },
    {
      "id": 76,
      "key": "deficienciaVitaminas",
      "label": "Deficiencia de vitaminas"
    },
    {
      "id": 77,
      "key": "fractura",
      "label": "Fractura"
    },
    {
      "id": 78,
      "key": "hiperhidrosis",
      "label": "Hiperhidrosis (sudoración excesiva)"
    },
    {
      "id": 79,
      "key": "inflamacion",
      "label": "Inflamación"
    },
    {
      "id": 80,
      "key": "problemasVisuales",
      "label": "Problemas visuales"
    },
    {
      "id": 81,
      "key": "inflamacionArticulaciones",
      "label": "Inflamación de las articulaciones"
    },
    {
      "id": 82,
      "key": "fatigaMental",
      "label": "Fatiga mental"
    },
    {
      "id": 83,
      "key": "depresion",
      "label": "Depresión"
    },
    {
      "id": 84,
      "key": "irritacionOjos",
      "label": "Irritación ocular"
    },
    {
      "id": 85,
      "key": "mareoEstacionario",
      "label": "Mareo al estar quieto"
    },
    {
      "id": 86,
      "key": "estres",
      "label": "Estrés"
    },
    {
      "id": 87,
      "key": "trombosis",
      "label": "Trombosis"
    },
    {
      "id": 88,
      "key": "hemorragia",
      "label": "Hemorragia"
    },
    {
      "id": 89,
      "key": "cianosis",
      "label": "Cianosis (piel azulada)"
    },
    {
      "id": 90,
      "key": "insuficienciaRenal",
      "label": "Insuficiencia renal"
    },
    {
      "id": 91,
      "key": "anemia",
      "label": "Anemia"
    },
    {
      "id": 92,
      "key": "trastornoAlimenticio",
      "label": "Trastorno alimenticio"
    },
    {
      "id": 93,
      "key": "afonia",
      "label": "Afonía"
    },
    {
      "id": 94,
      "key": "paralisisFacial",
      "label": "Parálisis facial"
    },
    {
      "id": 95,
      "key": "dolorMandíbula",
      "label": "Dolor en la mandíbula"
    },
    {
      "id": 96,
      "key": "reflujoGastrico",
      "label": "Reflujo gástrico"
    },
    {
      "id": 97,
      "key": "taquicardia",
      "label": "Taqúicardia"
    },
    {
      "id": 98,
      "key": "mialgia",
      "label": "Mialgia (dolor muscular)"
    }
  ],
  "users": [
    {
      "id": 1,
      "name": "Juan Carlos"
    }
  ]
  ,"prescription": []
}
```

> [!NOTE]:
> la base de datos se ve de la manera de arriba :arrow_up:

> [!TIP]:
> El archivo **db.json** se va a actualizar de manera automática como si fuese una verdadera base de datos real
## Author
[Ing. Raúl Adolfo Torres Vargas](https://ingrauladolfo-portfolio.vercel.app/)
