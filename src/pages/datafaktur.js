import React from 'react'
import MainLayout from './layout/layout'
import TabelFaktur from './components/tabelfaktur'



const datafaktur = () => {
  return (
    <MainLayout>
        <div style={{marginTop: '100px'}}>
            <TabelFaktur />
        </div>
    </MainLayout>
  )
}

export default datafaktur