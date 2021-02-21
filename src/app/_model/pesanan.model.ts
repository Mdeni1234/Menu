
export class Pesanan {
    namaGerai?: string;
    tag?: number;
    waktu?: any;
    pesanan?: [{
        namaPesanan?: string,
        hargaPesanan?: string,
        jumlahPesanan?: number,
    }];
    penjualan?: [{
        namaPesanan?: string,
        terjual?: number,
    }]
    user?: string;
    hasilPenjualan?: number;
    jumlahPenjualan?: number;
    jumlah?: number;
    status?: boolean;

}
