import noir from "@/assets/project-noir.jpg";
import mono from "@/assets/project-mono.jpg";
import chrome from "@/assets/project-chrome.jpg";
import form from "@/assets/project-form.jpg";
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
  { nazwa: "Chrom", hex: "#E9E9E9" },
];

function proces(kontekst: string) {
  return [
    {
      krok: "01",
      tytul: "Analiza i strategia",
      opis: `Warsztaty z zespołem marki, audyt konkurencji i zdefiniowanie terytorium wizualnego dla ${kontekst}.`,
    },
    {
      krok: "02",
      tytul: "Kierunek kreatywny",
      opis: "Trzy odrębne ścieżki wizualne, testowane na realnych nośnikach zamiast na slajdach.",
    },
    {
      krok: "03",
      tytul: "System projektowy",
      opis: "Siatka, skala typograficzna, zasady kompozycji i biblioteka form — wszystko zamknięte w księdze znaku.",
    },
    {
      krok: "04",
      tytul: "Wdrożenie",
      opis: "Produkcja materiałów drukowanych, cyfrowych i animowanych oraz nadzór nad realizacją.",
    },
  ];
}

export const projects: Project[] = [
  {
    slug: "noir",
    name: "NOIR",
    category: "Identyfikacja wizualna / Art Direction",
    year: "2026",
    cover: noir,
    span: "tall",
    opis: "Identyfikacja dla domu perfumeryjnego operującego wyłącznie czernią. System zbudowany na kontraście matowego papieru i srebrnego tłoczenia, w którym znak ujawnia się dopiero w ruchu światła.",
    zakres: ["Strategia wizualna", "Znak i system", "Opakowania", "Materiały drukowane", "Art direction sesji"],
    kierunek:
      "Luksus rozumiany jako powściągliwość. Zero koloru, maksimum faktury. Znak zachowuje się jak grawer — pojawia się i znika zależnie od kąta patrzenia.",
    moodboard,
    moodboardOpis:
      "Faktury kamienia, szczotkowanego metalu i folii srebrnej stały się punktem wyjścia dla całej palety materiałowej.",
    typografia: [
      { nazwa: "Grotesk Display", opis: "Nagłówki, tłoczenie, duże formaty. Waga 700, światło międzyliterowe −2%." },
      { nazwa: "Grotesk Text", opis: "Metadane i opisy produktowe. Wersaliki, światło 28%." },
    ],
    kolory: wspolneKolory,
    proces: proces("marki perfumeryjnej"),
    mockupy: [
      { src: noir, alt: "Materiały firmowe NOIR z srebrnym tłoczeniem" },
      { src: voidImg, alt: "Ekspozycja marki NOIR w ciemnej przestrzeni" },
    ],
    finalne:
      "Kompletny system identyfikacji: księga znaku, linia opakowań, materiały POS oraz zestaw szablonów dla zespołu marketingu.",
  },
  {
    slug: "mono",
    name: "MONO",
    category: "Identyfikacja marki / Digital",
    year: "2026",
    cover: mono,
    span: "wide",
    opis: "Marka narzędzi projektowych zredukowana do jednej zasady: jeden krój, jedna siatka, jeden gest. Identyfikacja działa identycznie w druku i w interfejsie.",
    zakres: ["Identyfikacja", "Design system", "Interfejs", "Motion"],
    kierunek:
      "Neutralność jako charakter. Cała ekspresja przeniesiona na skalę i rytm — nie na ozdobniki.",
    moodboard,
    moodboardOpis:
      "Materiały o różnym stopniu matowości, uporządkowane w siatkę — dokładnie tak, jak później zachowuje się interfejs.",
    typografia: [
      { nazwa: "Grotesk Variable", opis: "Jeden krój w pełnym zakresie wag, od 300 do 800." },
      { nazwa: "Mono Data", opis: "Liczby, metadane, stany interfejsu." },
    ],
    kolory: wspolneKolory,
    proces: proces("cyfrowego produktu"),
    mockupy: [
      { src: mono, alt: "Zestaw materiałów firmowych MONO" },
      { src: chrome, alt: "Kluczowa wizualizacja kampanii MONO" },
    ],
    finalne:
      "Design system z 120 komponentami, dokumentacja wdrożeniowa oraz zestaw animacji interfejsu.",
  },
  {
    slug: "chrome-01",
    name: "CHROME 01",
    category: "3D / Kampania",
    year: "2025",
    cover: chrome,
    span: "half",
    opis: "Kampania wizerunkowa oparta na serii obiektów 3D z chromu. Każdy z nich odbija otoczenie marki, dosłownie i metaforycznie.",
    zakres: ["Koncepcja kampanii", "3D", "Motion", "Art direction"],
    kierunek:
      "Materiał jako komunikat. Chrom niczego nie dodaje — pokazuje to, co wokół, w wyostrzonej formie.",
    moodboard,
    moodboardOpis: "Odbicia, refleksy i krawędzie światła jako podstawowy budulec kadrów.",
    typografia: [
      { nazwa: "Grotesk Display", opis: "Wielkoformatowe hasła kampanii." },
      { nazwa: "Grotesk Text", opis: "Warstwa informacyjna w mediach cyfrowych." },
    ],
    kolory: wspolneKolory,
    proces: proces("kampanii wizerunkowej"),
    mockupy: [
      { src: chrome, alt: "Renderowany obiekt chromowy kampanii CHROME 01" },
      { src: voidImg, alt: "Kadr kampanii CHROME 01" },
    ],
    finalne:
      "Sześć kluczowych wizualizacji, pakiet animacji 9:16 i 16:9 oraz biblioteka assetów 3D.",
  },
  {
    slug: "form",
    name: "FORM",
    category: "Editorial / Typografia",
    year: "2025",
    cover: form,
    span: "tall",
    opis: "Autorski projekt wydawniczy poświęcony architekturze negatywnej przestrzeni. Typografia jest jedyną ilustracją w publikacji.",
    zakres: ["Projekt publikacji", "Typografia", "Nadzór nad drukiem"],
    kierunek:
      "Litera traktowana jak bryła. Lakier UV na czerni buduje obraz wyłącznie światłem.",
    moodboard,
    moodboardOpis: "Studium faktur papieru i wykończeń drukarskich w jednym zestawieniu.",
    typografia: [
      { nazwa: "Grotesk Display", opis: "Skala od 12 pt do 640 pt w obrębie jednego rozkładu." },
      { nazwa: "Grotesk Text", opis: "Kolumna tekstowa 9/14 pt, interlinia stała." },
    ],
    kolory: wspolneKolory,
    proces: proces("publikacji autorskiej"),
    mockupy: [
      { src: form, alt: "Rozkład publikacji FORM z tłoczoną typografią" },
      { src: noir, alt: "Materiały drukowane projektu FORM" },
    ],
    finalne: "168-stronicowa publikacja, nakład 500 egzemplarzy, druk offsetowy z lakierem wybiórczym.",
  },
  {
    slug: "void",
    name: "VOID",
    category: "Art Direction / Branding",
    year: "2025",
    cover: voidImg,
    span: "wide",
    opis: "Identyfikacja galerii sztuki współczesnej zbudowana wokół pustki. Marka istnieje głównie jako sposób organizacji przestrzeni, nie jako znak.",
    zakres: ["Art direction", "Branding", "System wystawienniczy", "Materiały drukowane"],
    kierunek:
      "Im mniej marki, tym więcej sztuki. Identyfikacja schodzi o krok w cień i porządkuje kontekst.",
    moodboard,
    moodboardOpis: "Czerń w kilkunastu odcieniach i jedna linia srebra jako całe instrumentarium.",
    typografia: [
      { nazwa: "Grotesk Display", opis: "Tytuły wystaw, format wielkoskalowy." },
      { nazwa: "Grotesk Text", opis: "Podpisy prac i informacje ekspozycyjne." },
    ],
    kolory: wspolneKolory,
    proces: proces("instytucji kultury"),
    mockupy: [
      { src: voidImg, alt: "System wystawienniczy VOID" },
      { src: mono, alt: "Materiały drukowane galerii VOID" },
    ],
    finalne:
      "System identyfikacji galerii, szablony wystawiennicze oraz roczny plan komunikacji wizualnej.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
