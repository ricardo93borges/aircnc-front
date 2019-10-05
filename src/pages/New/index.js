import React, { useState, useMemo } from 'react'
import api from '../../services/api'
import camera from '../../assets/camera.svg'

import './styles.css'

export default function New({ history }) {

    const [thumbnail, setThumbnail] = useState(null)
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleSubmit(event) {
        event.preventDefault()
        const user_id = localStorage.getItem('user')

        const formaData = new FormData()
        formaData.append('thumbnail', thumbnail)
        formaData.append('company', company)
        formaData.append('techs', techs)
        formaData.append('price', price)

        await api.post('/spots', formaData, { headers: { user_id } })

        history.push('/dashboard')
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label
                    id='thumbnail'
                    className={thumbnail ? 'has-thumbnail' : ''}
                    style={{ backgroundImage: `url(${preview})` }}>
                    <input type='file' onChange={event => setThumbnail(event.target.files[0])} />
                    <img src={camera} alt="Select img" />
                </label>

                <label htmlFor="company">Company</label>
                <input
                    type="text"
                    id='company'
                    placeholder='Your amazing company'
                    value={company}
                    onChange={event => setCompany(event.target.value)} />

                <label htmlFor="company">Technologies <span>(Separated by comma)</span></label>
                <input
                    type="text"
                    id='techs'
                    placeholder='What technologies is used?'
                    value={techs}
                    onChange={event => setTechs(event.target.value)} />
                <label htmlFor="company">Price</label>
                <input
                    type="text"
                    id='techs'
                    placeholder='Price per day'
                    value={price}
                    onChange={event => setPrice(event.target.value)} />

                <button className="btn">Save</button>
            </form>
        </>
    )
}