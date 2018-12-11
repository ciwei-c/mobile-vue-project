import axios from "@/utils/axios"

export const getMapDatas = (data = {}) => {
    return axios("getMapDatas",data)
}
