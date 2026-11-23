export const projectCategories = [
  "Semua",
  "Data Cleaning",
  "Data Analysis",
  "Business Intelligence",
];

export const projects = [
  {
    id: "online-retail-2011",
    title: "Data Cleaning & Sales Dashboard — Online Retail 2011",
    kind: "Final Project",
    categories: ["Data Cleaning", "Data Analysis", "Business Intelligence"],
    summary:
      "Pembersihan data Online Retail 2011 dengan Python dan Google Colab, dilanjutkan dengan dashboard penjualan di Looker Studio.",
    tools: ["Python", "Google Colab", "Google Looker Studio"],
    thumbnail: "./images/projects/Online-Retail.png",
    thumbnailAlt:
      "Contoh thumbnail proyek, ganti dengan gambar dashboard asli.",
    overview:
      "Final project pembersihan data transaksi Online Retail 2011 dan penyusunan dashboard penjualan interaktif.",
    background: "Data transaksi awal Online Retail 2011 memuat 499.429 baris.",
    problem:
      "Menyiapkan data transaksi untuk analisis dan dashboard penjualan.",
    objectives: [
      "Membersihkan data transaksi Online Retail 2011.",
      "Menyajikan hasil analisis dalam dashboard penjualan.",
    ],
    dataset:
      "Dataset transaksi Online Retail 2011, sebanyak 499.429 baris pada data awal.",
    preparation: ["Menghapus 4.740 baris duplikat dari data transaksi."],
    process:
      "Pembersihan data dilakukan menggunakan Python di Google Colab, kemudian hasilnya disajikan dalam dashboard Looker Studio.",
    insights: [
      "Dashboard menyajikan hasil analisis penjualan Online Retail 2011.",
    ],
    recommendations: [],
    gallery: [],
    links: [
      {
        label: "Buka dashboard Looker Studio",
        href: "https://datastudio.google.com/reporting/fceb84e3-47d7-4875-84bc-7c0ec6d2acef",
      },
    ],
  },
  {
    id: "toko-makmur-jaya",
    title: "Data Cleaning & Dashboard — Toko Makmur Jaya",
    kind: "Mini Project 2",
    categories: ["Data Cleaning", "Data Analysis", "Business Intelligence"],
    summary:
      "Pembersihan 2.000 baris transaksi menggunakan PostgreSQL dan dashboard dengan ringkasan menurut bulan serta kategori.",
    tools: ["PostgreSQL", "pgAdmin 4", "Google Looker Studio"],
    thumbnail: "./images/projects/Toko-Makmur.png",
    thumbnailAlt:
      "Contoh thumbnail proyek, ganti dengan gambar dashboard asli.",
    overview:
      "Mini project pembersihan data transaksi dan pembuatan dashboard untuk Toko Makmur Jaya.",
    background: "Proyek menggunakan 2.000 baris data transaksi.",
    problem:
      "Membersihkan data transaksi dan menyajikan ringkasan untuk analisis.",
    objectives: [
      "Membersihkan data transaksi menggunakan PostgreSQL.",
      "Menyajikan ringkasan data pada dashboard.",
    ],
    dataset: "Data transaksi Toko Makmur Jaya sebanyak 2.000 baris.",
    preparation: ["Membersihkan 2.000 baris data transaksi."],
    process:
      "Data transaksi dibersihkan menggunakan PostgreSQL dan pgAdmin 4, kemudian disajikan dalam dashboard Google Looker Studio.",
    insights: [
      "Dashboard menyajikan ringkasan analisis menurut bulan dan kategori.",
    ],
    recommendations: [],
    gallery: [],
    links: [
      {
        label: "Buka dashboard Looker Studio",
        href: "https://datastudio.google.com/reporting/bd06afb4-4df4-45bf-89b0-055c2b162794",
      },
    ],
  },
  {
    id: "superstore-sales",
    title: "Dashboard Analisis Penjualan Superstore",
    kind: "Mini Project 1",
    categories: ["Data Analysis", "Business Intelligence"],
    summary:
      "Visualisasi KPI dan tren penjualan berdasarkan periode, kategori, subkategori, dan wilayah menggunakan Tableau.",
    tools: ["Tableau"],
    thumbnail: "./images/projects/thumbnail-project-example.svg",
    thumbnailAlt:
      "Contoh thumbnail proyek, ganti dengan gambar dashboard asli.",
    overview:
      "Mini project dashboard analisis penjualan Superstore menggunakan Tableau.",
    background:
      "Proyek menyajikan KPI dan tren penjualan pada dashboard Tableau.",
    problem:
      "Menyusun visualisasi yang memungkinkan penjualan ditinjau menurut periode, kategori, subkategori, dan wilayah.",
    objectives: [
      "Membuat visualisasi KPI dan tren penjualan.",
      "Menyajikan beberapa dimensi analisis dalam dashboard.",
    ],
    dataset: "Dataset Superstore.",
    preparation: [],
    process:
      "Analisis dan visualisasi penjualan berdasarkan periode, kategori, subkategori, dan wilayah menggunakan Tableau.",
    insights: [
      "Dashboard memuat KPI dan tren penjualan dengan pemilahan menurut periode, kategori, subkategori, dan wilayah.",
    ],
    recommendations: [],
    gallery: [],
    links: [
      {
        label: "Buka dashboard Tableau",
        href: "https://public.tableau.com/app/profile/nur.ghazali.santoso/viz/TableuWeek2day1/Dashboard1",
      },
    ],
  },
];
