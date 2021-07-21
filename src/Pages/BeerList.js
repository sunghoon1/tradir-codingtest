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
                    로딩중입니다!
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
                                    //     console.log('8 미만 : ' + rowData.name);                                    
                                    // }else if(rowData.abv < 12) {
                                    //     console.log('8 ~ 12 : ' + rowData.name);
                                    // }else {
                                    //     console.log('12 초과 : ' + rowData.name);
                                    // }
                                ,
                                // lookup: {
                                //     1: '8 미만',
                                //     2: '8-12',
                                //     3: '12 초과'
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
                        <h3>장바구니</h3>
                        <ul>
                            {
                                isSelect && isSelect.length !== 0 ? isSelect.map((item, index) => {
                                    return (                                       
                                        <li key={index}>
                                            - {item.name}
                                            <button onClick={() => onRemoveButton(item)}>
                                                삭제
                                            </button>
                                        </li>                                        
                                    )
                                }) 
                                : 
                                <>
                                    <h4>장바구니를 추가해보세요</h4>
                                    <h4>왼쪽 체크박스 선택 후 테이블 오른쪽 상단 +(add)버튼을 누르시면 됩니다</h4>
                                    <h4>abv 범위별로 필터링하는 부분에 어려움이 있어서 필터에 숫자 입력시 그 숫자보다 높은 abv를 가진 item들만 필터링되게 대체하여 코딩했습니다.</h4>
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