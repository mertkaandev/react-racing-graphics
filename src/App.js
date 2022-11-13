import React, {useState, useEffect} from "react";
import "./app.css";

function App() {
      /* Random sayı üreten bir fonksiyon.
  0'dan büyük bir sayı gelmesi için + 1 eklenmiştir. */
  const getRandomValue = () => {
    return Math.floor(Math.random()*10 + 1)
  };

  const [bars, setBars] = useState([
   // Value değerlerine random sayılar atanacaktır.
         {
          id: 1,
          title: "JavaScript",
          color: "#F4B400",
          value: getRandomValue(),
         },
         {
          id: 2,
          title: "Java",
          color: "#4285F4",
          value: getRandomValue(),
         },
         {
          id: 3,
          title: "C++",
          color: "#DB4437",
          value: getRandomValue(),
         },
         {
          id: 4,
          title: "Python",
          color: "#FF9900",
          value: getRandomValue(),
         },
         {
          id: 5,
          title: "Rust",
          color: "#555555",
          value: getRandomValue(),
         }
  ]);

  const [totalValue, setTotalValue] = useState(0);
  // Sıralama fonksiyonu
  const sortingBars = (data) => {
    let sorted_array = data.sort((a,b)=> b.value - a.value);
    return sorted_array;
  }

  /* BarWidthRandom() fonksiyonu yeni ürettiği sayıları value değerlerine ekleyerek 
  günceller. Aynı zamanda value değerlerine göre state objelerini sıralar. */
  const BarWidthRandom = () => {
    // ...bars, state değeridir.
    let data = [...bars];

    let total = totalValue;
    // Bars state değerinin her biri üzerinde gezer ve değerine getRandomValue() ekler.
    data.forEach((company)=> {
      company.value += getRandomValue();
      total += company.value;
    })
    setTotalValue(total);
    // Sıralanmış, sorted edilmiş data
    const sortedArray = sortingBars(data);
    // State güncellemesi
    setBars(sortedArray);
  }

  /* useEffect içinde setInterval fonksiyonu belli zamanlardan tekrar tekrar
  çalışan bir fonksiyondur. setInterval, içine callback fonksiyonu olarak BarWidthRandom()
  alır. */
  useEffect(()=> {
    setInterval(()=> {
        BarWidthRandom()}, 750
    )
  }, []);

  // Yüzdelik bilgi sayısı, width değeri olarak kullanılacaktır.
  const renderItems = (company) => {
        let percent;
        percent = (100 * company.value) / totalValue;
        return percent;
  }

  return (
    <div className="app">
      <div className="header"><h1>Yıllara Göre En Çok Sevilen Programlama Dilleri</h1></div>
      <div className="app-content">
      {
        bars.map((company, index)=> {
          let percent = String(renderItems(company)) * 3 + '%';
          return(
            <div className="content" key={index} style={{width: percent, backgroundColor: company.color, top:((index+1) * 55) + '%'}}>
                   {company.title + ' ('+company.value +')'}
            </div>
          )
        })
      }
      </div>
    </div>
  );
}

export default App;
