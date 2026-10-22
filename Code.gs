/**
 * Back-end Kwitansi EcoPreneur TechFest 2026 (Google Apps Script)
 * Pasang di: Google Sheets > Extensions > Apps Script.
 * PIN bendahara: Project Settings > Script properties > tambah properti PIN.
 */
const SHEET = 'Pengajuan';
const FOLDER = 'Bukti Transfer TechFest 2026';
const HEAD = ['id', 'dibuat', 'jenis', 'instansi', 'nama', 'wa', 'items', 'total', 'buktiId', 'status', 'alasan', 'noKw', 'tglVerif'];

const CAT = {
 "edu": {
  "l": "Education Partner",
  "base": [
   [
    "Education Partner",
    2500000,
    "Booth 2x2 m, 1 meja 2 kursi; area khusus EP; logo di publikasi EP; publikasi medsos resmi; penyebutan MC; kesempatan bagi brosur; sertifikat EP; 2 perwakilan; akses seluruh rangkaian acara"
   ]
  ],
  "add": [
   [
    "Main Stage + Social Media Promotion",
    750000,
    "Promosi panggung 10-15 menit; 1 feed, 1 reel, 3 stories; logo di LED saat sesi; 1x penyebutan MC; dokumentasi promosi"
   ],
   [
    "Social Media Promotion",
    350000,
    "1 feed, 1 reel, 3 stories"
   ],
   [
    "LED Screen Promotion",
    200000,
    "Materi promosi di LED screen utama, tayang beberapa kali selama acara"
   ],
   [
    "Booth Activation",
    350000,
    "Aktivitas interaktif di area booth (games, kuis, demo teknologi, photo corner, dll); harga mulai dari; harus disetujui panitia"
   ],
   [
    "Additional MC Mention",
    150000,
    "Penyebutan nama institusi oleh MC 3x pada sesi tertentu"
   ]
  ]
 },
 "tenant": {
  "l": "Tenant Partner",
  "one": [
   [
    "Paket Lapangan Opsi 1: bawa tenda & perlengkapan sendiri (booth 3x3 m)",
    500000,
    "Area booth 3x3 m (tenant membawa tenda sendiri); logo di media promosi; akses listrik; promosi di media sosial panitia; penempatan booth di Lapangan Upacara; logo sponsor di pamflet; nama brand di daftar sponsor; sertifikat digital Tenant Partner"
   ],
   [
    "Paket Lapangan Opsi 2: tenda dari panitia (booth 3x3 m)",
    700000,
    "Area booth 3x3 m (tenda disediakan panitia, tanpa perlengkapan lainnya); logo di media promosi; akses listrik; promosi di media sosial panitia; penempatan booth di Lapangan Upacara; logo sponsor di pamflet; nama brand di daftar sponsor; sertifikat digital Tenant Partner"
   ]
  ]
 },
 "sponsor": {
  "l": "Sponsorship",
  "one": [
   [
    "Paket Sponsorship PLATINUM",
    7500000,
    "Booth 2x2 m; X-Banner 2 buah (60x160 cm); logo di backdrop utama & media publikasi: paling utama; logo di ID Card panitia; logo di LED/screen; video promosi 2x tayang (15-30 detik); publikasi media sosial 4-5 postingan; MC mention 5 kali; sponsor kategori lomba/aktivitas tertentu; materi promosi/merchandise di goodie bag"
   ],
   [
    "Paket Sponsorship GOLD",
    5000000,
    "Booth 2x2 m; X-Banner 1 buah; logo di backdrop utama & media publikasi: besar; logo di ID Card panitia; logo di LED/screen; video promosi 1x tayang (15-30 detik); publikasi media sosial 3 postingan; MC mention 3 kali; sponsor kategori lomba/aktivitas tertentu; materi promosi/merchandise di goodie bag"
   ],
   [
    "Paket Sponsorship SILVER",
    2500000,
    "Booth 2x2 m; X-Banner 1 buah; logo di backdrop utama & media publikasi: sedang; logo di LED/screen; publikasi media sosial 2 postingan; MC mention 2 kali"
   ],
   [
    "Paket Sponsorship BRONZE",
    1000000,
    "Logo di backdrop utama & media publikasi: kecil; logo di LED/screen; publikasi media sosial 1 postingan; MC mention 1 kali"
   ]
  ]
 },
 "kerja": {
  "l": "Kerja Sama",
  "grp": [
   [
    "Promosi & Branding Fisik",
    [
     [
      "Booth Partner",
      1500000,
      "Partisipasi booth pada area event; penempatan di area utama; branding pada denah & peta acara; akses langsung ke pengunjung"
     ],
     [
      "X-Banner Partner",
      250000,
      "Penempatan X-Banner di area strategis; logo pada peta acara & publikasi"
     ],
     [
      "Backdrop Utama",
      2000000,
      "Dukungan pembuatan backdrop utama + logo mitra; publikasi media & dokumentasi; MC mention"
     ],
     [
      "Photo Wall Partner",
      1500000,
      "Dukungan pembuatan photo wall + branding mitra; branding di area foto; publikasi media"
     ],
     [
      "Screen / LED Partner",
      300000,
      "Logo mitra ditampilkan di layar utama selama acara berlangsung"
     ]
    ]
   ],
   [
    "Promosi Digital",
    [
     [
      "Instagram Feed Partner",
      250000,
      "Publikasi feed (logo + ucapan terima kasih) di IG @ecopreneur.techfest; mention & tag akun mitra"
     ],
     [
      "Instagram Reels Partner",
      400000,
      "Reels promosi 15-30 detik; mention & tag akun mitra"
     ],
     [
      "Video Promotion Partner",
      500000,
      "Video 15-30 detik diputar saat acara; pemutaran di layar utama selama jeda acara"
     ],
     [
      "Logo pada E-Booklet",
      250000,
      "Logo pada e-booklet kegiatan (PDF); halaman sponsor; distribusi ke peserta & publik"
     ],
     [
      "Website Partner",
      250000,
      "Logo pada website resmi acara; halaman sponsor; tautan ke website mitra"
     ]
    ]
   ],
   [
    "Stage & Program Exposure",
    [
     [
      "MC Mention",
      250000,
      "Penyebutan oleh MC min. 3 kali; nama mitra disebut di panggung saat pembukaan, jeda, penutupan"
     ],
     [
      "Education Promotion",
      750000,
      "Sharing/promosi edukasi 15-20 menit; kesempatan presentasi/promo; audiens siswa & guru"
     ],
     [
      "Dukungan Hadiah & Apresiasi Lomba (mulai dari)",
      500000,
      "Dukungan hadiah lomba (uang/produk/barang); logo pada materi awarding; MC mention & publikasi media"
     ],
     [
      "Dukungan Perlengkapan Lomba (mulai dari)",
      500000,
      "Dukungan alat/material untuk pelaksanaan lomba; logo pada materi lomba; publikasi terima kasih"
     ],
     [
      "Games / Aktivasi Sponsor",
      500000,
      "Aktivasi/games interaktif di area acara; interaksi langsung dengan peserta; branding di area aktivasi"
     ]
    ]
   ],
   [
    "Atribut Peserta & Panitia",
    [
     [
      "ID Card Panitia Partner",
      1000000,
      "Logo pada ID Card panitia selama kegiatan"
     ],
     [
      "Goodie Bag Partner",
      500000,
      "Insert brosur/voucher/merchandise dalam goodie bag; distribusi ke peserta"
     ],
     [
      "Merchandise Partner (mulai dari)",
      500000,
      "Dukungan merchandise (souvenir acara); logo pada merchandise; branding berkelanjutan"
     ],
     [
      "Sertifikat Digital Partner",
      750000,
      "Logo pada sertifikat digital panitia/peserta kegiatan; distribusi online"
     ],
     [
      "Piagam Apresiasi Partner",
      500000,
      "Piagam apresiasi resmi untuk mitra; disampaikan saat acara"
     ],
     [
      "Kaos Panitia Partner (100 kaos x Rp100.000)",
      10000000,
      "Logo mitra tercetak pada kaos panitia (100 panitia); branding selama dan setelah acara"
     ]
    ]
   ]
  ]
 },
 "lain": {
  "l": "Lainnya"
 }
};

