# Antrian-Poli
Antrian Poli Klinik
Sudah menggunakan text to speech menggunakan librari dari responsivevoice.js
data yang ditampilkan sudah sesuai jam praktek dokter
jalankan Query SQL berikut untuk update enum agar suara tidak looping

ALTER TABLE `antripoli` CHANGE `status` `status` ENUM('0','1','2','3') CHARACTER SET latin1 COLLATE latin1_swedish_ci NULL DEFAULT NULL;
