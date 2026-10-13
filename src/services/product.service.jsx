import axios from "axios"

const URL_BASE = "https://6ab4a2ac24ee9d3caa1b97be.mockapi.io"

export async function getProducts() {
    const response = await axios.get(`${URL_BASE}/products`)
    return response.data
}

export async function getProductById(id) {
    const response = await axios.get(`${URL_BASE}/products/${id}`)
    return response.data
}

export async function createProduct(data) {
    const response = await axios.post(`${URL_BASE}/products`, data)
    return response.data
}

export async function updateProduct(id, data) {
    const response = await axios.put(`${URL_BASE}/products/${id}`, data)
    return response.data
}

export async function deleteProduct(id) {
    await axios.delete(`${URL_BASE}/products/${id}`)
}