function doGet() { return out_({ ok: true, info: 'API Kwitansi TechFest 2026' }); }

function doPost(e) {
  let r;
  try { r = route_(JSON.parse(e.postData.contents)); }
  catch (err) { r = { ok: false, error: String(err.message || err) }; }
  return out_(r);
}

function out_(o) { return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }

function route_(q) {
  switch (q.action) {
    case 'catalog': return { ok: true, cat: CAT };
    case 'submit': return submit_(q);
    case 'status': return status_(q);
    case 'admin_list': pin_(q.pin); return { ok: true, list: rows_().map(function (o) { return o; }) };
    case 'admin_bukti': pin_(q.pin); return { ok: true, img: bukti_(q.id) };
    case 'admin_verify': pin_(q.pin); return verify_(q.id);
    case 'admin_reject': pin_(q.pin); return reject_(q.id, q.alasan);
  }
  throw new Error('Aksi tidak dikenal');
}

function sheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(SHEET);
  if (!s) { s = ss.insertSheet(SHEET); s.appendRow(HEAD); s.setFrozenRows(1); }
  return s;
}

function toObj_(r) {
  const o = {};
  HEAD.forEach(function (h, i) { o[h] = r[i]; });
  try { o.items = JSON.parse(o.items); } catch (e) { o.items = []; }
  o.wa = String(o.wa);
  return o;
}

