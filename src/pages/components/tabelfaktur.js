import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import styles from './Tabelfaktur.module.css';

const TabelFaktur = () => {
    const [DataFaktur, setDataFaktur] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const cachedData = localStorage.getItem('DataFaktur');
        if (cachedData) {
            setDataFaktur(JSON.parse(cachedData));
        } else {
            console.error('No data found in localStorage');
        }
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredData = DataFaktur.filter((item) =>
        item.nama_pemesan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama_penumpang.toLowerCase().includes(searchTerm)||
        item.no_faktur.toString().includes(searchTerm) ||
        item.kota_asal.toLowerCase().includes(searchTerm) ||
        item.kota_tujuan.toLowerCase().includes(searchTerm)||
        item.tanggal_perjalanan.toString().toLowerCase().includes(searchTerm)||
        item.jam_penerbangan.toString().toLowerCase().includes(searchTerm)||
        item.no_tiket.toLowerCase().includes(searchTerm)||
        item.kode_booking.toLowerCase().includes(searchTerm)||
        item.harga_formatted_jual.toLowerCase().includes(searchTerm)||
        item.harga_formatted_nett.toLowerCase().includes(searchTerm)||
        item.harga_jual.toString().toLowerCase().includes(searchTerm)||
        item.harga_nett.toString().toLowerCase().includes(searchTerm)||
        item.pembayaran?.toString().toLowerCase().includes(searchTerm)||
        item.tgl_pembayaran?.toString().toLowerCase().includes(searchTerm)

    );

    return (
        <div>
            <div className={`${styles.header}`}>
                <h2>Data Faktur</h2>
                <Button href="/faktur/createfakturtiket" style={{marginRight:'5px'}} variant='success' id="dropdown-basic-button" title="Add Faktur">Add Faktur</Button>
            </div>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
            </div>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">No.</th>
                            <th scope="col" className={styles.smallrow}>Tgl</th>
                            <th scope="col" className={styles.mediumrow}>Nama Pemesan</th>
                            <th scope="col" className={styles.mediumrow}>No. Telepon</th>
                            <th scope="col" className={styles.largerow}>Nama Penumpang</th>
                            <th scope="col" className={styles.smallrow}>No. Faktur</th>
                            <th scope="col" className={styles.mediumrow}>Jumlah yang Harus Dibayar</th>
                            <th scope="col" className={styles.smallrow}>Kota Asal</th>
                            <th scope="col" className={styles.smallrow}>Kota Tujuan</th>
                            <th scope="col" className={styles.mediumrow}>Tanggal Perjalanan</th>
                            <th scope="col" className={styles.smallrow}>Jam</th>
                            <th scope="col" className={styles.mediumsmallrow}>No. Maskapai</th>
                            <th scope="col" className={styles.mediumsmallrow}>Kode Booking</th>
                            <th scope="col" className={styles.mediumsmallrow}>No. Tiket</th>
                            <th scope="col" className={styles.mediumrow}>Harga Jual</th>
                            <th scope="col" className={styles.mediumrow}>Harga Nett</th>
                            <th scope="col" className={styles.mediumsmallrow}>Unicorn</th>
                            <th scope="col" className={styles.mediumsmallrow}>Lama Stay (Hotel)</th>
                            <th scope="col" className={styles.mediumsmallrow}>Lama Stay (Hotel)</th>
                            <th scope="col" className={styles.mediumsmallrow}>Kode Promosi</th>
                            <th scope="col" className={styles.mediumsmallrow}>Kartu Kredit</th>
                            <th scope="col" className={styles.mediumsmallrow}>File Tiket</th>
                            <th scope="col" className={styles.mediumsmallrow}>Kertas Booking</th>
                            <th scope="col" className={styles.mediumsmallrow}>User</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.length > 0 ? (
                            filteredData.map((item, index) => (
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
                        ) : (
                            <tr>
                                <td colSpan={24} className="text-center">No faktur today</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TabelFaktur;
