import {useContext, useEffect, useState} from "react";
import {ThemeContext} from "./App";


const Toolbar = () => {
    const [text, setText] = useState('Text')
    useEffect(() => {
        console.log('useEffect');
    }, [])

    function toggle(context) {
        context.theme = 'ssss';
    }

    return <ThemeContext.Consumer>
        {(context) => {
return        <div onClick={() => toggle(context)}>{context.theme}</div>
    }}
    </ThemeContext.Consumer>
}

export default Toolbar;
