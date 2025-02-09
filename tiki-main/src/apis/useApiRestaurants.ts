import axiosInstance from "@/apis/axiosConfig"
import { notification } from "antd";

const servicePath = "/restaurants"

const useApiRestaurants = () => {


  const getAllRestaurants = async () => {
    try {
      const resp = await axiosInstance.get<Restaurant[]>(servicePath)
      if (resp) {
        localStorage.setItem('allRestaurants', JSON.stringify(resp.data))
        return resp
      }
    } catch (error) {
      notification.open({
        message: `${error}`,
      });
    }
  }

  const getRestaurantById = async (id: string) => {
    try {
      const resp = await axiosInstance.get<Restaurant>(servicePath + '/' + id)
      if (resp) {
        return resp
      }
    } catch (error) {
      notification.open({
        message: `${error}`,
      });
    }
  }

  const fetchQuery = async (id: string, page: number, size: number, query: string) => {
    const resp = await axiosInstance.get<CustomRestaurant>(servicePath + '/categories/foods', {
      params: {
        ...(id != "all" && id && { categorie: id }),
        page,
        size,
        query
      }
    })

    if (resp) {
      if (!query.length && id == 'all') {
        localStorage.setItem('query_cache', JSON.stringify(resp))
      }
      return resp
    }
  }

  const getRestaurantsByIdCategory = async (id: string, page: number, size: number, query: string) => {
    try {
      if (!query.length && id == 'all') {
        let checkCache = localStorage.getItem('query_cache')
        if (checkCache) {
          fetchQuery(id, page, size, query)
          return JSON.parse(checkCache)
        }
      }
      return await fetchQuery(id, page, size, query)
    } catch (error) {
      notification.open({
        message: `${error}`,
      });
    }
  }

  return {
    getAllRestaurants,
    getRestaurantById,
    getRestaurantsByIdCategory
  }
}

export default useApiRestaurants