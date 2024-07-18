import React, { useEffect, useState } from 'react'
import getDataPembayaran from '../api/getDataPembayaran'
import styles from './boxoderan.module.css'

const BoxOrder = () => {
    const [showAll, setShowAll] = useState(false);
    const [DataFaktur, setDataFaktur] = useState([]);
    const [visibleItems, setVisibleItems] = useState(5); // Tampilkan 5 item pertama

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDataPembayaran();
                setDataFaktur(data.sort((a, b) => b.total - a.total));
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
        fetchData();  
    }, []);

    const handleShowMore = () => {
        setShowAll(true);
    };

    const handleShowLess = () => {
        setShowAll(false);
    };

    return (
        <div className={`card mb-3 ${styles.card}`}>
            <div className={`card-header ${styles.heder}`}>
                <h3>Belum Bayar</h3>
            </div>
            <div className="card-body">
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                    {DataFaktur.slice(0, showAll ? DataFaktur.length : visibleItems).map((item, index) => (
                        <React.Fragment key={index}>
                            <li style={{ marginBottom: '5px', marginRight: '30px', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{item.nama_pemesan}</span>
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
    );
}

export default BoxOrder;

