import axios from "axios"

const baseUrl = "http://localhost:3100/"

export const getData = async () => {
  return await axios.get(`${baseUrl}bookmarks`)
}