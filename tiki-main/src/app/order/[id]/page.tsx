'use client';
import useApiPayment from '@/apis/useApiPayment';
import useApiRestaurants from '@/apis/useApiRestaurants';
import { Dot } from '@/components/shared/Dot';
import { useUser } from '@/context/UserContext';
import { Timeline } from 'antd';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const mapToFoodModel = (data: any) => {
  return data.order_food.map((orderItem: any) => {
    const { foods, quantity } = orderItem;
    return {
      id: foods.id,
      name: foods.name,
      description: foods.description,
      price: parseInt(foods.price),
      img: foods.img,
      stock: foods.stock,
      restaurant_id: foods.restaurant_id,
      category_id: foods.category_id,
      quantity: quantity,
      categories: {
        id: foods.category_id,
        name: ""
      },
      order_food: []
    };
  }) as any;
};

function formatVietnameseDateTime(isoDate: any) {
  // Chuyển đổi sang đối tượng Date
  const date = new Date(isoDate);
  // Định dạng ngày & giờ theo múi giờ Việt Nam (GMT+7)
  const options = {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Ho_Chi_Minh"
  };

  const formatter = new Intl.DateTimeFormat("vi-VN", options as any);

  // Lấy kết quả theo định dạng
  let formattedDateTime = formatter.format(date);

  // Chuẩn hóa kết quả: "Thứ bảy, 09/02, 02:50" -> "Thứ 7, 09/02 - 02:50"
  formattedDateTime = formattedDateTime.replace("Thứ bảy", "Thứ 7 -")
    .replace("Thứ hai", "Thứ 2 -")
    .replace("Thứ ba", "Thứ 3 -")
    .replace("Thứ tư", "Thứ 4 -")
    .replace("Thứ năm", "Thứ 5 -")
    .replace("Thứ sáu", "Thứ 6 -")
    .replace("Chủ nhật", "CN -")
    .replace(",", " -");

  return formattedDateTime;
}


const RenderItem = ({
  product,
  lstRes = []
}: {
  product: any,
  lstRes: Restaurant[]
}) => {
  const [res, set_res] = useState<any>({})

  useEffect(() => {
    if (lstRes && product) {
      set_res(lstRes.find(i => i.id == product.restaurant_id))
    }
  }, [lstRes, product])

  return <div className='flex flex-row items-center'>
    <Image
      src='/products/belt-1.png'
      // src={product.img}
      width={100}
      height={100}
      alt='pack'
    />
    <div className='flex flex-col ml-2'>
      <span className='font-semibold text-lg'>{product.name || ''}</span>
      <span className='text-gray-500 text-sm'>
        Bán và giao bởi {res && (res?.name || '')}
      </span>
      <span className='text-sm mt-2 text-gray-400'>
        Số lượng: {product.quantity | 0}
      </span>
    </div>
  </div>
}

export default function Page(props: any) {
  const { params: { id } } = props
  const { state: user } = useUser()
  const { getAllRestaurants } = useApiRestaurants()
  const { onGetOrder } = useApiPayment()
  const [lstRes, set_lstRes] = useState<Restaurant[]>([])
  const [lstFoodsOfRestaurent, set_lstFoodsOfRestaurent] = useState<any>([])
  const [foodsCart, set_foodsCart] = useState([])
  const [detail, set_detail] = useState<any>(null)

  useEffect(() => {
    Boolean(id) && onGetOrder(id).then(resp => {
      if (resp) {
        set_detail(resp.data)
        set_foodsCart(mapToFoodModel(resp.data))
      }
    })
    let checkLocalSt = localStorage.getItem("allRestaurants")
    checkLocalSt
      ? set_lstRes(JSON.parse(checkLocalSt) as Restaurant[])
      : getAllRestaurants().then(resp => {
        if (resp) {
          set_lstRes(resp.data)
        }
      })
  }, [id])

  let detailDate = detail && formatVietnameseDateTime(new Date(detail?.order_date)?.toISOString())
  const [giothu = null, ngay = null] = detailDate?.split(' - ') || []
  const parts = giothu ? giothu?.split(" ")?.filter((part:any) => part.trim() !== "") : []
  const gio = parts[0]; // "02:50"
  const thu = parts.slice(1).join(" "); // "Chủ Nhật"
 
  return (
    <div className=' w-[75%]'>
      <div className='text-lg font-semibold mb-4'>Đơn hàng</div>
      <div className='flex flex-row gap-4 w-full'>
        <div className='bg-white p-4 flex-col w-[70%] rounded-lg'>
          <div className='text-green-500 text-lg font-medium'>
            Giao vào {thu || ''}, {ngay || ''}
          </div>
          <div className='text-xs text-gray-500'>
            Được giao bởi giao hàng nhanh 247
          </div>
          <hr className='my-3' />
          <Timeline
            className='mt-10 w-[60%]'
            mode='left'
            items={[
              {
                label: <span className=''>{gio || ''}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,
                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg text-green-500 font-semibold'>
                      Đang giao hàng
                    </div>
                    <span className='text-sm text-gray-500'>
                      {gio || ''}, {thu || ''} {ngay}
                    </span>

                    <div className=''>Nhân viên đang giao hàng</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },
              {
                label: <span className=''>{gio || ''}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,
                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đơn hàng đã rời kho phân loại
                    </div>
                    <span className='text-sm text-gray-500'>
                      {gio || ''}, {thu || ''} {ngay}
                    </span>

                    <div>Đã tới kho Bình Tân</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },
              {
                label: <span className=''>{gio || ''}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đơn hàng đã rời kho phân loại
                    </div>
                    <span className='text-sm text-gray-500'>
                      {gio || ''}, {thu || ''} {ngay}
                    </span>
                    <div>Đã rời kho Tân tạo</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },

              {
                label: <span className=''>{gio || ''}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đơn hàng đã rời bưu cục
                    </div>
                    <span className='text-sm text-gray-500'>
                      {gio || ''}, {thu || ''} {ngay}
                    </span>
                    <div>Đã rời bưu cục</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },

              {
                label: <span className=''>{gio || ''}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đang được chuẩn bị
                    </div>
                    <span className='text-sm text-gray-500'>
                      {gio || ''}, {thu || ''} {ngay}
                    </span>
                    <div>Người gửi đang chuẩn bị hàng</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },

              {
                label: <span className=''>{gio || ''}</span>,
                dot: <Dot style={'bg-green-500 border-green-300'} />,

                children: (
                  <div className='w-[30rem]'>
                    <div className='text-lg font-semibold'>
                      Đặt hàng thành công
                    </div>
                    <span className='text-sm text-gray-500'>
                      {gio || ''}, {thu || ''} {ngay}
                    </span>
                    <div>Đơn hàng đã được đặt</div>
                    <hr className=' mt-5' />
                  </div>
                ),
              },
            ]}
          />
        </div>

        <div className='w-[30%] bg-white h-fit p-4 rounded-lg'>
          <div>
            <span className='mb-7 text-lg font-semibold block'>
              Kiện hàng gồm
            </span>
            <div className='flex flex-col gap-3'>
              {
                foodsCart.length && foodsCart.map((i) =>
                  <RenderItem
                    product={i}
                    lstRes={lstRes}
                  />)
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
