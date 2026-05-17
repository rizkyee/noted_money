let db;

const HARI_INDONESIA = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];

const BULAN_INDONESIA = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
];

export function waktu_sekarang() {
  const sekarang = new Date();

  const hari = HARI_INDONESIA[sekarang.getDay()];
  const tanggal = sekarang.getDate().toString().padStart(2, "0");
  const bulan = BULAN_INDONESIA[sekarang.getMonth()];
  const tahun = sekarang.getFullYear();

  const jam = sekarang.getHours().toString().padStart(2, "0");
  const menit = sekarang.getMinutes().toString().padStart(2, "0");
  const detik = sekarang.getSeconds().toString().padStart(2, "0");

  return `${hari}, ${tanggal} ${bulan} ${tahun}<br />${jam}:${menit}:${detik}`;
}

export function konfigurasidb() {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
      return;
    }

    if (!window.indexedDB) {
      reject("Browser tidak mendukung IndexedDB");
      return;
    }

    let request = window.indexedDB.open("dbkeuangan", 1);

    request.onupgradeneeded = function (e) {
      db = e.target.result;

      if (!db.objectStoreNames.contains("transaksi")) {
        let tbl = db.createObjectStore("transaksi", { keyPath: "id" });

        tbl.createIndex("tgl_jam", "tgl_jam", { unique: false });
        tbl.createIndex("nominal", "nominal", { unique: false });
        tbl.createIndex("jenis", "jenis", { unique: false });
        tbl.createIndex("uraian", "uraian", { unique: false });
      }
    };

    request.onerror = function (event) {
      console.error(`Database error: ${event.target.errorCode}`);
      reject(event.target.errorCode);
    };

    request.onsuccess = function (event) {
      db = event.target.result;
      console.log("Database IndexedDB berhasil dibuka");
      resolve(db);
    };
  });
}

export async function getDataFull(tabel) {
  if (!db) {
    await konfigurasidb();
  }

  return new Promise((resolve, reject) => {
    try {
      let proses = db
        .transaction([tabel], "readonly")
        .objectStore(tabel)
        .getAll();

      proses.onsuccess = function (e) {
        let allData = e.target.result;

        if (Array.isArray(allData)) {
          resolve(allData);
        } else {
          typeof allData === "object" && allData !== null
            ? resolve([allData])
            : resolve([]);
        }
      };

      proses.onerror = function (e) {
        console.error(`Gagal: Data ${tabel}, ${e.target.errorCode}`);
        reject([]);
      };

    } catch (error) {
      console.error("getDataFull error:", error);
      reject([]);
    }
  });
}

export function terjemah_tgl_jam(x) {
  let z = x.split(" ");
  let tglfull = z[0].split("-");

  let tgl = tglfull[2];
  let bulan = parseInt(tglfull[1]) - 1;
  let tahun = tglfull[0];
  let jam = z[1];

  return `${tgl} ${BULAN_INDONESIA[bulan]} ${tahun} ${jam}`;
}

export function format_ribuan(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function tampil_film() {
  let hasil = "";
  let x;

  for (x of datafilm) {
    let judul = x.judul;
    let pemain = x.pemain;
    let tahun = x.tahun;
    let rating = x.rating;
    let sinopsis = x.sinopsis;
    let sampul = x.cover;

    hasil += `<div class="card" style="background-color: transparent;">
      <div class="card-content">
        <img src="${sampul}" data-judul="${judul}" data-pemain="${pemain}" data-tahun="${tahun}"
        data-rating="${rating}" data-sinopsis="${sinopsis}" data-sampul="${sampul}" class="besar-icon100
        ke_detail" style="border-radius: 15px;">
      </div>
    </div>`;
  }

  return hasil;
}

export function ubah_suara(data) {
  TTS.speak(
    data,
    function () {
      console.log("Text to Speech Berhasil");
    },
    function (reason) {
      console.error(reason);
    }
  );
}

export function senter() {
  window.plugins.flashlight.available(function (isAvailable) {
    if (isAvailable) {
      if (window.plugins.flashlight.isSwitchedOn()) {
        window.plugins.flashlight.switchOff();
      } else {
        window.plugins.flashlight.switchOn();
      }
    } else {
      console.error("LED Tidak Ada");
    }
  });
}