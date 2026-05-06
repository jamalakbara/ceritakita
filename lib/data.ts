import { Book } from "./types";

// Placeholder image URLs using gradient-based placeholder images
const PLACEHOLDER_COVERS = [
  "https://placehold.co/640x400/FF6B6B/FFFFFF?text=Gajah+Kecil&font=comic-neue",
  "https://placehold.co/640x400/4ECDC4/FFFFFF?text=Kucing+Nakal&font=comic-neue",
  "https://placehold.co/640x400/FFE66D/2D1B69?text=Kelinci+Pintar&font=comic-neue",
  "https://placehold.co/640x400/A78BFA/FFFFFF?text=Burung+Bernyanyi&font=comic-neue",
  "https://placehold.co/640x400/60A5FA/FFFFFF?text=Ikan+Berenang&font=comic-neue",
];

const PLACEHOLDER_SLIDES = [
  "https://placehold.co/1920x1080/FFE0E0/FF6B6B?text=Slide+1&font=comic-neue",
  "https://placehold.co/1920x1080/E0FFF8/4ECDC4?text=Slide+2&font=comic-neue",
  "https://placehold.co/1920x1080/FFFDE0/FFE66D?text=Slide+3&font=comic-neue",
  "https://placehold.co/1920x1080/F0E0FF/A78BFA?text=Slide+4&font=comic-neue",
  "https://placehold.co/1920x1080/E0F0FF/60A5FA?text=Slide+5&font=comic-neue",
];

const GAME_OPTION_IMAGES = [
  "https://placehold.co/300x300/FF6B6B/FFFFFF?text=Brokoli&font=comic-neue",
  "https://placehold.co/300x300/60A5FA/FFFFFF?text=Mobil&font=comic-neue",
  "https://placehold.co/300x300/FFE66D/2D1B69?text=Buku&font=comic-neue",
  "https://placehold.co/300x300/4ECDC4/FFFFFF?text=Jeruk&font=comic-neue",
];

