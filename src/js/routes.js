import Beranda from "../pages/beranda.f7";
import Transaksi from "../pages/transaksi.f7";
import Tentang from "../pages/tentang.f7";
import Film from "../pages/film.f7";
import dFilm from "../pages/detail_film.f7";
import Home from "../pages/home.f7";
import Keuangan from "../pages/keuangan.f7";
import KeuanganTambah from "../pages/keuangan_tambah.f7";

var routes = [
  {
    path: "/",
    component: Home,
    tabs: [
      { path: "/", id: "view-beranda", component: Beranda },
      { path: "/transaksi/", id: "view-transaksi", component: Transaksi },
      { path: "/tentang/", id: "view-tentang", component: Tentang },
    ],
  },
  { path: "/datafilm/", component: Film },
  { path: "/detailfilm/", component: dFilm },
  { path: "/uang/", component: Keuangan },
  { path: "/uangt/", component: KeuanganTambah },

];

export default routes;
