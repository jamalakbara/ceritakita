-- CeritaKita Seed Data
-- Run AFTER schema.sql in Supabase SQL Editor
-- NOTE: Create admin user via Supabase Dashboard > Auth > Users > Add User
--   Email: admin@ceritakita.id | Password: admin123

-- Temporarily disable RLS for seeding
alter table public.books disable row level security;
alter table public.slides disable row level security;
alter table public.sound_triggers disable row level security;
alter table public.mini_games disable row level security;
alter table public.game_options disable row level security;

-- Book 1
insert into public.books (id, title, description, cover_url, read_time_minutes, category, status)
values ('00000000-0000-0000-0000-000000000001', 'Si Gajah Kecil yang Berani',
  'Cerita tentang seekor gajah kecil yang belajar menjadi berani. Ikuti petualangannya menemukan teman-teman baru di hutan!',
  'https://placehold.co/640x400/FF6B6B/FFFFFF?text=Gajah+Kecil&font=comic-neue', 5, '4-5 tahun', 'published');

insert into public.slides (id, book_id, "order", image_url) values
  ('10000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1, 'https://placehold.co/1920x1080/FFE0E0/FF6B6B?text=Slide+1&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 2, 'https://placehold.co/1920x1080/E0FFF8/4ECDC4?text=Slide+2&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 3, 'https://placehold.co/1920x1080/FFFDE0/FFE66D?text=Slide+3&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 4, 'https://placehold.co/1920x1080/F0E0FF/A78BFA?text=Slide+4&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 5, 'https://placehold.co/1920x1080/E0F0FF/60A5FA?text=Slide+5&font=comic-neue');

insert into public.sound_triggers (slide_id, x, y, audio_url, label) values
  ('10000000-0000-0000-0000-000000000001', 30, 40, '/sounds/elephant.mp3', 'Suara gajah'),
  ('10000000-0000-0000-0000-000000000001', 70, 60, '/sounds/bird.mp3', 'Suara burung'),
  ('10000000-0000-0000-0000-000000000002', 50, 50, '/sounds/river.mp3', 'Suara sungai'),
  ('10000000-0000-0000-0000-000000000004', 40, 35, '/sounds/monkey.mp3', 'Suara monyet');

insert into public.mini_games (id, book_id, question) values
  ('20000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 'Mana yang termasuk sayuran?');
insert into public.game_options (game_id, image_url, label, is_correct, sort_order) values
  ('20000000-0000-0000-0000-000000000001', 'https://placehold.co/300x300/FF6B6B/FFFFFF?text=Brokoli&font=comic-neue', 'Brokoli', true, 1),
  ('20000000-0000-0000-0000-000000000001', 'https://placehold.co/300x300/60A5FA/FFFFFF?text=Mobil&font=comic-neue', 'Mobil', false, 2),
  ('20000000-0000-0000-0000-000000000001', 'https://placehold.co/300x300/FFE66D/2D1B69?text=Buku&font=comic-neue', 'Buku', false, 3),
  ('20000000-0000-0000-0000-000000000001', 'https://placehold.co/300x300/4ECDC4/FFFFFF?text=Jeruk&font=comic-neue', 'Jeruk', false, 4);

-- Book 2
insert into public.books (id, title, description, cover_url, read_time_minutes, category, status)
values ('00000000-0000-0000-0000-000000000002', 'Kucing Nakal dan Benang Ajaib',
  'Si kucing nakal menemukan benang ajaib yang bisa membawanya ke dunia fantasi. Apa yang akan terjadi?',
  'https://placehold.co/640x400/4ECDC4/FFFFFF?text=Kucing+Nakal&font=comic-neue', 4, '4-5 tahun', 'published');

insert into public.slides (id, book_id, "order", image_url) values
  ('10000000-0000-0000-0000-000000000006', '00000000-0000-0000-0000-000000000002', 1, 'https://placehold.co/1920x1080/E0FFF8/4ECDC4?text=Slide+1&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000007', '00000000-0000-0000-0000-000000000002', 2, 'https://placehold.co/1920x1080/FFFDE0/FFE66D?text=Slide+2&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000008', '00000000-0000-0000-0000-000000000002', 3, 'https://placehold.co/1920x1080/F0E0FF/A78BFA?text=Slide+3&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000009', '00000000-0000-0000-0000-000000000002', 4, 'https://placehold.co/1920x1080/FFE0E0/FF6B6B?text=Slide+4&font=comic-neue');

insert into public.sound_triggers (slide_id, x, y, audio_url, label) values
  ('10000000-0000-0000-0000-000000000006', 45, 55, '/sounds/cat.mp3', 'Suara kucing'),
  ('10000000-0000-0000-0000-000000000008', 60, 40, '/sounds/magic.mp3', 'Suara ajaib');

insert into public.mini_games (id, book_id, question) values
  ('20000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000002', 'Hewan apa yang suka bermain benang?');
insert into public.game_options (game_id, image_url, label, is_correct, sort_order) values
  ('20000000-0000-0000-0000-000000000002', 'https://placehold.co/300x300/FF6B6B/FFFFFF?text=Kucing&font=comic-neue', 'Kucing', true, 1),
  ('20000000-0000-0000-0000-000000000002', 'https://placehold.co/300x300/60A5FA/FFFFFF?text=Gajah&font=comic-neue', 'Gajah', false, 2),
  ('20000000-0000-0000-0000-000000000002', 'https://placehold.co/300x300/FFE66D/2D1B69?text=Ikan&font=comic-neue', 'Ikan', false, 3),
  ('20000000-0000-0000-0000-000000000002', 'https://placehold.co/300x300/4ECDC4/FFFFFF?text=Burung&font=comic-neue', 'Burung', false, 4);

-- Book 3
insert into public.books (id, title, description, cover_url, read_time_minutes, category, status)
values ('00000000-0000-0000-0000-000000000003', 'Kelinci Pintar di Sekolah',
  'Kelinci pintar pergi ke sekolah untuk pertama kalinya! Ikuti keseruannya bertemu teman baru dan belajar hal-hal menyenangkan.',
  'https://placehold.co/640x400/FFE66D/2D1B69?text=Kelinci+Pintar&font=comic-neue', 6, '5-6 tahun', 'published');

insert into public.slides (id, book_id, "order", image_url) values
  ('10000000-0000-0000-0000-000000000010', '00000000-0000-0000-0000-000000000003', 1, 'https://placehold.co/1920x1080/FFFDE0/FFE66D?text=Slide+1&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000011', '00000000-0000-0000-0000-000000000003', 2, 'https://placehold.co/1920x1080/F0E0FF/A78BFA?text=Slide+2&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000012', '00000000-0000-0000-0000-000000000003', 3, 'https://placehold.co/1920x1080/E0F0FF/60A5FA?text=Slide+3&font=comic-neue');

insert into public.sound_triggers (slide_id, x, y, audio_url, label) values
  ('10000000-0000-0000-0000-000000000010', 35, 45, '/sounds/rabbit.mp3', 'Suara kelinci'),
  ('10000000-0000-0000-0000-000000000012', 55, 35, '/sounds/bell.mp3', 'Suara bel sekolah');

insert into public.mini_games (id, book_id, question) values
  ('20000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000003', 'Di mana kelinci pintar belajar?');
insert into public.game_options (game_id, image_url, label, is_correct, sort_order) values
  ('20000000-0000-0000-0000-000000000003', 'https://placehold.co/300x300/FF6B6B/FFFFFF?text=Pasar&font=comic-neue', 'Pasar', false, 1),
  ('20000000-0000-0000-0000-000000000003', 'https://placehold.co/300x300/4ECDC4/FFFFFF?text=Sekolah&font=comic-neue', 'Sekolah', true, 2),
  ('20000000-0000-0000-0000-000000000003', 'https://placehold.co/300x300/FFE66D/2D1B69?text=Taman&font=comic-neue', 'Taman', false, 3),
  ('20000000-0000-0000-0000-000000000003', 'https://placehold.co/300x300/A78BFA/FFFFFF?text=Rumah&font=comic-neue', 'Rumah', false, 4);

-- Book 4
insert into public.books (id, title, description, cover_url, read_time_minutes, category, status)
values ('00000000-0000-0000-0000-000000000004', 'Burung yang Suka Bernyanyi',
  'Ada seekor burung kecil yang sangat suka bernyanyi. Suaranya indah sekali! Tapi, kenapa teman-temannya tidak mau mendengar?',
  'https://placehold.co/640x400/A78BFA/FFFFFF?text=Burung+Bernyanyi&font=comic-neue', 5, '4-5 tahun', 'published');

insert into public.slides (id, book_id, "order", image_url) values
  ('10000000-0000-0000-0000-000000000013', '00000000-0000-0000-0000-000000000004', 1, 'https://placehold.co/1920x1080/E0F0FF/60A5FA?text=Slide+1&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000014', '00000000-0000-0000-0000-000000000004', 2, 'https://placehold.co/1920x1080/FFE0E0/FF6B6B?text=Slide+2&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000015', '00000000-0000-0000-0000-000000000004', 3, 'https://placehold.co/1920x1080/E0FFF8/4ECDC4?text=Slide+3&font=comic-neue');

insert into public.sound_triggers (slide_id, x, y, audio_url, label) values
  ('10000000-0000-0000-0000-000000000013', 50, 30, '/sounds/bird-sing.mp3', 'Burung bernyanyi'),
  ('10000000-0000-0000-0000-000000000015', 65, 50, '/sounds/applause.mp3', 'Tepuk tangan');

insert into public.mini_games (id, book_id, question) values
  ('20000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000004', 'Apa yang paling suka dilakukan burung kecil?');
insert into public.game_options (game_id, image_url, label, is_correct, sort_order) values
  ('20000000-0000-0000-0000-000000000004', 'https://placehold.co/300x300/FF6B6B/FFFFFF?text=Tidur&font=comic-neue', 'Tidur', false, 1),
  ('20000000-0000-0000-0000-000000000004', 'https://placehold.co/300x300/60A5FA/FFFFFF?text=Makan&font=comic-neue', 'Makan', false, 2),
  ('20000000-0000-0000-0000-000000000004', 'https://placehold.co/300x300/4ECDC4/FFFFFF?text=Bernyanyi&font=comic-neue', 'Bernyanyi', true, 3),
  ('20000000-0000-0000-0000-000000000004', 'https://placehold.co/300x300/FFE66D/2D1B69?text=Berenang&font=comic-neue', 'Berenang', false, 4);

-- Book 5
insert into public.books (id, title, description, cover_url, read_time_minutes, category, status)
values ('00000000-0000-0000-0000-000000000005', 'Ikan Kecil Berenang Jauh',
  'Ikan kecil ingin melihat dunia di luar kolam. Perjalanan yang penuh warna dan kejutan menantinya!',
  'https://placehold.co/640x400/60A5FA/FFFFFF?text=Ikan+Berenang&font=comic-neue', 7, '5-6 tahun', 'published');

insert into public.slides (id, book_id, "order", image_url) values
  ('10000000-0000-0000-0000-000000000016', '00000000-0000-0000-0000-000000000005', 1, 'https://placehold.co/1920x1080/F0E0FF/A78BFA?text=Slide+1&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000017', '00000000-0000-0000-0000-000000000005', 2, 'https://placehold.co/1920x1080/E0F0FF/60A5FA?text=Slide+2&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000018', '00000000-0000-0000-0000-000000000005', 3, 'https://placehold.co/1920x1080/FFE0E0/FF6B6B?text=Slide+3&font=comic-neue'),
  ('10000000-0000-0000-0000-000000000019', '00000000-0000-0000-0000-000000000005', 4, 'https://placehold.co/1920x1080/E0FFF8/4ECDC4?text=Slide+4&font=comic-neue');

insert into public.sound_triggers (slide_id, x, y, audio_url, label) values
  ('10000000-0000-0000-0000-000000000016', 40, 60, '/sounds/water.mp3', 'Suara air'),
  ('10000000-0000-0000-0000-000000000018', 55, 45, '/sounds/dolphin.mp3', 'Suara lumba-lumba');

insert into public.mini_games (id, book_id, question) values
  ('20000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000005', 'Di mana ikan kecil tinggal?');
insert into public.game_options (game_id, image_url, label, is_correct, sort_order) values
  ('20000000-0000-0000-0000-000000000005', 'https://placehold.co/300x300/FF6B6B/FFFFFF?text=Gunung&font=comic-neue', 'Gunung', false, 1),
  ('20000000-0000-0000-0000-000000000005', 'https://placehold.co/300x300/60A5FA/FFFFFF?text=Kolam&font=comic-neue', 'Kolam', true, 2),
  ('20000000-0000-0000-0000-000000000005', 'https://placehold.co/300x300/FFE66D/2D1B69?text=Hutan&font=comic-neue', 'Hutan', false, 3),
  ('20000000-0000-0000-0000-000000000005', 'https://placehold.co/300x300/4ECDC4/FFFFFF?text=Kota&font=comic-neue', 'Kota', false, 4);

-- Re-enable RLS
alter table public.books enable row level security;
alter table public.slides enable row level security;
alter table public.sound_triggers enable row level security;
alter table public.mini_games enable row level security;
alter table public.game_options enable row level security;
