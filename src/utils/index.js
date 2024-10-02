export const checkToken = () => {
  if (localStorage.getItem('token')) {
    return true
  }
  return false
}

export const setLocalStorage = (key, data, isJson = true) => {
  if (isJson) return localStorage.setItem(key, JSON.stringify(data))
  return localStorage.setItem(key, data)
}

export const getLocalStorageData = (key, isJson = true) => {
  const item = localStorage.getItem(key)
  if (item) {
    if (isJson) return JSON.parse(item)
    return item
  }
  return null
}

export const clearLocalStorage = () => {
  localStorage.clear()
}
