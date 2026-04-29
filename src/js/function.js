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



// Tambahkan fungsi ini karena dipanggil di beranda.f7
export function waktu_sekarang() {
  const sekarang = new Date();
  const hari = HARI_INDONESIA[sekarang.getDay()];
  const tanggal = sekarang.getDate().toString().padStart(2, "0");
  const bulan = BULAN_INDONESIA[sekarang.getMonth()];
  const tahun = sekarang.getFullYear();

  const jam = sekarang.getHours().toString().padStart(2, "0");
  const menit = sekarang.getMinutes().toString().padStart(2, "0");
  const detik = sekarang.getSeconds().toString().padStart(2, "0");

  // Mengembalikan format HTML langsung
  return `${hari}, ${tanggal} ${bulan} ${tahun}<br />${jam}:${menit}:${detik}`;
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
  TTS.speak(data, function () {
    console.log("Text to Speech Berhasil");
  }, function (reason) {
    append.dialog.alert(reason, "error");
  })
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
      append.dialog.alert("LED Tidak Ada", "error");
    }
  })
}


export function konfigurasidb() {
  if (window.indexedDB) {
    let request = window.indexedDB.open("dbkeuangan", 1,);

    request.onupgradeneeded = function (e) {
      db = e.target.result;
      if (!db.objectStoreNames.contains("transaksi")) {
        let tbl = db.createObjectStore("transaksi", { keyPath: 'id' });
        tbl.createIndex("tgl_jam", "tgl_jam", { unique: false });
        tbl.createIndex("nominal", "nominal", { unique: false });
        tbl.createIndex("jenis", "jenis", { unique: false });
        tbl.createIndex("uraian", "uraian", { unique: false });
      }
    };

    request.onerror = event => {
      app.dialog.alert(`Database error: ${event.target.errorCode}`, "Error");
    };

    request.onsuccess = event => {
      db = event.target.result;
    };
  }
}


export function terjemah_tgl_jam(x){
    let z = x.split(" ");
    let tglfull = z[0].split("-");
    let tgl = tglfull[2];
    let buln = tglfull[1];
    let tahun = tglfull[0];
    let jam = z[1];
    return `${tgl} ${BULAN_INDONESIA[parseInt(buln)]} ${tahun} ${jam}`;
}



export function format_ribuan(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}