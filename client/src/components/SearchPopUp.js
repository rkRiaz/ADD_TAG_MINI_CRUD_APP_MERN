import React, {useState, useEffect} from 'react'
import './SearchPopUp.css'
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Card, TextField } from '@material-ui/core';
import { popupAction } from '../store/actions/popupAction'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';


function SearchPopUp() {
    const [countries, setCountries] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [message, setMessage] = useState('')
    const { showPopup } = useSelector(state => state.popup);
    const dispatch = useDispatch();

    
    useEffect(() => {
        axios.get('http://localhost:8080/api/data/get-data')
        .then(res => {
            setCountries(res.data.countries)
        })
        .catch(e => {
            console.log(e)
        })
    }, [])

    const offPopUp = e => {
        e.preventDefault()
        dispatch(popupAction())
    }
    const addTag = tag => e => {
        e.preventDefault()
        axios.post(`http://localhost:8080/api/data/add-tag`, {tag})
        .then(res => {
            setMessage(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
    }

    if(countries === null) {
        return (
            <div className="">Loading</div>
        )
    } else {
        return (
            <Card className={showPopup ? "popup" : "popup popup__hide"}>
                <div onClick={offPopUp} className="popup__offLayout"></div>
                <div className="popup__search">
                    <div className="popup__searchTop">
                        <TextField onChange={e => setSearchTerm(e.target.value)} className="popup__searchInput" id="filled-basic" label="Seacrh Country" variant="filled"/>
                        <HighlightOffRoundedIcon onClick={offPopUp}/>
                    </div>
                    { message ? <Alert className="popup__alert" severity="info">{message}</Alert> : '' }
                    <div className="popup__searchContents">
                            {
                                countries
                                //this will return partial matched countries
                                .filter((val) => {
                                    if(searchTerm === "") {
                                        return val
                                    } else if(val.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                                        return val  
                                    }
                                })
                                //this will return first letter matched countries
                                // .filter((val) => {
                                //     if(searchTerm == "") {
                                //         return val
                                //     } else if(val.toLowerCase().charAt(0) == searchTerm) {
                                //         return val  
                                //     }
                                // })
                                .map((tag, index) => (
                                    <div onClick = {addTag(tag)} key = {index}  className="popup__searchContentsItem">
                                        <div className="popup__searchContentsItemName" key = {index}>{tag}</div>
                                        <div className=""><AddCircleOutlineIcon/></div>
                                    </div>
                                ))
                            }
                    </div>
                </div>
        
            </Card>
        )
    }


}

export default SearchPopUp
