import React, { useState } from 'react'
import api from '../../services/api'

export default function Login({ history }) {

    const [email, setEmail] = useState('')

    async function handleSubmit(event) {
        event.preventDefault()
        const { data } = await api.post('/sessions', { email })
        const { _id } = data
        localStorage.setItem('user', _id)
        history.push('/dashboard')
    }

    return (
        <>
            <p>Offer <strong>spots</strong> to coders and find <strong>talents</strong> for your business</p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Your best email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <button type="submit" className="btn">Enter</button>
            </form>
        </>
    )
}