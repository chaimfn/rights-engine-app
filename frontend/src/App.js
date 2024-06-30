import React, { useState, useEffect } from 'react';
import { RightModel, Condition } from "rights-engine-core"
import './App.css';
import persons from './persons';


function App(props) {
  const [allRights, setAllRights] = useState(null);
  const [entitledRights, setEntitledRights] = useState(null);
  const [notEntitledRights, setNotEntitledRights] = useState(null);
  const [uncertainRights, setUncertainRights] = useState(null);
  const [fields, setFields] = useState(null);
  const [txtarea, setTextarea] = useState(null);
  const [person, setPerson] = useState(null);

  function setExamplePerson(e, person) {
    setTextarea(JSON.stringify(person, null, 2));
  }

  function sortRights(e) {
    console.log(txtarea);
    let _person = null;
    try {
      _person = JSON.parse(txtarea);
      console.log(1, _person);
    }
    catch (err) {
      return console.error("failed to parse txtaria to Person", err)
    }

    if (_person == null || _person == undefined) {
      return console.error("person is null/undefined");
    }

    let entitled = [], notEntitled = [], uncertain = [];
    let t1 = new Date();
    try {
      allRights.forEach(right => {
        let matched = right.isMatched(_person);
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

    setEntitledRights(entitled);
    setNotEntitledRights(notEntitled);
    setUncertainRights(uncertain);
    console.log("sorted:", {
      entitled: entitled?.length,
      notEntitled: notEntitled?.length,
      uncertain: uncertain.length,
      sortTime: t2.getTime() - t1.getTime()
    });
    let exceptFields = Object.keys(_person)?.filter(key => _person[key] != null);
    let t3 = new Date();
    let _fields = RightModel.getPopularFields(uncertain, Condition.And, exceptFields);
    let t4 = new Date();
    setFields(_fields)
    console.log({
      popularFields: _fields.length,
      time: t4.getTime() - t3.getTime()
    })

  }

  function onTxtareaChange(e) {
    let txt = e.target.value;
    try {
      let _person = JSON.parse(txt);
      setPerson(_person)
    }
    catch (err) {
      console.warn("failed to parse txtaria to Person", err)
    }
  }

  function onRightClick(e, right) {
    console.log({
      code: right.code,
      log: right.log
    })
  }

  useEffect(() => {
    let t1 = new Date();
    let _rights = []
    let t2 = new Date();

    fetch(window.config.backendUrl)
      .then(res => res?.json())
      .then(data => {
        _rights = data?.rights?.map(item => RightModel.convert(item));
        let t3 = new Date();
        console.log({
          rights: _rights?.length,
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
      .catch(err => console.error("Failed to get data", err))
  }, []);

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
          <div className='person-examples'>
            <strong>דוגמאות:</strong>
            {persons?.map((person, i) => <button key={i} title={person?.description} onClick={(e) => setExamplePerson(e, person)}>{person?.name}</button>)}
          </div>
          <textarea value={txtarea} onChange={onTxtareaChange}></textarea>
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
