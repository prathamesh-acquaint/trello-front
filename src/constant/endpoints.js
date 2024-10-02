const baseURL = import.meta.env.VITE_BASE_URL

export const Endpoints = {
  login: baseURL + 'users/login',
  register: baseURL + 'users/register',
  boardList: baseURL + 'board/list',
  addBoard: baseURL + 'board/create',
  list: {
    allLists: baseURL + 'boardList/list',
    create: baseURL + 'boardList/create',
    edit: baseURL + 'boardList/update'
  },
  card: {
    create: baseURL + 'cards/create',
    getCardsByListId: baseURL + 'cards/byList',
    getCardsByBoardId: baseURL + 'cards/byBoard',
    updateCard: baseURL + 'cards/update'
  }
}
