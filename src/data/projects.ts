import noir from "@/assets/reklamacja47.jpg";
import mono from "@/assets/niema-faf.jpg";
import chrome from "@/assets/phamu-skille2.jpg";
import form from "@/assets/fefe.jpg";
import voidImg from "@/assets/project-void.jpg";
import moodboard from "@/assets/detail-moodboard.jpg";


export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  cover: string;
  span: "tall" | "wide" | "half";
  opis: string;
  zakres: string[];
  kierunek: string;
  moodboard: string;
  moodboardOpis: string;
  typografia: { nazwa: string; opis: string }[];
  kolory: { nazwa: string; hex: string }[];
  proces: { krok: string; tytul: string; opis: string }[];
  mockupy: { src: string; alt: string }[];
  finalne: string;
};

const wspolneKolory = [
  { nazwa: "Czerń absolutna", hex: "#050505" },
  { nazwa: "Grafit", hex: "#1C1C1C" },
  { nazwa: "Srebro", hex: "#B8B8B8" },
  { nazwa: "Sygnał", hex: "#FF3B1F" },
];

function proces(kontekst: string) {
  return [
    {
      krok: "01",
      tytul: "Odsłuch i brief",
      opis: `Kilkukrotny odsłuch materiału, rozmowa z artystą i wypisanie obrazów, które niesie ${kontekst}.`,
    },
    {
      krok: "02",
      tytul: "Kierunek wizualny",
      opis: "Trzy różne koncepcje okładki, każda testowana w miniaturze 300 × 300 px — tak, jak zobaczy ją słuchacz.",
    },
    {
      krok: "03",
      tytul: "Produkcja grafiki",
      opis: "Fotografia, kolaż lub render 3D, retusz, typografia tytułu i pełny skład wersji finalnej.",
    },
    {
      krok: "04",
      tytul: "Pakiet wydawniczy",
      opis: "Cover 3000 × 3000 px, canvas Spotify, kadry na single, story 9:16 i przygotowanie do druku winyla.",
    },
  ];
}

export const projects: Project[] = [
  {
    slug: "noir",
    name: 'OKI "REKLAMACJA\'47"',
    category: "Re-creation",
    year: "2026",
    cover: noir,
    span: "tall",
    opis: 'Re-kreacja okładki albumu OKI\'ego pt. "Reklamacja47".',
    zakres: ["Okładka albumu", "Typografia tytułu", "Canvas Spotify", "Projekt winyla"],
    kierunek:
      "Ciemność bez ozdobników. Cały ładunek niesie faktura i jedno pasmo światła — dokładnie tak, jak brzmi materiał.",
    moodboard,
    moodboardOpis:
      "Kamień, matowy metal i prześwietlone klisze — punkt wyjścia dla faktury całej okładki.",
    typografia: [
      { nazwa: "Grotesk Display", opis: "Tytuł albumu, wersaliki, światło międzyliterowe −2%." },
      { nazwa: "Grotesk Text", opis: "Tracklista i credits na tylnej okładce." },
    ],
    kolory: wspolneKolory,
    proces: proces("album"),
    mockupy: [
      { src: noir, alt: "Okładka albumu NOIR na winylu" },
      { src: voidImg, alt: "Wkładka i tylna okładka albumu NOIR" },
    ],
    finalne:
      "Okładka w wersji cyfrowej i winylowej, canvas, zestaw kadrów na single oraz szablony postów.",
  },
  {
    slug: "mono",
    name: 'FAF "NIE MA"',
    category: "Cover Art",
    year: "2026",
    cover: mono,
    span: "wide",
    opis: 'Okładka wykonana dla wykonawcy FAF do utworu pt. "NIE MA".',
    zakres: ["Okładka EP", "Grafiki singli", "Materiały na social media"],
    kierunek:
      "Powtórzenie jako kompozycja. Jeden element, cztery warianty — po jednym na każdy utwór.",
    moodboard,
    moodboardOpis:
      "Siatka, powtarzalne moduły i różne stopnie matowości papieru jako baza dla serii singli.",
    typografia: [
      { nazwa: "Grotesk Variable", opis: "Jeden krój od 300 do 800 — tytuł, numer utworu, katalog." },
      { nazwa: "Mono Data", opis: "Numeracja utworów i metadane wydania." },
    ],
    kolory: wspolneKolory,
    proces: proces("EP"),
    mockupy: [
      { src: mono, alt: "Okładka EP MONO w wersji cyfrowej" },
      { src: chrome, alt: "Warianty okładek singli z EP MONO" },
    ],
    finalne: "Okładka EP, cztery warianty singlowe, canvas oraz pakiet formatów 1:1 i 9:16.",
  },
  {
    slug: "chrome-01",
    name: 'PHAMU "SKILLE 2"',
    category: "Cover Art",
    year: "2026",
    cover: chrome,
    span: "half",
    opis: 'Okładka wykonana dla wykonawcy Phamu do utworu "SKILLE 2".',
    zakres: ["Okładka singla", "3D", "Animowany canvas"],
    kierunek: "Materiał zamiast ilustracji. Chrom niczego nie dopowiada, tylko odbija to, co wokół.",
    moodboard,
    moodboardOpis: "Odbicia, refleksy i twarde krawędzie światła jako budulec kadru.",
    typografia: [
      { nazwa: "Grotesk Display", opis: "Tytuł singla, jedna linia, maksymalna skala." },
      { nazwa: "Grotesk Text", opis: "Nazwa artysty i numer katalogowy." },
    ],
    kolory: wspolneKolory,
    proces: proces("singiel"),
    mockupy: [
      { src: chrome, alt: "Okładka singla CHROME 01 z obiektem 3D" },
      { src: voidImg, alt: "Kadr promocyjny singla CHROME 01" },
    ],
    finalne: "Okładka 3000 × 3000 px, animowany canvas oraz pakiet kadrów promocyjnych.",
  },
  {
    slug: "form",
    name: 'KABE "FEFE"',
    category: "Re-creation",
    year: "2026",
    cover: form,
    span: "tall",
    opis: 'Re-kreacja okładki utworu "FEFE" wykonawcy KABE.',
    zakres: ["Okładka albumu", "Typografia", "Nadzór nad drukiem winyla"],
    kierunek: "Litera traktowana jak bryła. Zero fotografii, zero tekstury poza samym drukiem.",
    moodboard,
    moodboardOpis: "Studium papierów i wykończeń drukarskich pod kopertę winylową.",
    typografia: [
      { nazwa: "Grotesk Display", opis: "Tytuł w skali 640 pt na kopercie 12 cali." },
      { nazwa: "Grotesk Text", opis: "Tracklista 9/14 pt, interlinia stała." },
    ],
    kolory: wspolneKolory,
    proces: proces("album"),
    mockupy: [
      { src: form, alt: "Koperta winylowa FORM z tłoczoną typografią" },
      { src: noir, alt: "Wkładka albumu FORM" },
    ],
    finalne: "Koperta winylowa z lakierem wybiórczym, wkładka oraz wersja cyfrowa okładki.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
