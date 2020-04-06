import React, { useState } from 'react';
import { FaDivide, FaTimes, FaPlus, FaMinus, FaEquals } from 'react-icons/fa';
import { GoPrimitiveDot } from 'react-icons/go';

//import api from '../../services/api';

import './styles.css';

export default function Calculator(){
    const [result, setResult] = useState('');
    const [numbers] = useState([]);
    const [operation, setOperation] = useState();
    const [run, setRun] = useState(false);
    
    function handleEquals(){
        let res = 0;

        numbers.push(result);
        const temp = numbers.map(Number);
        if(temp.length === 2){
            if(operation === 'sum'){
                res = temp[0] + temp[1];
            }else if(operation === 'sub'){
                res = temp[0] - temp[1];
            }else if(operation === 'mul'){
                res = temp[0] * temp[1];
            }else if(operation === 'div'){
                if(temp[1] === 0){
                    alert("Não dividirás por ZEROO!");
                }else{
                    res = temp[0] / temp[1]
                }
            }

            res = res.toString();
            if(res.length <= 9){
                setResult(res);
            }else{
                setResult('Very large');
            }

            for(let i = 1; i <= 2; i++){
                numbers.shift();
            }

            setRun(true);
        }
    }

    function setNumberOperation(operation){
        if(numbers.length < 1){
            numbers.push(result);
            setOperation(operation);
            setResult('');
        }else{
            handleEquals();
            setOperation(operation);
        }
    }

    function handleSetResult(value){
        if(result.length < 9){
            if(run){
                setResult(value);
                setRun(false);
            }else{
                setResult(result + value);
            }
        }
    }

    document.addEventListener("keydown", function(event){
        if(event.keyCode === 8){
            return true;
        }else{
            return false;
        }
    })

    return(
        <div className="calculator-container">
            <input type="text"className="result" value={result} onChange={e => setResult(e.target.value)}/>

            <div className="keyboard">
                <input type="button" value="7" className="btn-calculator" onClick={e => handleSetResult(e.target.value)} />
                <input type="button" value="8" className="btn-calculator" onClick={e => handleSetResult(e.target.value)} />
                <input type="button" value="9" className="btn-calculator" onClick={e => handleSetResult(e.target.value)} />
                <button className="btn-calculator operations" onClick={e => setNumberOperation('div')}>
                    <FaDivide />
                </button>
                <input type="button" value="4" className="btn-calculator" onClick={e => handleSetResult(e.target.value)} />
                <input type="button" value="5" className="btn-calculator" onClick={e => handleSetResult(e.target.value)} />
                <input type="button" value="6" className="btn-calculator" onClick={e => handleSetResult(e.target.value)} />
                <button className="btn-calculator operations"  onClick={e => setNumberOperation('mul')}>
                    <FaTimes />
                </button>
                <input type="button" value="1" className="btn-calculator" onClick={e => handleSetResult(e.target.value)} />
                <input type="button" value="2" className="btn-calculator" onClick={e => handleSetResult(e.target.value)} />
                <input type="button" value="3" className="btn-calculator" onClick={e => handleSetResult(e.target.value)} />
                <button className="btn-calculator operations"  onClick={e => setNumberOperation('sub')}>
                    <FaMinus />
                </button>
                <input type="button" value="0" className="btn-calculator" onClick={e => handleSetResult(e.target.value)} />
                <button className="btn-calculator" onClick={e => handleSetResult('.')}>
                    <GoPrimitiveDot size={25}/>
                </button>
                <button className="btn-calculator equals" onClick={handleEquals}>
                    <FaEquals />
                </button>
                <button className="btn-calculator operations"  onClick={e => setNumberOperation('sum')}>
                    <FaPlus />
                </button>
            </div>
        </div>
    )
}