function rows_() {
  const v = sheet_().getDataRange().getValues();
  return v.slice(1).map(toObj_);
}

function find_(id) {
  const s = sheet_(), v = s.getDataRange().getValues();
  for (let i = 1; i < v.length; i++) if (String(v[i][0]) === String(id)) return { s: s, row: i + 1, o: toObj_(v[i]) };
  throw new Error('Data tidak ditemukan');
}

function pin_(pin) {
  const cache = CacheService.getScriptCache();
  const fails = Number(cache.get('fails') || 0);
  if (fails >= 5) throw new Error('Terlalu banyak percobaan salah. Coba lagi 10 menit lagi.');
  const real = PropertiesService.getScriptProperties().getProperty('PIN');
  if (!real) throw new Error('PIN belum diatur di Script properties.');
  if (String(pin) !== String(real)) { cache.put('fails', String(fails + 1), 600); throw new Error('PIN salah'); }
  cache.remove('fails');
}

function allowed_(key) {
  const c = CAT[key], m = {};
  if (key === 'edu') c.base.concat(c.add).forEach(function (x) { m[x[0]] = [x[1], x[2] || '']; });
  else if (key === 'tenant' || key === 'sponsor') c.one.forEach(function (x) { m[x[0]] = [x[1], x[2] || '']; });
  else if (key === 'kerja') c.grp.forEach(function (g) { g[1].forEach(function (x) { m[g[0] + ': ' + x[0]] = [x[1], x[2] || '']; }); });
  return m;
}

