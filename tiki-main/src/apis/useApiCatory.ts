import axiosInstance from "@/apis/axiosConfig";
import { notification } from "antd";

const servicePath = "/categories"

const useApiCatory = () => {
  const getAllCategory = async () => {
    try {
      const resp = await axiosInstance.get<Category[]>(servicePath)
      if (resp) {
        localStorage.setItem('allCategory', JSON.stringify(resp.data))
        return resp
      }
    } catch (error) {
      notification.open({
        message: `${error}`,
      });
    }
  }

  return {
    getAllCategory
  }
}

export default useApiCatory