export const MOCK_BOOKS: Book[] = [
  {
    id: "1",
    title: "Si Gajah Kecil yang Berani",
    description:
      "Cerita tentang seekor gajah kecil yang belajar menjadi berani. Ikuti petualangannya menemukan teman-teman baru di hutan!",
    coverUrl: PLACEHOLDER_COVERS[0],
    readTimeMinutes: 5,
    category: "4-5 tahun",
    status: "published",
    slides: [
      {
        id: "s1-1",
        order: 1,
        imageUrl: PLACEHOLDER_SLIDES[0],
        soundTriggers: [
          {
            id: "st1",
            x: 30,
            y: 40,
            audioUrl: "/sounds/elephant.mp3",
            label: "Suara gajah",
          },
          {
            id: "st2",
            x: 70,
            y: 60,
            audioUrl: "/sounds/bird.mp3",
            label: "Suara burung",
          },
        ],
      },
      {
        id: "s1-2",
        order: 2,
        imageUrl: PLACEHOLDER_SLIDES[1],
        soundTriggers: [
          {
            id: "st3",
            x: 50,
            y: 50,
            audioUrl: "/sounds/river.mp3",
            label: "Suara sungai",
          },
        ],
      },
      {
        id: "s1-3",
        order: 3,
        imageUrl: PLACEHOLDER_SLIDES[2],
        soundTriggers: [],
      },
      {
        id: "s1-4",
        order: 4,
        imageUrl: PLACEHOLDER_SLIDES[3],
        soundTriggers: [
          {
            id: "st4",
            x: 40,
            y: 35,
            audioUrl: "/sounds/monkey.mp3",
            label: "Suara monyet",
          },
        ],
      },
      {
        id: "s1-5",
        order: 5,
        imageUrl: PLACEHOLDER_SLIDES[4],
        soundTriggers: [],
      },
    ],
    game: {
      question: "Mana yang termasuk sayuran?",
      options: [
        {
          id: "go1",
          imageUrl: GAME_OPTION_IMAGES[0],
          label: "Brokoli",
          isCorrect: true,
        },
        {
          id: "go2",
          imageUrl: GAME_OPTION_IMAGES[1],
          label: "Mobil",
          isCorrect: false,
        },
        {
          id: "go3",
          imageUrl: GAME_OPTION_IMAGES[2],
          label: "Buku",
          isCorrect: false,
        },
        {
          id: "go4",
          imageUrl: GAME_OPTION_IMAGES[3],
          label: "Jeruk",
          isCorrect: false,
        },
      ],
    },
    createdAt: "2026-05-01T00:00:00Z",
    updatedAt: "2026-05-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Kucing Nakal dan Benang Ajaib",
    description:
      "Si kucing nakal menemukan benang ajaib yang bisa membawanya ke dunia fantasi. Apa yang akan terjadi?",
    coverUrl: PLACEHOLDER_COVERS[1],
    readTimeMinutes: 4,
    category: "4-5 tahun",
    status: "published",
    slides: [
      {
        id: "s2-1",
        order: 1,
        imageUrl: PLACEHOLDER_SLIDES[1],
        soundTriggers: [
          {
            id: "st5",
            x: 45,
            y: 55,
            audioUrl: "/sounds/cat.mp3",
            label: "Suara kucing",
          },
        ],
      },
      {
        id: "s2-2",
        order: 2,
        imageUrl: PLACEHOLDER_SLIDES[2],
        soundTriggers: [],
      },
      {
        id: "s2-3",
        order: 3,
        imageUrl: PLACEHOLDER_SLIDES[3],
        soundTriggers: [
          {
            id: "st6",
            x: 60,
            y: 40,
            audioUrl: "/sounds/magic.mp3",
            label: "Suara ajaib",
          },
        ],
      },
      {
        id: "s2-4",
        order: 4,
        imageUrl: PLACEHOLDER_SLIDES[0],
        soundTriggers: [],
      },
    ],
    game: {
      question: "Hewan apa yang suka bermain benang?",
      options: [
        {
          id: "go5",
          imageUrl: "https://placehold.co/300x300/FF6B6B/FFFFFF?text=Kucing&font=comic-neue",
          label: "Kucing",
          isCorrect: true,
        },
        {
          id: "go6",
          imageUrl: "https://placehold.co/300x300/60A5FA/FFFFFF?text=Gajah&font=comic-neue",
          label: "Gajah",
          isCorrect: false,
        },
        {
          id: "go7",
          imageUrl: "https://placehold.co/300x300/FFE66D/2D1B69?text=Ikan&font=comic-neue",
          label: "Ikan",
          isCorrect: false,
        },
        {
          id: "go8",
          imageUrl: "https://placehold.co/300x300/4ECDC4/FFFFFF?text=Burung&font=comic-neue",
          label: "Burung",
          isCorrect: false,
        },
      ],
    },
    createdAt: "2026-05-02T00:00:00Z",
    updatedAt: "2026-05-02T00:00:00Z",
  },
  {
    id: "3",
    title: "Kelinci Pintar di Sekolah",
    description:
      "Kelinci pintar pergi ke sekolah untuk pertama kalinya! Ikuti keseruannya bertemu teman baru dan belajar hal-hal menyenangkan.",
    coverUrl: PLACEHOLDER_COVERS[2],
    readTimeMinutes: 6,
    category: "5-6 tahun",
    status: "published",
    slides: [
      {
        id: "s3-1",
        order: 1,
        imageUrl: PLACEHOLDER_SLIDES[2],
        soundTriggers: [
          {
            id: "st7",
            x: 35,
            y: 45,
            audioUrl: "/sounds/rabbit.mp3",
            label: "Suara kelinci",
          },
        ],
      },
      {
        id: "s3-2",
        order: 2,
        imageUrl: PLACEHOLDER_SLIDES[3],
        soundTriggers: [],
      },
      {
        id: "s3-3",
        order: 3,
        imageUrl: PLACEHOLDER_SLIDES[4],
        soundTriggers: [
          {
            id: "st8",
            x: 55,
            y: 35,
            audioUrl: "/sounds/bell.mp3",
            label: "Suara bel sekolah",
          },
        ],
      },
    ],
    game: {
      question: "Di mana kelinci pintar belajar?",
      options: [
        {
          id: "go9",
          imageUrl: "https://placehold.co/300x300/FF6B6B/FFFFFF?text=Pasar&font=comic-neue",
          label: "Pasar",
          isCorrect: false,
        },
        {
          id: "go10",
          imageUrl: "https://placehold.co/300x300/4ECDC4/FFFFFF?text=Sekolah&font=comic-neue",
          label: "Sekolah",
          isCorrect: true,
        },
        {
          id: "go11",
          imageUrl: "https://placehold.co/300x300/FFE66D/2D1B69?text=Taman&font=comic-neue",
          label: "Taman",
          isCorrect: false,
        },
        {
          id: "go12",
          imageUrl: "https://placehold.co/300x300/A78BFA/FFFFFF?text=Rumah&font=comic-neue",
          label: "Rumah",
          isCorrect: false,
        },
      ],
    },
    createdAt: "2026-05-03T00:00:00Z",
    updatedAt: "2026-05-03T00:00:00Z",
  },
  {
    id: "4",
    title: "Burung yang Suka Bernyanyi",
    description:
      "Ada seekor burung kecil yang sangat suka bernyanyi. Suaranya indah sekali! Tapi, kenapa teman-temannya tidak mau mendengar?",
    coverUrl: PLACEHOLDER_COVERS[3],
    readTimeMinutes: 5,
    category: "4-5 tahun",
    status: "published",
    slides: [
      {
        id: "s4-1",
        order: 1,
        imageUrl: PLACEHOLDER_SLIDES[4],
        soundTriggers: [
          {
            id: "st9",
            x: 50,
            y: 30,
            audioUrl: "/sounds/bird-sing.mp3",
            label: "Burung bernyanyi",
          },
        ],
      },
      {
        id: "s4-2",
        order: 2,
        imageUrl: PLACEHOLDER_SLIDES[0],
        soundTriggers: [],
      },
      {
        id: "s4-3",
        order: 3,
        imageUrl: PLACEHOLDER_SLIDES[1],
        soundTriggers: [
          {
            id: "st10",
            x: 65,
            y: 50,
            audioUrl: "/sounds/applause.mp3",
            label: "Tepuk tangan",
          },
        ],
      },
    ],
    game: {
      question: "Apa yang paling suka dilakukan burung kecil?",
      options: [
        {
          id: "go13",
          imageUrl: "https://placehold.co/300x300/FF6B6B/FFFFFF?text=Tidur&font=comic-neue",
          label: "Tidur",
          isCorrect: false,
        },
        {
          id: "go14",
          imageUrl: "https://placehold.co/300x300/60A5FA/FFFFFF?text=Makan&font=comic-neue",
          label: "Makan",
          isCorrect: false,
        },
        {
          id: "go15",
          imageUrl: "https://placehold.co/300x300/4ECDC4/FFFFFF?text=Bernyanyi&font=comic-neue",
          label: "Bernyanyi",
          isCorrect: true,
        },
        {
          id: "go16",
          imageUrl: "https://placehold.co/300x300/FFE66D/2D1B69?text=Berenang&font=comic-neue",
          label: "Berenang",
          isCorrect: false,
        },
      ],
    },
    createdAt: "2026-05-03T00:00:00Z",
    updatedAt: "2026-05-03T00:00:00Z",
  },
  {
    id: "5",
    title: "Ikan Kecil Berenang Jauh",
    description:
      "Ikan kecil ingin melihat dunia di luar kolam. Perjalanan yang penuh warna dan kejutan menantinya!",
    coverUrl: PLACEHOLDER_COVERS[4],
    readTimeMinutes: 7,
    category: "5-6 tahun",
    status: "published",
    slides: [
      {
        id: "s5-1",
        order: 1,
        imageUrl: PLACEHOLDER_SLIDES[3],
        soundTriggers: [
          {
            id: "st11",
            x: 40,
            y: 60,
            audioUrl: "/sounds/water.mp3",
            label: "Suara air",
          },
        ],
      },
      {
        id: "s5-2",
        order: 2,
        imageUrl: PLACEHOLDER_SLIDES[4],
        soundTriggers: [],
      },
      {
        id: "s5-3",
        order: 3,
        imageUrl: PLACEHOLDER_SLIDES[0],
        soundTriggers: [
          {
            id: "st12",
            x: 55,
            y: 45,
            audioUrl: "/sounds/dolphin.mp3",
            label: "Suara lumba-lumba",
          },
        ],
      },
      {
        id: "s5-4",
        order: 4,
        imageUrl: PLACEHOLDER_SLIDES[1],
        soundTriggers: [],
      },
    ],
    game: {
      question: "Di mana ikan kecil tinggal?",
      options: [
        {
          id: "go17",
          imageUrl: "https://placehold.co/300x300/FF6B6B/FFFFFF?text=Gunung&font=comic-neue",
          label: "Gunung",
          isCorrect: false,
        },
        {
          id: "go18",
          imageUrl: "https://placehold.co/300x300/60A5FA/FFFFFF?text=Kolam&font=comic-neue",
          label: "Kolam",
          isCorrect: true,
        },
        {
          id: "go19",
          imageUrl: "https://placehold.co/300x300/FFE66D/2D1B69?text=Hutan&font=comic-neue",
          label: "Hutan",
          isCorrect: false,
        },
        {
          id: "go20",
          imageUrl: "https://placehold.co/300x300/4ECDC4/FFFFFF?text=Kota&font=comic-neue",
          label: "Kota",
          isCorrect: false,
        },
      ],
    },
    createdAt: "2026-05-04T00:00:00Z",
    updatedAt: "2026-05-04T00:00:00Z",
  },
];

export function getPublishedBooks(): Book[] {
  return MOCK_BOOKS.filter((book) => book.status === "published");
}

export function getBookById(id: string): Book | undefined {
  return MOCK_BOOKS.find((book) => book.id === id);
}

export function getRecommendedBooks(excludeId: string, limit = 3): Book[] {
  return getPublishedBooks()
    .filter((book) => book.id !== excludeId)
    .slice(0, limit);
}
