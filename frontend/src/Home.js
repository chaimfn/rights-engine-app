import React, { useState, useEffect } from 'react';
import { RightModel, Condition } from "rights-engine-core"
import './Home.css';
import persons from './persons';
import Config from './Config';


function Home(props) {
  const [allRights, setAllRights] = useState(null);
  const [entitledRights, setEntitledRights] = useState(null);
  const [notEntitledRights, setNotEntitledRights] = useState(null);
  const [uncertainRights, setUncertainRights] = useState(null);
  const [fields, setFields] = useState(null);
  const [txtarea, setTextarea] = useState(null);
  const [message, setMessage] = useState(null);
  const [msgType, setMessageType] = useState("info");

  function setExamplePerson(e, person) {
    setTextarea(JSON.stringify(person, null, 2));
  }

  function rightOnClick(e, right) {
    let msg = {
      // code: right.code,
      // title: right.title,
      reason: right.log
    };
    console.log(msg);
    setMessage(JSON.stringify(msg, null, 2))
  }

  function sortRights(e) {
    let _person = null;
    try {
      _person = JSON.parse(txtarea);
    }
    catch (err) {
      let msg = {
        title: "Failed to parse txtarea to Person",
        msg: err.message
      };
      setMessage(JSON.stringify(msg, null, 2));
      setMessageType("err");
      return console.error(msg, err);
    }

    if (_person == null || _person == undefined) {
      let msg = {
        title: "Person is null/undefined",
      };
      setMessage(JSON.stringify(msg, null, 2));
      setMessageType("err");
      return console.error(msg);
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
      let msg = {
        title: "Error in right.isMatched()",
        msg: err.message
      };
      setMessage(JSON.stringify(msg, null, 2));
      setMessageType("err");
      return console.error(err)
    }
    let t2 = new Date();

    setEntitledRights(entitled);
    setNotEntitledRights(notEntitled);
    setUncertainRights(uncertain);
    let exceptFields = Object.keys(_person)?.filter(key => _person[key] != null);
    let t3 = new Date();
    let _fields = RightModel.getPopularFields(uncertain, Condition.And, exceptFields);
    let t4 = new Date();
    setFields(_fields)
    let log = {
      entitled: entitled?.length,
      notEntitled: notEntitled?.length,
      uncertain: uncertain.length,
      sortTime: t2.getTime() - t1.getTime(),
      popularFields: _fields.length,
      time: t4.getTime() - t3.getTime()
    }
    console.log(log)
    setMessage(JSON.stringify(log, null, 2))
    setMessageType("info");
  }

  function onTxtareaChange(e) {
    setTextarea(e.target.value)
  }

  useEffect(() => {
    let t1 = new Date();
    let _rights = []

    fetch(Config.backend.data)
      .then(res => res?.json())
      .then(data => {
        let t2 = new Date();
        _rights = data?.rights?.map(item => RightModel.convert(item));
        let t3 = new Date();
        setAllRights(_rights);
        setUncertainRights(_rights);
        let t4 = new Date();
        let _fields = RightModel.getPopularFields(_rights);
        let t5 = new Date();
        setFields(_fields)
        let log = {
          rights: _rights?.length,
          backendTime: data?.serverTime,
          frontTime: t2.getTime() - t1.getTime(),
          convertTime: t3.getTime() - t2.getTime(),
          sortedFields: _fields.length,
          sortTime: t5.getTime() - t4.getTime()
        };
        console.log(log);
        setMessage(JSON.stringify(log, null, 2))
        setMessageType("info");
      })
      .catch(err => {
        let msg = {
          title: "Failed to get data",
          msg: err.message
        };
        setMessage(JSON.stringify(msg, null, 2));
        setMessageType("err");
        console.error(msg, err);
      })
  }, []);

  return (
      <div className="App">
        <header className="scroll">
          {
            uncertainRights?.map((right, i) =>
              <span className='right' key={i} onClick={(e) => rightOnClick(e, right)}>
                {right.title}
              </span>)
          }
        </header>
        <main>
          <div className='console'>
            <strong className='center'>Console</strong>
            <div className='scroll'>
              <pre className={`msg ${msgType}`}>{message}</pre>
            </div>
          </div>
          <div className='center'>
            <strong style={{ marginRight: "10px" }}>פרטים אישיים</strong>
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
                entitledRights?.map((right, i) => <span className='right' key={i} onClick={(e) => rightOnClick(e, right)} >
                  {right.title}
                </span>)
              }
            </div>
          </div>
          <div>
            <strong className='center'>לא זכאי</strong>
            <div className='scroll'>
              {
                notEntitledRights?.map((right, i) => <span className='right' key={i} onClick={(e) => rightOnClick(e, right)} >
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

export default Home;
