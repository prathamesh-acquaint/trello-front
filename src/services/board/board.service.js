import { Endpoints } from '@/constant/endpoints'
import { httpService } from '../http'

export const fetchBoards = async () => {
  try {
    const response = await httpService.get(Endpoints.boardList)
    return { data: response?.data?.data }
  } catch (error) {
    return { error: error.message }
  }
}

export const addBoard = async (data) => {
  try {
    const response = await httpService.post(Endpoints.addBoard, data)
    return { data: response?.data }
  } catch (error) {
    return { error: error.message }
  }
}

export const fetchBoardLists = async (boardId) => {
  try {
    const response = await httpService.get(`${Endpoints.list.allLists}/${boardId}`)
    return { data: response?.data }
  } catch (error) {
    return { error: error.message }
  }
}

export const addBoardList = async (data) => {
  try {
    const response = await httpService.post(Endpoints.list.create, data)
    return { data: response?.data }
  } catch (error) {
    return { error: error.message }
  }
}

export const editBoardList = async (listId, data) => {
  try {
    const response = await httpService.put(`${Endpoints.list.edit}/${listId}`, data)
    return { data: response?.data }
  } catch (error) {
    return { error: error.message }
  }
}
