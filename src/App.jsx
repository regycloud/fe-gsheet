/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import mainlogo from'./assets/logo1.png';
import logo2 from './assets/logo2.png';


const TableComponent = ({ data }) => {
  const filledArray = data[0].map((_, index) => (index < data[0].length ? data[0][index] : ''));

  return (
    <table border="1" width={'100%'}>
      <thead>
        <tr>
          {data[0].map((header, index) => (
            <th key={index} colSpan={index === 0 ? data.length : 1}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}

          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Time = () => {

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()));
  }, []);

  const [time, setTime] = useState(new Date());
  const formattedTime = time.toLocaleTimeString("en-US");
  return(
    <>{formattedTime}</>
  )
}

const Banner = ({title, flex, color}) => {
  return(
    <h2 className='banner' style={{'flex':flex, 'backgroundColor':color}}>{title}</h2>
  )
}

const Footer = ({data}) => {
  return (
    <div className="footer-container">
      <div className="id-column footer-column">08.00.13</div>
      <div className="marquee-column footer-column"><Marquee data={data} /></div>
      <div className="time-column footer-column"><Time /></div>
    </div>
  );
}

const Header = () => {
  return(
    <div className='container'>
      <div className='left-column'>
        <img src={mainlogo} style={{'maxWidth': '500px'}}></img>
      </div>
      <div className='right-column'>
        <img src={logo2} style={{'maxWidth': '200px'}}></img>
      </div>
    </div>
  )
}

const Marquee = ({data}) => {
  return (
      <marquee behavior="scroll" direction="left" scrollamount="5">
        {data}
      </marquee>
  );
};


function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  },[])
  
  const getData = async () => {
    const response = await axios.get('https://ruby-uptight-swallow.cyclic.app/req');
    setData(response.data)
  }
  


  return (
    <>
      <Header />
      <div className='container'>
        <Banner title={'LOG BOOK LIMBAH B3'} flex={'60%'} color={'green'}/>
        <Banner title={'STOK GUDANG'} flex={'30%'}/>
      </div>

      <div className='container'>
        <div className='column' style={{'flex':'70%'}}>
        {data.length > 0 ? <TableComponent data={data[0]} /> : <p>Loading...</p>}
        </div>
        <div className='column'>
        {data.length > 0 ? <TableComponent data={data[2]} /> : <p>Loading...</p>}
        </div>
      </div>
      

      <div className='container'>
        <div className='column' style={{'flex':'70%'}}>
        {data.length > 0 ? <TableComponent data={data[1]} /> : <p>Loading...</p>}
        </div>
        <div className='column'>
        {data.length > 0 ? <TableComponent data={data[3]} /> : <p>Loading...</p>}
        </div>
      </div>
      <Footer data={data[4]} />
    </>
  )
}

export default App
