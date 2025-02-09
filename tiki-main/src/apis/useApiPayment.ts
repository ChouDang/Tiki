import axiosInstance from "@/apis/axiosConfig";
import { notification } from "antd";

const servicePath = "/payment"

const useApiPayment = () => {

  const onInitOrderFood = async (data: any) => {
    try {
      const resp = await axiosInstance.post(servicePath, data)
      if (resp) {
        return resp
      }
    } catch (error) {
      notification.open({
        message: `${error}`,
      });
    }
  }

  const onGetOrder = async (data: any) => {
    try {
      const resp = await axiosInstance.get(servicePath + "/orderDetail", {
        params: {
          id: data
        }
      })
      if (resp) {
        return resp
      }
    } catch (error) {
      notification.open({
        message: `${error}`,
      });
    }
  }

  return {
    onInitOrderFood,
    onGetOrder
  }
}

export default useApiPayment