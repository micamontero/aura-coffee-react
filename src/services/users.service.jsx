import axios from "axios"

const URL_BASE = "https://6ab4a2ac24ee9d3caa1b97be.mockapi.io"

export async function getUsers() {
    const response = await axios.get(`${URL_BASE}/users`)
    return response.data
}

export async function createUser(data) {
    const response = await axios.post(`${URL_BASE}/users`, data)
    return response.data
}

export async function updateUser(id, data) {
    const response = await axios.put(`${URL_BASE}/users/${id}`, data)
    return response.data
}

export async function deleteUser(id) {
    await axios.delete(`${URL_BASE}/users/${id}`)
}