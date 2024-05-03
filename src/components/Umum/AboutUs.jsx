function AboutUs() {
  return (
    <div className="flex justify-between bg-[#F1EF99] text-[#C07F00]" id="aboutus"> 
      <div className="text-center">
        <img srcSet="/Pict_1.png" width={700} height={400} />
      </div>
      <div className="flex flex-col justify-center item-center gap-4 p-5 mr-[300px]">
            <h3 className="text-3xl font-bold text-left">
                Tentang Kami
            </h3>
            <p className="w-96 text-lg leading-relaxed">
              Midas adalah platform pinjaman online yang menyediakan layanan cepat dan mudah untuk 
              pengguna yang ingin mengajukan pinjaman. Dengan fitur-fitur seperti pinjaman hingga lebih dari 100 juta untuk nasabah perorangan 
              dan hingga 500 juta untuk badan usaha, simulasi pinjaman yang membantu pengguna memperkirakan pembayaran bulanan mereka, dan kemudahan pembayaran angsuran, 
              Midas memberikan solusi keuangan yang fleksibel dan mudah digunakan bagi semua pengguna.
            </p>
      </div>
    </div>
  )
}

export default AboutUs
