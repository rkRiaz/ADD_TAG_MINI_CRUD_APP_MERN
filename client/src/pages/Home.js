import React, {useState, useEffect} from 'react';
import './Home.css'
import SearchPopUp from '../components/SearchPopUp'
import CancelIcon from '@material-ui/icons/Cancel';
import {TextField, Card, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { popupAction } from '../store/actions/popupAction'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Home() {
    const [countryTags, setCountryTags] = useState([])
    const [string, setString] = useState('')
    const [message, setMessage] = useState('')

    const { showPopup } = useSelector(state => state.popup);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('http://localhost:8080/api/data/get-data')
        .then(res => {
            setCountryTags(res.data.tags)
        })
        .catch(err => {
            console.log(err)
        })
    }, [message, showPopup])

    const search = e => {
        e.preventDefault()
        axios.get(`http://localhost:8080/api/data/search?q=${string}`)
        .then(res => {
            setMessage(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const addTagBtnAction = e => {
        e.preventDefault()
        dispatch(popupAction('open'))
    }
    const deleteTag = tag => e => {
        axios.put('http://localhost:8080/api/data/delete-tag', {tag})
        .then(res => {
            console.log(res.data.message)
            setMessage(res.data.message)
        })
        .catch(err => {
            console.log(err)
        })
    }

        return (
            <>
                <Card className="home">
                    <h3>Aspyrer Assignment</h3>
                    { message ? <Alert className="home__alert" severity="info">{message}</Alert> : '' }
                    <form onSubmit={search} className="home__form">
                        <TextField onChange={e => setString(e.target.value)} id="standard-basic" label="Write Your Text Here" />
                        <Button type="submit" variant="contained">Enter to find country from the text</Button>
                    </form>
                    <div className="home__countryTags">
                        {
                            countryTags.map((tag, index) => (
                                <div key={index} className="home__countryTagsTag">
                                    {tag}
                                    <div onClick={deleteTag(tag)} className="closeIcon"><CancelIcon /></div>
                                </div>
                            ))
                        }
                    </div>
                    <Button onClick={addTagBtnAction} variant="contained">Add Tag</Button>
                </Card>
    
                {/* this section will show when we click on the add-tag button */}
                <div className="home__searchPopUp">
                    <SearchPopUp/>
                </div>
            </>
        )
    }



export default Home;
