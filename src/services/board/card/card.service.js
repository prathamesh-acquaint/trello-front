import { Endpoints } from '@/constant/endpoints'
import { httpService } from '@/services/http'

export const fetchCardsByListId = async (listId) => {
  try {
    const res = await httpService.get(`${Endpoints.card.getCardsByListId}/${listId}`)
    return { data: res?.data }
  } catch (error) {
    return { error: error?.message }
  }
}

export const fetchCardsByBoardId = async (boardId) => {
  try {
    const res = await httpService.get(`${Endpoints.card.getCardsByBoardId}/${boardId}`)
    return { data: res?.data }
  } catch (error) {
    return { error: error?.message }
  }
}

export const createCard = async (data) => {
  try {
    const res = await httpService.post(Endpoints.card.create, data)
    return { data: res?.data }
  } catch (error) {
    return { error: error?.message }
  }
}

export const updateCard = async (cardId, data) => {
  try {
    const res = await httpService.put(`${Endpoints.card.updateCard}/${cardId}`, data)
    return { data: res?.data }
  } catch (error) {
    return { error: error?.message }
  }
}
