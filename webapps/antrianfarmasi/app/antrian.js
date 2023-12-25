
function pengaturan() {
//=========================================================================
    // Menampilkan data rumah sakit
    $(document).ready(function() { 
      $.ajax({
          url: 'app/antrian.php?p=pengaturan',
          type: 'GET',
          dataType: 'json',
          success: function(data) {
              var email= $('#email');
              email.html(data.email);
  
              var namars= $('#namars');
              namars.html(data.nama_instansi);
  
              var text= $('#text');
              text.html(data.text);
          }
          
      });
  });
 
  
}
$(document).ready(function() {
        pengaturan();
});   
//=========================================================================
      // Fungsi pemanggil
      function Suara() {
          $.ajax({
            url: "app/antrian.php?p=panggil",
            type: "GET",
            dataType: "json",
            success: function(data) {
              var nomorAntrian = $("#suara");
              nomorAntrian.empty();
        
              $.each(data, function(index, item) {  
                // Suara notifikasi pemanggilan antrian
                var audio = document.getElementById("myAudio");
                audio.onended = function() {
                  // Callback yang akan dijalankan setelah audio selesai
                  responsiveVoice.speak(
                    "Nomor Antrian Apotek " + item.no_reg +
                    ",Atas nama " + item.nm_pasien.toLowerCase() + "," + item.nm_poli.toLowerCase() +","+item.nm_dokter.toLowerCase() +
                    ", Silahkan ke loket Penyerahan Obat "  ,
                    "Indonesian Female", {
                      pitch: 1,
                      rate: 0.9,
                      volume: 1
                    }
                  );
                };
                // Memainkan suara notifikasi
                audio.play();
  
              });
            },
          });

//=======================================================================
   
//=======================================================================
    // Fungsi display nomor

    $.ajax({
      url: "app/antrian.php?p=nomor",
      type: "GET",
      dataType: "json",
      success: function(data) {
          var nomorAntrian = $("#nomor");
          nomorAntrian.empty(); 
          // Mengosongkan data sebelum menambahkan yang baru
          // Loop melalui data dan menambahkannya ke tampilan
          $.each(data, function(index, item) {
              var antrian = $("<br><center class='h4'>" + item.nm_pasien +  "<br><b class='h3'>( " + item.no_reg + " )</b></center>"); 
              nomorAntrian.append(antrian);

          });
      }, 
  });
//=========================================================================


//=======================================================================
    // Fungsi non racikan
  // Fungsi racikan
  $.ajax({
    url: "app/antrian.php?p=nonracikan",
    type: "GET",
    dataType: "json",
    success: function(data) {
        var NonRacikan = $("#nonracikan");
        NonRacikan.empty(); // Mengosongkan data sebelum menambahkan yang baru

        if (data.length > 0) {
            // Membuat tabel HTML hanya jika ada data yang diterima
            var table = $("<table class='table table-sm'></table>");
            var thead = $("<thead></thead>").appendTo(table);
            var tbody = $("<tbody></tbody>").appendTo(table);

            // Membuat baris judul tabel
            var headerRow = $("<tr></tr>").appendTo(thead);
            headerRow.append("<th>Antrian</th>");
            headerRow.append("<th>Nama Pasien</th>");
            headerRow.append("<th>Jam Peresepan</th>"); 
            headerRow.append("<th>Jam Validasi</th>"); 

            // Loop melalui data dan menambahkannya ke tabel
            $.each(data, function(index, item) {
                var row = $("<tr class=''></tr>");
                row.append("<td>" + item.no_resep + "</td>");
                row.append("<td>" + item.nm_pasien + "</td>");
                row.append("<td>" + item.jam_peresepan + "</td>"); 
                row.append("<td>" + item.jam_validasi + "</td>"); 
                tbody.append(row);
            });

            NonRacikan.append(table);
        } else {
            // Tidak ada data yang diterima, tampilkan pesan atau ambil tindakan lain yang sesuai
            NonRacikan.append("<center>Tidak ada antrian tersedia.</center>");
        }
    },
    error: function() {
        // Menangani kesalahan jika terjadi saat mengambil data
        var NonRacikan = $("#nonracikan");
        NonRacikan.empty();
        NonRacikan.append("<p>Terjadi kesalahan saat mengambil data.</p>");
    }
});

  
//=========================================================================
//=======================================================================
    // Fungsi racikan
    $.ajax({
      url: "app/antrian.php?p=racikan",
      type: "GET",
      dataType: "json",
      success: function(data) {
          var NonRacikan = $("#racikan");
          NonRacikan.empty(); // Mengosongkan data sebelum menambahkan yang baru
  
          if (data.length > 0) {
              // Membuat tabel HTML hanya jika ada data yang diterima
              var table = $("<table class='table table-sm'></table>");
              var thead = $("<thead></thead>").appendTo(table);
              var tbody = $("<tbody></tbody>").appendTo(table);
  
              // Membuat baris judul tabel
              var headerRow = $("<tr></tr>").appendTo(thead);
              headerRow.append("<th>Antrian</th>");
              headerRow.append("<th>Nama Pasien</th>");
              headerRow.append("<th>Jam Peresepan</th>"); 
              headerRow.append("<th>Jam Validasi</th>"); 
  
              // Loop melalui data dan menambahkannya ke tabel
              $.each(data, function(index, item) {
                  var row = $("<tr class=''></tr>");
                  row.append("<td>" + item.no_resep + "</td>");
                  row.append("<td>" + item.nm_pasien + "</td>");
                  row.append("<td>" + item.jam_peresepan + "</td>"); 
                  row.append("<td>" + item.jam_validasi + "</td>"); 
                  tbody.append(row);
              });
  
              NonRacikan.append(table);
          } else {
              // Tidak ada data yang diterima, tampilkan pesan atau ambil tindakan lain yang sesuai
              NonRacikan.append("<center>Tidak ada antrian tersedia.</center>");
          }
      },
      error: function() {
          // Menangani kesalahan jika terjadi saat mengambil data
          var NonRacikan = $("#racikan");
          NonRacikan.empty();
          NonRacikan.append("<p>Terjadi kesalahan saat mengambil data.</p>");
      }
  });
  
  
//=========================================================================



}  
      //refresh otomatis setiap 5 detik
      setInterval(Suara, 500); 
      $(document).ready(function() {
          Suara();
});
    
   //=======================================================================
   

  //==========membuat jam=============
   function updateClock() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();
  
    // Format waktu dengan tambahkan "0" di depan angka jika kurang dari 10
    hours = (hours < 10 ? "0" : "") + hours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;
  
    var timeString = ""+ hours + ":" + minutes + ":" + seconds;
  
    // Update elemen HTML dengan waktu yang telah diformat
    document.getElementById("clock").innerHTML = timeString;
  }
  
  // Panggil fungsi updateClock setiap detik
  setInterval(updateClock, 1000);
   
   
  
  
   