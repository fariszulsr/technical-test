# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
# Mini Booking System

Mini Booking System adalah aplikasi web untuk mempermudah proses booking ruangan. Pengguna dapat melihat ketersediaan ruangan, menambahkan booking baru, serta membatalkan booking yang sudah dibuat.

## Deskripsi Singkat
Aplikasi ini bertujuan untuk:
- Booking ruangan.
- Melihat ketersediaan ruangan secara real-time.
- Menghapus booking yang sudah dibuat.

## Stack Teknologi
- **Frontend:** Nuxt 3, Vue 3, Tailwind CSS, DaisyUI  
- **Containerization:** Docker  
- **Environment:** WSL 2 (Windows Subsystem for Linux)

## Fitur Utama
1. **Halaman Room List** – Menampilkan daftar ruangan beserta status ketersediaannya.  
2. **Modal Availability Room** – Menampilkan informasi ketersediaan ruangan secara detail.  
3. **Modal Add Booking** – Form untuk menambahkan booking baru.  
4. **Modal Cancel Booking** – Konfirmasi dan penghapusan booking yang sudah ada.

## Instalasi Project

### 1. Persiapan
Pastikan sudah menginstal:
- Node.js v20+
- npm
- Docker & WSL 2
- Git

### 2. Clone Repository
git clone <URL_REPO_ANDA>
cd mini-booking-system

### 3. Install Dependencies
npm install

### 4. Jalankan Aplikasi (Development)
npm run dev

### 5. Jalankan Menggunakan Docker

Build Docker image

docker build -t mini-booking-system .

Jalankan container

docker run -p 3000:3000 mini-booking-system

Akses aplikasi di: http://localhost:3000

### 6. Stop Container (Jika Diperlukan)
docker ps           # lihat container yang sedang berjalan
docker stop <CONTAINER_ID>

Struktur Folder
/mini-booking-system
│
├─ /components  # Komponen Vue
├─ /pages       # Halaman Nuxt
├─ /assets      # Aset seperti gambar, font
├─ /public      # File publik
├─ /docker      # Dockerfile atau konfigurasi docker
├─ nuxt.config.ts
└─ package.json