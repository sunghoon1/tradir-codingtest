import React, { useState, useEffect } from 'react';
import axios from 'axios'
import styled from 'styled-components';
import MaterialTable from 'material-table';
import Modal from './Modal';

const AllBlock = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const ListItemBlock = styled.div`
    width: 70%;
`

const SelectListBlock = styled.div`
    position: fixed;
    right: 10px;
    width: 25%;
    border: 2px solid #ccc;
    border-radius: 4px;
    .basket {
        h3 {
            text-align: center;
        }
        h4 {
            color: red;
        }
        ul {
            -webkit-padding-start: 0px;
            padding: 0 15px 0 15px;
            li {
                list-style: none;
                button {
                    margin-left: 5px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    color: #12b886;
                }
            }
        }
    }
`

const BeerList = () => {
    const [item, setItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isSend, setIsSend] = useState(null);
    const [isSelect, setIsSelect] = useState(null);

    const getItem = async () => {
        try {
            const item = await axios.get(
                'https://api.punkapi.com/v2/beers'
            );            
            setItem(item.data);
        }catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getItem();
    }, [])

    const rowEvents = {
        onClick: (e, row) => {
            setIsSend(row);
            setIsOpen(true);
        }
    }

    // console.log(item);
    // const pr = [
    //     {id:4.1, title:'4-6'},
    //     {id:6, title:'6-8'},
    // ]

    // const prOptions = {};
    // pr.map(p => {
    //     const { id, title } = p;
    //     prOptions[id] = title; 
    //     return p;
    // })
    // console.log(prOptions);
    
    const onAddButton = (data) => {
        setIsSelect(data);
    }

    const onRemoveButton = (data) => {
        let removeItem = isSelect.filter(item => item.name !== data.name);
        setIsSelect(removeItem);
    }

    return (
        <div>
            { !item && 
                <div>
                    ??????????????????!
                </div>
            }
            { item &&
            <AllBlock>
                <ListItemBlock>
                    <MaterialTable
                        columns={[
                            { title: 'Number', field: 'id', filtering: false },
                            { 
                                title: 'Name', 
                                field: 'name', 
                                filtering: false, 
                                cellStyle: {cursor: 'pointer' },
                            },
                            { title: 'Title', field: 'tagline', filtering: false },
                            {
                                title: 'Abv',
                                field: 'abv',
                                filtering: false
                            },
                            { 
                                title: 'Abv Filter',
                                field: '',
                                customFilterAndSearch: (term, rowData) => 
                                    term < rowData.abv
                                    // if(rowData.abv < 8) {
                                    //     console.log('8 ?????? : ' + rowData.name);                                    
                                    // }else if(rowData.abv < 12) {
                                    //     console.log('8 ~ 12 : ' + rowData.name);
                                    // }else {
                                    //     console.log('12 ?????? : ' + rowData.name);
                                    // }
                                ,
                                // lookup: {
                                //     1: '8 ??????',
                                //     2: '8-12',
                                //     3: '12 ??????'
                                // },
                            },
                        ]}
                        data= {item}
                        title="Beer List"
                        style={{color: '#bac8ff', fontWeight: 'bold'}}
                        options= {{
                            search: false,
                            paging: false,
                            filtering: true,
                            selection: true,
                        }}   
                        onRowClick={rowEvents.onClick}
                        // onSelectionChange = {(e, rows) => alert('choice : ' + rows.name)}
                        actions={[
                            {
                                tooltip: 'Add All Selected Item',
                                icon: 'add',
                                onClick: (evt, data) => {
                                    onAddButton(data);
                                }, 
                                
                            }
                        ]}
                    />
                    <Modal
                        open={isOpen} 
                        onClose={() => setIsOpen(false)} 
                        send={isSend}
                    >
                    </Modal>
                </ListItemBlock>
                <SelectListBlock>
                    <div className='basket'>
                        <h3>????????????</h3>
                        <ul>
                            {
                                isSelect && isSelect.length !== 0 ? isSelect.map((item, index) => {
                                    return (                                       
                                        <li key={index}>
                                            - {item.name}
                                            <button onClick={() => onRemoveButton(item)}>
                                                ??????
                                            </button>
                                        </li>                                        
                                    )
                                }) 
                                : 
                                <>
                                    <h4>??????????????? ??????????????????</h4>
                                    <h4>?????? ???????????? ?????? ??? ????????? ????????? ?????? +(add)????????? ???????????? ?????????</h4>
                                    <h4>abv ???????????? ??????????????? ????????? ???????????? ????????? ????????? ?????? ????????? ??? ???????????? ?????? abv??? ?????? item?????? ??????????????? ???????????? ??????????????????.</h4>
                                </>
                            }
                        </ul>
                    </div>
                </SelectListBlock>
            </AllBlock>
            }
        </div>
    )
}

export default BeerList;