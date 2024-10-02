import { Endpoints } from '@/constant/endpoints'
import axios from 'axios'

export const LoginUser = async (data) => {
  try {
    const res = await axios.post(Endpoints.login, data)
    console.log(res, 'res')
    if (res.status === 200) {
      return { data: res.data }
    }
    return { error: 'Something Went Wrong!!' }
  } catch (error) {
    console.log(error)
    return { error: error?.response?.data?.message }
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await axios.post(Endpoints.register, data)
    console.log(res, 'res')
    if (res.status === 201) {
      return { data: res.data }
    }
    return { error: 'Something Went Wrong!!' }
  } catch (error) {
    console.log(error)
    return { error: error?.response?.data?.message }
  }
}
