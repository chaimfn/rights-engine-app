import React, { useState, useEffect } from 'react';
import Config from './Config';

function Ready() {
    const [ready, setReady] = useState(null);
    const [className, setClassName] = useState(null);


    useEffect(() => {
        fetch(Config.backend.hz)
            .then(res => res?.text())
            .then(data => {
                setReady("ready");
                setClassName("ok")
            })
            .catch(err => {
                console.log(3, err)
                setReady("not ready");
                setClassName("err")
            });
    }, [])

    return <span className={className}>{ready}</span >
}

export default Ready