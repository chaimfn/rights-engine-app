import React, { useState, useEffect } from 'react';
import { RightModel } from "rights-engine-core"
import './App.css';
import _person from "./person.json"


function App(props) {
  console.log("config:", window.config)
  const [allRights, setAllRights] = useState(null);
  const [entitledRights, setEntitledRights] = useState(null);
  const [notEntitledRights, setNotEntitledRights] = useState(null);
  const [uncertainRights, setUncertainRights] = useState(null);
  const [fields, setFields] = useState(null);
  const [txtarea, setTextarea] = useState(null);


  function sortRights(e) {
    let person = {}
    try {
      person = JSON.parse(txtarea);
    }
    catch (err) {
      console.error("failed to parse txtaria to Person", err)
    }
    console.log(person);
    let entitled = [], notEntitled = [], uncertain = [];
    let t1 = new Date();
    try {
      allRights.forEach(right => {
        let matched = right.isMatched(person);
        right.log = matched.log;
        if (matched.isMatched == true)
          entitled.push(right);
        else if (matched.isMatched == false)
          notEntitled.push(right);
        else uncertain.push(right)
      });
    }
    catch (err) {
      console.error(err)
    }
    let t2 = new Date();
    console.log("entitled:", entitled?.length);
    console.log("notEntitled:", notEntitled?.length);
    console.log("uncertain:", uncertain.length)


    setEntitledRights(entitled);
    setNotEntitledRights(notEntitled);
    setUncertainRights(uncertain);
    console.log("sortTime:", t2.getTime() - t1.getTime());
    let t3 = new Date();
    let _fields = RightModel.getPopularFields(uncertain);
    let t4 = new Date();
    setFields(_fields)
    console.log({
      popularFields: _fields.length,
      time: t4.getTime() - t3.getTime()
    })

  }

  function onPersonChange(e) {
    let txt = e.target.value;
    setTextarea(txt)
  }

  function onRightClick(e, right) {
    console.log({
      code: right.code,
      log: right.log
    })
  }

  useEffect(() => {
    let t1 = new Date();
    fetch(window.config.backendUrl)
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
        setAllRights(_rights);
        setUncertainRights(_rights);

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
          uncertainRights?.map((right, i) => <span className='right' key={i} onClick={(e) => onRightClick(e, right)}>
            {right.title}
          </span>)
        }
      </header>
      <main>
        <div>
          <strong className='center'>פרטים אישיים</strong>
          <textarea
            // value={txtarea}
            onChange={onPersonChange}
          ></textarea>
          <div className='center'>
            <button onClick={sortRights}>חפש זכויות</button>
          </div>
        </div>
        <div>
          <strong className='center'>זכאי</strong>
          <div className='scroll'>
            {
              entitledRights?.map((right, i) => <span className='right' key={i} onClick={(e) => { onRightClick(e, right) }} >
                {right.title}
              </span>)
            }
          </div>
        </div>
        <div>
          <strong className='center'>לא זכאי</strong>
          <div className='scroll'>
            {
              notEntitledRights?.map((right, i) => <span className='right' key={i} onClick={(e) => { onRightClick(e, right) }} >
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
