# AntrianFarmasi

Antrian Penyerahan Obat / Farmasi
Sudah menggunakan text to speech menggunakan librari dari responsivevoice.js
jalankan Query SQL berikut untuk update enum agar suara tidak looping

ALTER TABLE `antriapotek3` CHANGE `status` `status` ENUM('0','1','2','3') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;
