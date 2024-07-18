import React, { useEffect, useState } from 'react';
import authMiddleware from '../../../../middleware/authMiddleware';
import { useRouter } from 'next/router';
import getDetailData from '../../../api/getDetaildata';
import MainLayout from '../../../layout/layout';
import moment from 'moment-timezone';

const DetailFaktur = () => {
  const openNewPageWithToken = (url) => {
    const token = sessionStorage.getItem('token');
    const expires_at = sessionStorage.getItem('expires_at');
    const newWindow = window.open(url, '_blank');
    
    if (newWindow) {
      newWindow.onload = () => {
        // You can pass the token to the new window here if needed
        newWindow.sessionStorage.setItem('token', token);
        newWindow.sessionStorage.setItem('expires_at', expires_at);
      };
    }
  };
  const [temp, setTemp] = useState(null);
  const router = useRouter();
  const { web_faktur } = router.query;
  const [DetailFaktur, setDetailFaktur] = useState([]);
  const [pdfUrl, setPdfUrl] = useState(null);
  useEffect(() => {
    if (web_faktur) {
      const id_faktur = web_faktur.slice(15,19); 
      console.log(id_faktur);
      const hitapi = async () => {
        try {
          const response = await getDetailData(id_faktur); 
          setDetailFaktur(response);
          if (response.length > 0) {
            setTemp(response[0]);
          }
          console.log(response[0].no_faktur);
          const token = sessionStorage.getItem('token'); 
        if (response[0].no_faktur) {
            const url = `https://api.satria-wisata.com/api/faktur/faktur/${response[0].no_faktur}`;
            fetchPdfUrl(url, token);
        }
        } catch (error) {
          console.error("Error fetching detail data:", error);
        }
      }
      hitapi();
    }
    
  }, [web_faktur]);

  const fetchPdfUrl = async (url, token) => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch PDF');
        }
        const data = await response.json();
        if (data && data.content) {
            const base64PDF = data.content;
            const binaryString = window.atob(base64PDF);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const blob = new Blob([bytes], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(blob);
            setPdfUrl(pdfUrl);
        }
    } catch (error) {
        console.error(error);
    }
  };


  const openPdf = () => {
      if (pdfUrl) {
          window.open(pdfUrl);
      }
  };

  if (!temp) {
    return <MainLayout><div>Loading...</div></MainLayout>; // Atau loading spinner
  }
  return (
    <MainLayout>
      <div className="container pt-3" style={{marginTop: '80px'}}>
            <div className="row">
                <div className="col-8 pt-3 pb-2">
                    <h2>KW {temp.no_faktur}</h2>
                    <h5>NTA TOTAL = {temp.total_harga_nett}</h5>
                    <h5>SELL TOTAL = {temp.total_harga_sell}</h5>
                </div>
                <div className="col-md-4 pt-3 pb-5">
                    <br />
                    <h6>Jakarta, {moment().tz('Asia/Jakarta').format('D MMM YYYY')}</h6>
                    <h4>{temp.nama_pemesan}</h4>
                    <h6 className="pt-2">created_at = {temp.tgl}</h6>
                    <h6>by = {temp.user}</h6>
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-3 pb-3">
                    <p><strong className="pr-4">Tujuan</strong>: {temp.kota_asal} - {temp.kota_tujuan}</p>
                    <p><strong className="pr-3">Tanggal</strong>: {temp.tanggal_perjalanan}</p>
                </div>
                <div className="col-5 pb-3">
                    <p><strong className="pr-2">Maskapai </strong> : {temp.unicorn}</p>
                    <p><strong className="pr-5">Jam</strong> : {temp.jam_penerbangan}</p>
                </div>
                <div className="col-md-4 pb-3">
                    <a href={`/faktur/${temp.no_faktur}/edit`} className="btn btn-warning">Edit Faktur</a>
                    <a href={`/faktur/print/bhgaef789413bhd${temp.no_faktur}bcdbabaasufile`} className="btn btn-dark">Print Faktur</a>
                    {pdfUrl ? (
                      <button onClick={openPdf} className="btn btn-info">Show Faktur</button>
                    ) : (
                      <button className="btn btn-disabled">Loading</button>  
                    )}
                </div>
                <div className="col-3 pb-3" style={{ justifyContent: 'space-between', marginLeft: 'auto', paddingLeft: '19px' }}>
                    <a href={`/faktur/${temp.no_faktur}/edit`} className="btn btn-warning">Edit Faktur</a>
                    <a href="/pembayaran" className="btn btn-success">Sudah Bayar</a>
                </div>
            </div>
            <div className="container">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th className="medium-row">Nama Penumpang</th>
                            <th scope="medium-row">No Tiket</th>
                            <th scope="col">Kode Booking</th>
                            <th scope="col">Harga Sell</th>
                            <th scope="col">Harga NTA</th>
                            <th scope="col">K. Promosi</th>
                            <th scope="col">CC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {DetailFaktur.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.nama_penumpang}</td>
                                <td>{item.no_tiket}</td>
                                <td>{item.kode_booking}</td>
                                <td>{item.harga_formatted_jual}</td>
                                <td>{item.harga_formatted_nett}</td>
                                <td>{item.kode_promosi}</td>
                                <td>{item.kartu_kredit}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br />
            <br />
            <br />
            <div className="flex-grow-1"></div>
            <div className="container pb-3">
                <form action="/faktur/sendEmail" method="POST">
                    <div className="form-group">
                        <label htmlFor="inputKomentar">Tambahkan Email</label>
                        <input type="text" className="form-control" id="email" name="email" placeholder="Email" />
                        <input type="hidden" className="form-control" id="id" name="id" value={DetailFaktur[0].id} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </MainLayout>
  );
};

export default authMiddleware(DetailFaktur);
