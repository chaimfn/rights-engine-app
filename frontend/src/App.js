import React, { useState, useEffect } from 'react';
import { RightModel } from "rights-engine-core"
import './App.css';

function App() {
  const [rights, setRights] = useState(null);
  const [privilegedRights, setPrivilegedRights] = useState(null);
  const [notPrivilegedRights, setNotPrivilegedRights] = useState(null);
  const [fields, setFields] = useState(null);
  const [txtarea, setTextarea] = useState(null);

  function sortRights(e) {
    try {
      let person = JSON.parse(txtarea);
      console.log(person);
      rights?.forEach(right => {
        console.log(right.isMatched(person))
      });
      let privileged = rights.filter(right => right.isMatched(person).isMatched);
      console.log(privileged)
      setPrivilegedRights(privileged);
      let notPrivileged = rights.filter(right => right.isMatched(person).isMatched == false);
      console.log(notPrivileged)
      setNotPrivilegedRights(notPrivileged);
    }
    catch (err) {
      console.error("failed to parse Person", err)
    }
  }

  function onPersonChange(e) {
    let txt = e.target.value;
    setTextarea(txt)
  }

  function onRightClick(e, right) {
    console.log(right)
  }

  useEffect(() => {
    let t1 = new Date();
    fetch("http://localhost:5000/rights")
      .then(res => res.json())
      .then(data => {
        let t2 = new Date();
        let _rights = data.rights.map(item => RightModel.convert(item));
        let t3 = new Date();
        console.log({
          rights: data?.rights?.length,
          serverTime: data?.serverTime,
          clientTime: t2.getTime() - t1.getTime(),
          convertTime: t3.getTime() - t2.getTime()
        });
        setRights(_rights);

        let t4 = new Date();
        let _fields = RightModel.getPopularFields(_rights);
        let t5 = new Date();
        setFields(_fields)
        console.log({
          popularFields: _fields.length,
          time: t5.getTime() - t4.getTime()
        })

      })
      .catch(err => {
        console.error("Err!", err)
      })
  }, [])

  return (
    <div className="App">
      <header className="scroll">
        {
          rights?.map((right, i) => <span key={i}>
            {right.title}
          </span>)
        }
      </header>
      <main>
        <div>
          <strong>Privileged</strong><br />
          <div className='scroll'>
            {
              privilegedRights?.map((right, i) => <span key={i} onClick={(e) => { onRightClick(e, right) }} >
                {right.title}
              </span>)
            }
          </div>
        </div>
        <div>
          <strong>Person</strong><br />
          <textarea onChange={onPersonChange}></textarea><br />
          <button onClick={sortRights}>Play</button>
        </div>
        <div>
          <strong>Not Privileged</strong><br />
          <div className='scroll'>
            {
              notPrivilegedRights?.map((right, i) => <span key={i} onClick={(e) => { onRightClick(e, right) }} >
                {right.title}
              </span>)
            }
          </div>
        </div>
      </main>
      <footer>
        <pre>
          {fields && JSON.stringify(fields)}
        </pre>
      </footer>
    </div>
  );
}

export default App;
