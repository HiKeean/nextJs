import React, { useEffect, useState } from 'react'
import getDataPembayaran from '../api/getDataPembayaran'
import styles from './boxoderan.module.css'
import getallData from '../api/getDatafaktur'


const BoxBank = () => {
  const [showAll, setShowAll] = useState(false);
  const [visibleItems, setVisibleItems] = useState(5); 
  const [DataFaktur, setDataFaktur] = useState([]);

  useEffect(() => {
      const cachedData = localStorage.getItem('DataFaktur');
      if (cachedData) {
          setDataFaktur(JSON.parse(cachedData));
          // console.log(cachedData);
      } else {
          // Handle case where there is no data in localStorage
          console.error('No data found in localStorage');
      }
  }, []);
  const handleShowMore = () => {
      setShowAll(true);
  };

  const handleShowLess = () => {
      setShowAll(false);
  };
  const calculateTotalNett = (data) => {
    const totals = {};
    data.forEach((item) => {
        const { kartu_kredit, harga_nett } = item;

        if (!totals[kartu_kredit]) {
            totals[kartu_kredit] = 0;
        }

        totals[kartu_kredit] += harga_nett;
    });

    return totals;
  };

  const totals = calculateTotalNett(DataFaktur);

  const data = Object.entries(totals).map(([kartuKredit, total]) => ({
      kartu_kredit: kartuKredit,
      total: total
  }));
  const formattedTotals = data.sort((a, b) => b.total - a.total);
  return (
    <div className={`card mb-3 ${styles.card}`}>
            <div className={`card-header ${styles.heder}`}>
                <h3>Bank Total</h3>
            </div>
            <div className="card-body">
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                  {data.slice(0, showAll ? data.length : visibleItems).map((item, index) => (
                      <React.Fragment key={index}>
                          <li style={{ marginBottom: '5px', marginRight: '30px', display: 'flex', justifyContent: 'space-between' }}>
                              <span>{item.kartu_kredit}</span>
                              <strong style={{ color: item.total > 30000000 ? 'red' : 'inherit', textAlign: 'left' }}>
                                  {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.total)}
                              </strong>
                          </li>
                          <hr />
                      </React.Fragment>
                  ))}
                  {!showAll && <button onClick={handleShowMore} className={styles.pilih}>Show More</button>}
                  {showAll && <button onClick={handleShowLess} className={styles.pilih}>Show Less</button>}
                </ul>
            </div>
        </div>
  )
}

export default BoxBank;