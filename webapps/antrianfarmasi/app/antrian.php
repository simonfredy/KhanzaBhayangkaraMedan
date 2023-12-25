<?php
require_once('../conf/conf.php');
date_default_timezone_set('Asia/Jakarta');

 
if(isset($_GET['p'])) {	 

//kode poli yang ingin ditampilkan
$poli="'ANA','GIG','IGDk','INT'";
//jam reset antrian
$jamreset='23:00:00';
$tanggal= mktime(date("m"),date("d"),date("Y"));

function sensorNama($nama) {
  // Pisahkan nama menjadi array kata
  $kata = explode(" ", $nama);

  // Inisialisasi string hasil sensor
  $namaDisensor = "";
  // Loop melalui setiap kata dalam nama
  foreach ($kata as $k) {
      $panjangKata = strlen($k);      
      // Jika panjang kata kurang dari 3, tampilkan seluruh kata tanpa perubahan
      if ($panjangKata < 3) {
          $namaDisensor .= $k . " ";
      } else {
          // Ambil huruf pertama
          $hurufPertama = substr($k, 0, 3);
          
          // Ambil huruf terakhir
          $hurufTerakhir = substr($k, -1);          
          // Buat string sensor yang mengandung huruf pertama, karakter '*' di tengah, dan huruf terakhir
          $sensor = $hurufPertama . str_repeat('*', $panjangKata - 3) . $hurufTerakhir;

          // Tambahkan kata yang telah disensor ke string hasil
          $namaDisensor .= $sensor . " ";
      }
  }

  // Hapus spasi ekstra di akhir
  $namaDisensor = rtrim($namaDisensor);
  return $namaDisensor;
}
  
switch($_GET['p']){	

   
   case 'pengaturan':
   $_sql ="select nama_instansi,email from setting";
   $hasil=bukaquery($_sql);
   $data = array();
   while ($r = mysqli_fetch_array ($hasil)){
      $r['text'] ="Selamat datang di RSU Holistic Indonesai || Tubuh Anda Adalah Dokter Yang Terbaik";
      $data = $r;
   }  
   echo json_encode($data);
   break;


   
   case 'panggil' :
    $_sql="select RIGHT(antriapotek3.no_resep,4) as no_reg,
    antriapotek3.status,antriapotek3.no_rawat,pasien.nm_pasien,
    poliklinik.nm_poli,dokter.nm_dokter 
    from antriapotek3 inner join pasien inner join reg_periksa inner join poliklinik inner join dokter on 
    antriapotek3.no_rawat=reg_periksa.no_rawat and reg_periksa.no_rkm_medis=pasien.no_rkm_medis and 
    reg_periksa.kd_poli=poliklinik.kd_poli and reg_periksa.kd_dokter=dokter.kd_dokter where 
    antriapotek3.status = '1' LIMIT 1";

      $hasil=bukaquery($_sql);
      $data = array();
      while ($r = mysqli_fetch_array ($hasil)){
        
      //tambahkan lagi yang ingin di replace    
      $awalnama = array("TN ", "BY ", "NY ","AN ","NN ","SDR ","N Y ");
      $replacenama = array("Tuan ", "Bayi ", "Nyonya ","Anak ","Nona ","Saudara ","Nyonya ");

      $awalpoli= array("IGD","THT");
      $replacepoli= array("I G D","T H T");

      $awaldokter= array("dr.","drg ");
      $replacedokter= array("dokter","dokter gigi ");

      
      $r['nm_poli']=str_replace($awalpoli,$replacepoli,$r['nm_poli']);      
      $r['nm_pasien']=str_replace($awalnama,$replacenama,$r['nm_pasien']);
      $r['nm_dokter']=str_replace($awaldokter,$replacedokter,$r['nm_dokter']);       
      $data[] = $r;
       
      bukaquery2("UPDATE antriapotek3 SET status = '3' WHERE status='2'");
      bukaquery2("UPDATE antriapotek3 SET status = '2' WHERE no_rawat = '$r[no_rawat]'");
      } 
      echo json_encode($data);

break;	
     
     
case 'nonracikan' :    
 $_sql="select resep_obat.no_resep,resep_obat.no_rawat,pasien.nm_pasien,resep_obat.jam_peresepan,
 if(resep_obat.jam='00:00:00','',resep_obat.jam) as jam_validasi,
 if(resep_obat.jam_penyerahan='00:00:00','',resep_obat.jam_penyerahan) as jam_penyerahan,dokter.nm_dokter
 from resep_obat inner join reg_periksa on resep_obat.no_rawat=reg_periksa.no_rawat 
 inner join pasien on reg_periksa.no_rkm_medis=pasien.no_rkm_medis 
 inner join dokter on resep_obat.kd_dokter=dokter.kd_dokter
 where resep_obat.no_resep not in(select distinct resep_dokter_racikan.no_resep from resep_dokter_racikan) 
 and resep_obat.jam_penyerahan='00:00:00'  
 and resep_obat.jam_peresepan<>'00:00:00' and resep_obat.status='ralan' 
 and resep_obat.tgl_peresepan='".date("Y-m-d", $tanggal)."' order by resep_obat.jam_peresepan asc";  
 $hasil=bukaquery($_sql);
 $data = array();
 
if(mysqli_num_rows($hasil)>0) {
  while ($row = mysqli_fetch_array($hasil)) {
    
      $row['no_resep']=substr($row['no_resep'], -4);
      $row['nm_pasien']=sensorNama($row['nm_pasien']);
      $data[] = $row;
  }
}
echo json_encode($data); 
break;	
     
case 'racikan' :    
 $_sql="select resep_obat.no_resep,resep_obat.no_rawat,pasien.nm_pasien,resep_obat.jam_peresepan,
 if(resep_obat.jam='00:00:00','',resep_obat.jam) as jam_validasi,
 if(resep_obat.jam_penyerahan='00:00:00','',resep_obat.jam_penyerahan) as jam_penyerahan,dokter.nm_dokter
 from resep_obat inner join reg_periksa on resep_obat.no_rawat=reg_periksa.no_rawat 
 inner join pasien on reg_periksa.no_rkm_medis=pasien.no_rkm_medis 
 inner join dokter on resep_obat.kd_dokter=dokter.kd_dokter
 where resep_obat.no_resep in(select distinct resep_dokter_racikan.no_resep from resep_dokter_racikan) 
 and resep_obat.jam_peresepan<>'00:00:00' and resep_obat.status='ralan' 
 and resep_obat.tgl_peresepan='".date("Y-m-d", $tanggal)."' order by resep_obat.jam_peresepan desc";  
 $hasil=bukaquery($_sql);
 $data = array();
 
if(mysqli_num_rows($hasil)>0) {
  while ($row = mysqli_fetch_array($hasil)) {
    
      $row['no_resep']=substr($row['no_resep'], -4);
      $row['nm_pasien']=sensorNama($row['nm_pasien']);
      $data[] = $row;
  }
}  
 echo json_encode($data); 
break;	
     

case 'nomor' :
  $_sql="select RIGHT(antriapotek3.no_resep,4) as no_reg,
  antriapotek3.status,antriapotek3.no_rawat,pasien.nm_pasien,
  poliklinik.nm_poli,dokter.nm_dokter from antriapotek3 inner join pasien 
  inner join reg_periksa inner join poliklinik inner join dokter on antriapotek3.no_rawat=reg_periksa.no_rawat and 
  reg_periksa.no_rkm_medis=pasien.no_rkm_medis and reg_periksa.kd_poli=poliklinik.kd_poli and reg_periksa.kd_dokter=dokter.kd_dokter 
  where  antriapotek3.status > '0' AND antriapotek3.status < '3' LIMIT 1 ";
  
   $hasil=bukaquery($_sql);
   $data = array();
   
  if(mysqli_num_rows($hasil)>0) {
    while ($row = mysqli_fetch_array($hasil)) {
      
      $row['nm_pasien']=sensorNama($row['nm_pasien']);
      $data[] = $row;
    }
  } else {
   $row['kd_poli']='';
   $row['no_reg']='0000';
   $row['nm_pasien']='-';
   $row['nm_dokter']='-';
   $row['nm_poli']='-';
   $data[] = $row;
  
  }
   echo json_encode($data); 
  break;	
  
  
   
}
}
?>