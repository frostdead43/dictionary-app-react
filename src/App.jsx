import { useState,useEffect } from 'react'
import './App.css'
import "./reset.css"

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
       <Header/>
       <Main/>
    </>
  )
}



function Header() {
  return(
    <>
      <div className='header'>
        <div>
          <a href=""><img src="./images/logo.svg"/></a>
        </div>
        <div className='option-area'>
        <select name="options" id="fontSelect">
          <option value="inconsolata" data-font="Inconsolata">inconsolata</option>
          <option value="sans-serif" data-font="sans-serif">sans-serif</option>
          <option value="mono" data-font="mono">mono</option>
          <option value="sevillana" data-font="Sevillana">Sevillana</option>
        </select>
          <input className='switch' type="checkbox"/>
          <img src="./images/darkmode-icon.svg"/>
        </div>
      </div>
    </>
  )
 
}


function Main() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
      async function getData() {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputValue}`);
        const data = await response.json();  
        setData(data);
      }
      getData();
  }, [inputValue]); 

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submitted");
  }

  return (
  <div className='container'>
    <form onSubmit={handleSubmit} id="formId">
      <input className='search-bar' type="text" laceholder="Search..." onChange={handleChange} value={inputValue}/>
    </form>
    

  
      {data && data.length > 0 ? (
      <div className='name-area'>
        <h1>{data[0].word}</h1>
        <h2>{data[0].phonetic}</h2>
        {data.map((x, i) => (
          <div key={i}>
            {x.meanings && x.meanings.map((y) => (
              <div key={y.partOfSpeech}>
                <h3>{y.partOfSpeech}</h3>
                {y.definitions && y.definitions.map((z) => (
                  <div key={z.definition}>
                    <p>{z.definition}</p>
                    {z.example && <p>{z.example}</p>}
                    {y.synonyms && y.synonyms.length > 0 ?
                    <ul key={y.synonyms}>
                      {y.synonyms.map((q) => <li>{q}</li>)}
                    </ul> : <p>no synonyms</p>
                  }
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      ) : 'No definitions found'}



  </div>

); 
}

export default App