function submit_(q) {
  const key = q.jenis;
  if (!CAT[key]) throw new Error('Jenis tidak valid');
  const instansi = String(q.instansi || '').trim().slice(0, 150), nama = String(q.nama || '').trim().slice(0, 100);
  const wa = String(q.wa || '').replace(/\D/g, '');
  if (!instansi || !nama || wa.length < 9 || wa.length > 15) throw new Error('Data pembayar belum lengkap');
  let items = [];
  if (key === 'lain') {
    const p = Math.round(Number((q.items && q.items[0] || {}).p));
    const n = String((q.items && q.items[0] || {}).n || '').trim().slice(0, 200);
    if (!n || !(p > 0 && p <= 1e9)) throw new Error('Keperluan/nominal tidak valid');
    items = [{ n: n, p: p }];
  } else {
    const m = allowed_(key), seen = {};
    (q.items || []).forEach(function (x) {
      if (!(x.n in m) || seen[x.n]) throw new Error('Item tidak valid');
      seen[x.n] = 1; items.push({ n: x.n, p: m[x.n][0], d: m[x.n][1] });
    });
    if (!items.length) throw new Error('Pilih minimal satu item');
    if ((key === 'tenant' || key === 'sponsor') && items.length !== 1) throw new Error('Pilih satu paket saja');
    if (key === 'edu' && !seen[CAT.edu.base[0][0]]) throw new Error('Paket dasar wajib');
  }
  const total = items.reduce(function (s, x) { return s + x.p; }, 0);
  const m2 = /^data:image\/(jpeg|png);base64,(.+)$/.exec(String(q.bukti || ''));
  if (!m2 || m2[2].length > 3000000) throw new Error('Bukti transfer tidak valid (maks ±2 MB)');
  const id = 'P' + Utilities.getUuid().replace(/-/g, '').slice(0, 8).toUpperCase();
  const f = folder_().createFile(Utilities.newBlob(Utilities.base64Decode(m2[2]), 'image/' + m2[1], id + '.' + (m2[1] === 'png' ? 'png' : 'jpg')));
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try { sheet_().appendRow([id, Date.now(), CAT[key].l, instansi, nama, "'" + wa, JSON.stringify(items), total, f.getId(), 'menunggu', '', '', '']); }
  finally { lock.releaseLock(); }
  return { ok: true, id: id, total: total };
}

function folder_() {
  const it = DriveApp.getFoldersByName(FOLDER);
  return it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER);
}

function status_(q) {
  const o = find_(String(q.id || '').trim().toUpperCase()).o;
  return { ok: true, d: { id: o.id, dibuat: o.dibuat, jenis: o.jenis, instansi: o.instansi, nama: o.nama, items: o.items, total: o.total, status: o.status, alasan: o.alasan, noKw: o.noKw, tglVerif: o.tglVerif } };
}

function bukti_(id) {
  const b = DriveApp.getFileById(find_(id).o.buktiId).getBlob();
  return 'data:' + b.getContentType() + ';base64,' + Utilities.base64Encode(b.getBytes());
}

function verify_(id) {
  const lock = LockService.getScriptLock(); lock.waitLock(20000);
  try {
    const r = find_(id);
    if (r.o.status !== 'menunggu') throw new Error('Pengajuan sudah diproses');
    const n = rows_().filter(function (o) { return o.noKw; }).length + 1;
    const no = 'KW/ETF26/' + ('000' + n).slice(-3), t = Date.now();
    r.s.getRange(r.row, HEAD.indexOf('status') + 1).setValue('terverifikasi');
    r.s.getRange(r.row, HEAD.indexOf('noKw') + 1).setValue(no);
    r.s.getRange(r.row, HEAD.indexOf('tglVerif') + 1).setValue(t);
    r.o.status = 'terverifikasi'; r.o.noKw = no; r.o.tglVerif = t;
    return { ok: true, d: r.o };
  } finally { lock.releaseLock(); }
}

function reject_(id, alasan) {
  const r = find_(id);
  if (r.o.status !== 'menunggu') throw new Error('Pengajuan sudah diproses');
  r.s.getRange(r.row, HEAD.indexOf('status') + 1).setValue('ditolak');
  r.s.getRange(r.row, HEAD.indexOf('alasan') + 1).setValue(String(alasan || '').slice(0, 200));
  r.o.status = 'ditolak'; r.o.alasan = String(alasan || '').slice(0, 200);
  return { ok: true, d: r.o };
}
