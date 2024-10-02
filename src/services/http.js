import axios from 'axios'

// Create an instance of axios with default configurations
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000, // Set a timeout for requests
  headers: {
    'Content-Type': 'application/json'
  }
})

// Define your HTTP service methods
export const httpService = {
  get: async (url, config) => {
    try {
      const response = await http.get(url, addAuthorizationHeader(config))
      return handleResponse(response)
    } catch (error) {
      throw handleRequestError(error)
    }
  },

  post: async (url, data, config) => {
    try {
      const response = await http.post(url, data, addAuthorizationHeader(config))
      return handleResponse(response)
    } catch (error) {
      throw handleRequestError(error)
    }
  },

  put: async (url, data, config) => {
    try {
      const response = await http.put(url, data, addAuthorizationHeader(config))
      return handleResponse(response)
    } catch (error) {
      throw handleRequestError(error)
    }
  }
}

// Add the authorization header to the request config if a token is provided
const addAuthorizationHeader = (config) => {
  const token = localStorage.getItem('token')

  if (token) {
    return {
      ...config,
      headers: {
        ...config?.headers,
        Authorization: `Bearer ${token}`
      }
    }
  }

  return config || {}
}

// Handle the response, including checking for a 401 status and redirecting to the login page
const handleResponse = (response) => {
  if (response.status === 401) {
    redirectToLoginPage()
  }

  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText
  }
}

// Redirect to the login page
const redirectToLoginPage = () => {
  localStorage.clear()
  window.location.pathname = '/login'
}

// Handle Axios errors and format them into a consistent structure
const handleRequestError = (error) => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 401) {
      redirectToLoginPage()
    }
    return {
      response: error.response?.data
    }
  } else {
    throw error
  }
}
