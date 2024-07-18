import React, { useEffect, useState } from 'react'
import styles from './boxoderan.module.css'

const Fakturhariini = () => {
    const [showAll, setShowAll] = useState(false);
    const [visibleItems, setVisibleItems] = useState(5); 
    const [DataFaktur, setDataFaktur] = useState([]);
    const [DataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        const cachedData = localStorage.getItem('DataFaktur');
            if (cachedData) {
                setDataFaktur(JSON.parse(cachedData));
            } else {
                // Handle case where there is no data in localStorage
                console.error('No data found in localStorage');
            }
        }, []);
        useEffect(() => {
            const currentDate = new Date().toISOString().slice(0, 10);
            let tanggal = new Date(); // Mendapatkan tanggal saat ini
            tanggal.setDate(tanggal.getDate() - 1);
            tanggal = tanggal.toISOString().slice(0, 10);
            const dataForToday = DataFaktur.filter(item => {
                const itemDateParts = item.tgl.split('/');
                const itemISODate = `${itemDateParts[2]}-${itemDateParts[1]}-${itemDateParts[0]}`;
                return itemISODate === currentDate;
            });
            setDataFilter(dataForToday);
        }, [DataFaktur]);
        
        
        
    return (
        <div>
            <h2>Data Faktur Hari ini</h2>
            <div className={`table-responsive`}>
                <table className={`table table-bordered`}>
                    <thead>
                    <tr>
                        <th scope="col">No.</th>
                        <th scope="col" className={`${styles.smallrow}`}>Tgl</th>
                        <th scope="col" className={`${styles.mediumrow}`}>Nama Pemesan</th>
                        <th scope="col" className={`${styles.mediumrow}`}>No. Telepon</th>
                        <th scope="col" className={`${styles.largerow}`}>Nama Penumpang</th>
                        <th scope="col" className={`${styles.smallrow}`}>No. Faktur</th>
                        <th scope="col" className={`${styles.mediumrow}`}>Jumlah yang Harus Dibayar</th>
                        <th scope="col" className={`${styles.smallrow}`}>Kota Asal</th>
                        <th scope="col" className={`${styles.smallrow}`}>Kota Tujuan</th>
                        <th scope="col" className={`${styles.mediumrow}`}>Tanggal Perjalanan</th>
                        <th scope="col" className={`${styles.smallrow}`}>Jam</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>No. Maskapai</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>Kode Booking</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>No. Tiket</th>
                        <th scope="col" className={`${styles.mediumrow}`}>Harga Jual</th>
                        <th scope="col" className={`${styles.mediumrow}`}>Harga Nett</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>Unicorn</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>Lama Stay (Hotel)</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>Lama Stay (Hotel)</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>Kode Promosi</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>Kartu Kredit</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>File Tiket</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>Kertas Booking</th>
                        <th scope="col" className={`${styles.mediumsmallrow}`}>User</th>
                    </tr>
                    </thead>
                    <tbody>
                    {DataFilter.length === 0 ? (
                        <tr>
                            <td colSpan="25" style={{ textAlign: 'center' }}>
                                Tidak ada faktur hari ini.
                            </td>
                        </tr>
                    ) : (
                    DataFilter.map((item, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.tgl}</td>
                        <td>{item.nama_pemesan}</td>
                        <td>{item.no_telp}</td>
                        <td>{item.nama_penumpang}</td>
                        <td><a href={`/faktur/det/bhgaef789413bhd${item.id.toString().padStart(4, '0')}bcdbabaasufile`}>{item.no_faktur}</a></td>
                        <td>{item.total_harga_bayr}</td>
                        <td>{item.kota_asal}</td>
                        <td>{item.kota_tujuan}</td>
                        <td>{item.tanggal_perjalanan}</td>
                        <td>{item.jam_penerbangan}</td>
                        <td>{item.no_maskapai}</td>
                        <td>{item.kode_booking}</td>
                        <td>{item.no_tiket}</td>
                        <td>{item.harga_formatted_jual}</td>
                        <td>{item.harga_formatted_nett}</td>
                        <td>{item.unicorn}</td>
                        <td></td>
                        <td></td>
                        <td>{item.kode_promosi}</td>
                        <td>{item.kartu_kredit}</td>
                        <td><a href={`/faktur/tiket/${item.tiket_location}`} target="_blank">Download</a></td>
                        <td><a href={`/faktur/kb/${item.kertasbooking}`} target="_blank">Lihat</a></td>
                        <td>{item.user}</td>
                        </tr>
                    ))
                )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Fakturhariini