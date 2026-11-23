# Portfolio Ghaza

Portfolio satu halaman berbahasa Indonesia untuk memperkenalkan Nur Ghazali Santoso (Ghaza),
Junior Data Analyst. Proyek menggunakan HTML, CSS,
Vanilla JavaScript ES Modules, dan Vite.

## Teknologi

- HTML5, CSS3 (Grid, Flexbox, custom properties)
- Vanilla JavaScript ES Modules
- Vite
- Browser APIs: Intersection Observer, `dialog`, dan `matchMedia`

## Struktur direktori

```text
public/             Foto profil, CV, dan aset statis
src/css/            Token, global style, komponen, responsif, animasi
src/data/           Profil, proyek, pengalaman, sertifikat, toolkit
src/js/             Navigasi, proyek, sertifikat, animasi, bootstrap
index.html          Markup halaman utama
vite.config.js      Konfigurasi Vite
```

## Persyaratan dan menjalankan

Gunakan Node.js versi yang didukung oleh Vite 6 dan npm.

```bash
npm install
npm run dev
```

Vite akan menampilkan URL development server di terminal.

## Production build

```bash
npm run build
npm run preview
```

Hasil build tersedia di `dist/`.

## Mengganti profil dan kontak

Edit `src/data/profile.js`:

- Foto profil: tempatkan gambar di `public/images/profile/`, lalu perbarui `photo.src`,
  `photo.alt`, dan `photo.objectPosition`. Hero menggunakan satu path konfigurasi untuk sumber
  gambar, teks alternatif, dan posisi crop wajah.
- Email: isi `email` dengan alamat aktif yang disetujui untuk dipublikasikan.
- LinkedIn: isi `href` dengan URL profil yang benar.
- WhatsApp: tambahkan hanya setelah pemilik menyetujui publikasinya.
- CV: letakkan CV asli di `public/documents/cv-ghaza.pdf`; tautan unduhan memakai
  `/documents/cv-ghaza.pdf`.

## Mengelola konten

- **Proyek:** ubah/tambah objek pada `src/data/projects.js`. Satu proyek menggunakan `id` unik,
  kategori, ringkasan, tools, isi studi kasus, dan tautan yang tersedia. Galeri bersifat opsional;
  tambahkan dokumentasi asli melalui `gallery` jika tersedia.
- **Pengalaman:** ubah `experienceGroups` pada `src/data/experiences.js` berdasarkan CV atau
  dokumen resmi. Setiap kelompok memisahkan pengalaman kerja, magang, serta pelatihan.
- **Sertifikat:** ubah `src/data/certificates.js` menggunakan nama, penerbit, dan tahun yang
  terkonfirmasi. Simpan thumbnail/dokumen asli di `public/images/certificates/` dan isi path
  `image` atau `document` pada data sertifikat. Thumbnail dapat dibuka melalui lightbox.
- **Toolkit:** perbarui `src/data/tools.js` hanya dengan alat yang benar-benar pernah dipelajari
  atau digunakan.
- **Dokumentasi proyek:** simpan gambar asli di `public/images/projects/` dan cantumkan pada
  properti `gallery` proyek yang sesuai.

Gunakan nama file deskriptif dan teks alternatif yang menjelaskan konten gambar. Jangan
mengunggah data pelanggan, dokumen internal, atau data sensitif.

## Deployment

`vite.config.js` memakai `base: './'` agar aset hasil build memakai path relatif. Jalankan build,
lalu publikasikan isi `dist/` melalui GitHub Pages, Netlify, atau Vercel. Uji ulang asset path dan
anchor/link setelah deployment.
