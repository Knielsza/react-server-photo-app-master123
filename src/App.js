import './style.css';
import { useState } from 'react';

function App() {
  const [pictures, updatePictures] = useState([]);
  const [ipValue, setIp] = useState('192.168.119.115');
  const [selects, setSelects] = useState([]);

  const getPhotos = async () => {

    const response = await fetch('http://' + '192.168.119.115' + ':3001/getFiles', { method: "GET" })
    const val = await response.json()
    updatePictures(val.files)
    setSelects([])
    console.log(pictures);


  }
  const addSelect = (id) => {
    setSelects(() => selects.includes(id) ? selects.filter((e) => e !== id) : [...selects, id])//pictures[id]
  }
  const clearSelect = () => {
    setSelects([])
  }
  const selectAll = () => {
    setSelects(Array.from(
      { length: pictures.length },
      (_, index) => index
    ))
  }
  const delOne = async (id) => {
    if (!ipValue.includes('x')) {
      await fetch('http://' + '192.168.119.115' + ':3001/deleteSth', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id }),
      }).then(() => getPhotos())
    }
    else {
      alert('-')
    }
  }
  const delSelects = async () => {
    if (!ipValue.includes('x')) {
      console.log(selects.length);
      await fetch('http://' + ipValue + ':3001/deleteSelects', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selects }),
      })
        .then(() => getPhotos())
    }
    else {
      alert('-')
    }
  }
  const rename = async (originalName) => {
    if (!ipValue.includes('x')) {
      const newName = prompt('Provide new name: ')
      await fetch('http://' + ipValue + ':3001/newName', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ original: originalName, new: newName }),
      })
        .then(updatePictures([]))
    }
    else {
      alert('-')
    }
  }
  return (
    <div className="App">
      <div className='top'>
        {/* <input className='input-top' type='text' defaultValue={ipValue} onChange={(e) => {setIp(e.target.value)}}></input> */}
        <button onClick={getPhotos} className='refresh-btn'>Refresh</button>
        {/* <input className='selects' type='text' value={'selected: ' + (selects.length !== 0 ? selects : 'click image to select')} readOnly></input> */}
        <div className='top-btns'>
          <button onClick={selectAll}>Select all</button>
          <button onClick={clearSelect}>Clear</button>
        </div>
        <button className='rm-selected' onClick={delSelects}>Remove Selected</button>
      </div>
      <div className='file-container'>
        {
          pictures.length !== 0 ?
            pictures.map((e, i) => {
              return (
                <div className={'Pic ' + (selects.includes(i) ? 'on' : 'off')} key={i}>
                  <p><b>{i + ':'}&nbsp;</b>{e}</p>
                  <img src={require('./server/upload/' + e)} alt=''></img>
                  <button onClick={() => delOne(i)}>🗑</button>
                  <button onClick={() => rename(e)}>✎</button>
                  <input className='checkin' type='checkbox' checked={selects.includes(i) ? true : false} onClick={() => addSelect(i)}></input>
                </div>)
            }) : <p className='error-info'>Not Working</p>
        }
      </div>
    </div>
  );
}

export default App;
