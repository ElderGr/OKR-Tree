import React,{ useState, useEffect } from "react";

import { Accordion, Card, Button } from "react-bootstrap";

import {FaPlus, FaAngleDown} from "react-icons/fa";
import {IoMdClose} from "react-icons/io";

import "./lista.css";

const List = (props) => {

    const [data, setData] = useState([]);
    const [addVisible, setAddVisible] = useState(false);
    const [value, setValue] = useState([1,2,3,4]);

    useEffect(()=>{
        funcao();
    }, []);

    const funcao = (props) =>{
        let obj = data;

        obj = [
            {
                objetivo: 'Levar o cachorro para passear', 
                kr:[
                    'a',
                    'b',
                    'c'
                ]
            },
            {
                objetivo: 'Fazer as compras', 
                kr:[
                    'd',
                    'e',
                    'f'
                ]
            },
            {
                objetivo: 'Lavar as roupas', 
                kr:[
                    'g',
                    'h',
                    'i'
                ]
            }
        ]

        setData(obj)
    }
    
    const addKr = (props) =>{
        setAddVisible(!addVisible);
    }

    const saveKr = (event) =>{
        if(event.keyCode === 13){
            let obj = {
                objetivo: event.target.value,
                kr: []
            }

            let copy_data = data;
            copy_data.push(obj);
            
            event.target.value = '';

            setValue([])

        } else if(event.keyCode === 27){
            addKr();
            event.target.value = ''
        }
    }

    const removeKr = (event, element) =>{
        
        let obj = data.filter(elem =>{
            return elem.objetivo !== element.objetivo
        });

        setData(obj);
    }

        return(
            <div className='container'>
                
                <div className='mt-2 mb-2'>
                    <div className='d-flex align-items-center'>
                        <Button onClick={addKr} style={{borderRadius: '20px', zIndex: '999'}} className={`d-flex align-items-center justify-content-center btn-success p-2 pr-2 pl-2 text-white ml-2`}>
                            <FaPlus />  
                        </Button>
                        <div 
                            style={{display: `${addVisible ? 'block' : 'block'}`}} 
                            className='mt-2'
                        >
                            <div>
                                <input onKeyDown={saveKr} placeholder='Objetivo' className={`input-add ${addVisible ? 'input-add-visible': ''}`}/>
                                <input onKeyDown={saveKr} placeholder='Tipo' className={`ml-1 input-add ${addVisible ? 'input-add-visible': ''}`}/>
                                <input onKeyDown={saveKr} placeholder='Período' className={`ml-1 input-add ${addVisible ? 'input-add-visible': ''}`}/>
                                <input onKeyDown={saveKr} placeholder='Data' className={`ml-1 input-add ${addVisible ? 'input-add-visible': ''}`}/>
                                <button className='btn btn-white btn-add-kr rounded'>
                                    <FaAngleDown />
                                </button>
                                {/* <button>
                                    <IoMdClose className={`ml-2`}/>
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        
                    </div>
                    <Accordion>
                        {data.map((element, index) =>(
                            <Card key={index}>
                                <Accordion.Toggle style={{display: 'none'}} as={Button} eventKey={index}>
                                    Botao
                                </Accordion.Toggle>
                                
                                <Card.Header onClick={(event) => {
                                            (event.target.parentNode.querySelector('button') !== null) ? event.target.parentNode.querySelector('button').click() : console.log('')
                                        }} className='d-flex justify-content-between'>
                                    <div>
                                        {element.objetivo}
                                    </div>
                                    <div>
                                        <button>Teste</button>
                                        <IoMdClose onClick={ (event) => removeKr(event, element) } className='m-2 text-danger' />
                                    </div>
                                </Card.Header>

                                <Accordion.Collapse eventKey={index}>
                                    <Card.Body>
                                        {element.kr.map((element, index)=>(
                                            <div key={index}>{element}</div>
                                        ))}
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        ))}
                    </Accordion>
                </div>
            </div>
        ); 
}

export default List;