
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
  
// //==================pengaturan video ===============
const videoPlayer = document.getElementById('myVideo');
// ganti path video , bisa juga menggunakan url video
const videos = ['video/vid-1.mp4', 'video/vid-2.mp4', 'video/vid-3.mp4', 'video/vid-4.mp4', 'video/vid-5.mp4', 'video/vid-6.mp4', 'video/vid-7.mp4', 'video/vid-8.mp4', 'video/vid-9.mp4']; 
        // Ganti dengan daftar video yang Anda inginkan
        let currentVideoIndex = 0;
        // Fungsi untuk mengatur video pertama sebagai sumber awal
        function setInitialVideo() {
            videoPlayer.src = videos[currentVideoIndex];
        }
    
        // Event listener saat video selesai diputar
        videoPlayer.addEventListener('ended', () => {
            currentVideoIndex = (currentVideoIndex + 1) % videos.length;
            videoPlayer.src = videos[currentVideoIndex];
            videoPlayer.play();
        });
        // // Mengatur volume ke 20%
        videoPlayer.volume = 0.1;
        // // Mengatur Mute Video
        videoPlayer.muted = false;
        videoPlayer.poster = 'video/poster.jpg';
    
        // Panggil fungsi untuk mengatur video pertama saat halaman dimuat
        setInitialVideo();


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
                    "Atas nama " + item.nm_pasien.toLowerCase() +
                    ", Silahkan menuju " + item.nm_poli.toLowerCase(),
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


             
 //========================================================================
      //==display poli== 
 
        $.ajax({
          url: "app/antrian.php?p=poli",
          type: "GET",
          dataType: "json",
          success: function(data) {
              var swiperWrapper = $("#datapoli");
              swiperWrapper.empty();
  
              // Loop melalui data dan tambahkan slide
              $.each(data, function(index, item) {
                  var varpoli = $("<div class='col-lg-3 text-center '>"+
                                  "<div class='card pt-2 border border-success'>"+
                                  "<h5>" + item.nm_poli + "</h5><b>" + item.nm_dokter + "</b><br><p class='pasien'>");
                                 
                                 $.each(item.data_pasien, function(index, pasien) {
                      var antrian_pasien = $("<h2>" + pasien.kd_poli + pasien.no_reg + "</h2>"+
                      "<h5>" + pasien.nm_pasien + "</h5>");
                      varpoli.find('.pasien').append(antrian_pasien);
                  });  
                  varpoli.append("</p></div></div>");  
                  swiperWrapper.append(varpoli);
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
                  var antrian = $("<h2 >" + item.nm_pasien + "</h2><br>"+
                      "<h1 class='display-3'>" + item.kd_poli + item.no_reg + "</h1><br>"+
                      "<b class='h3'>" + item.nm_poli + "</b><br><b class='h4'>" + item.nm_dokter + "</b>"); 
                  nomorAntrian.append(antrian);

              });
          }, 
      });
//=========================================================================



}  
      //refresh otomatis setiap 5 detik
      setInterval(Suara, 750); 
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
   
   
  
  
   