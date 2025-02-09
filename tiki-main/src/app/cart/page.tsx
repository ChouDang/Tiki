'use client';
import { Checkbox, InputNumber, message, notification, Tooltip } from 'antd';
import Image from 'next/image';
import {
  TrashIcon,
  InformationCircleIcon,
  TicketIcon,
} from '@heroicons/react/24/outline';

import cart from '@/data/cart.json';
import { ItemCart } from '@/components/cart/ItemCart';
import { formatCurrency } from '@/utils';
import { Metadata } from 'next';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useUser } from '@/context/UserContext';
import useApiRestaurants from '@/apis/useApiRestaurants';
import useApiPayment from '@/apis/useApiPayment';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { state: user, } = useUser()
  const { state: { items }, dispatch } = useCart()
  const { onInitOrderFood } = useApiPayment()


  const handleNavigate = async () => {
    if (!items?.length) return notification.open({
      message: `Hiện không có sản phẩm để thanh toán vui lòng chọn sản phẩm`,
    });
    if (user?.isLoggedIn) {
      const resp = await onInitOrderFood({
        userId: user.user?.id,
        items: items.map(i => ({
          foodId: i.id,
          quantity: i.quantity
        })),
        email: user.user?.email
      })
      if (resp) {
        router.push('/order/' + resp.data.order.id);
        setTimeout(() => {
          dispatch({ type: "CLEAR_CART" })
          localStorage.removeItem('Cart')
        }, 1000)
      }
    } else {
      let el: any = document.querySelector('.trigger-open-modal')
      if (el) el?.click()
    }
  };

  return (
    <div className='w-[75%] flex-row flex'>
      <div>
        <span className='uppercase font-medium text-xl'>Giỏ hàng</span>
        <div className='h-8 rounded-md flex flex-row  bg-white items-center text-sm w-[100%] min-w-[770px] ' >
          <div className='ml-2 w-[45%] max-w-[45%] flex items-center gap-3'>
            {/* <Checkbox />
            <span className='text-sm'>Tất cả sản phẩm </span> */}
          </div>
          <span className='text-gray-500 w-[15%]'> Đơn giá</span>
          <span className='text-gray-500 w-[15%]'>Số lượng</span>
          <span className='text-gray-500 w-[15%]'>Thành tiền</span>
          <span className='text-gray-500 w-[10%] pr-5 flex justify-end'
            onClick={() => {
              dispatch({
                type: 'CLEAR_CART'
              })
            }}
          >
            <TrashIcon className='size-5' />
          </span>
        </div>
        <div className='w-full flex flex-col bg-white mt-2 pt-5 rounded-md mb-5'>
          {items.length ? items.map((product: any) => (
            <ItemCart product={product} dispatch={dispatch} />
          )) : <></>}
        </div>
      </div>
      <div className='w-[25%] mt-7 ml-5'>
        <div className='bg-white rounded-md p-4'>


          {user?.isLoggedIn ? <>
            <div className='flex justify-between'>
              <span className='text-gray-500'>Giao tới</span>
              <span className='text-blue-500 text-sm'>Thay đổi</span>
            </div>
            <span className='text-sm font-semibold'>
              {(user?.user?.firstname + " " + user?.user?.lastname) || ""}
              <span className='text-gray-200 inline-block px-1'>|</span>{' '}
              {user.user?.phonenumber}
            </span>
            <div>
              <span className='bg-gray-50 p-1 rounded-sm text-xs font-semibold text-green-500 mr-2'>
                Nhà
              </span>
              <span className='text-gray-500 text-sm'>
                13 Đường số 14, Phường An Lạc A, Quận Bình Tân, Hồ Chí Minh
              </span>
            </div>
          </> : <>
            <span className='text-sm font-semibold'>
              Vui lòng đăng nhập để thanh toán
            </span>
          </>

          }
        </div>
        <div className='bg-white mt-3 p-4 rounded-md'>
          <div className='flex flex-row justify-between items-center'>
            <span className='text-xs font-medium'>Tiki Khuyến Mãi </span>
            <div className='text-gray-500 flex flex-row items-center gap-1'>
              <span className='text-sm'>Có thể chọn 2</span>
              <Tooltip
                placement='bottom'
                title={
                  'Áp dụng tối đa 1 Mã giảm giá Sản Phẩm và 1 Mã Vận Chuyển'
                }
              >
                <InformationCircleIcon className='size-4 cursor-pointer' />
              </Tooltip>
            </div>
          </div>
          <div className='relative'>
            <Image
              src='/coupon.svg'
              unoptimized
              className='mt-3 relative'
              width={286}
              height={60}
              alt='coupon'
            />
            <div className='absolute top-1/2 -translate-y-1/2 flex flex-row items-center'>
              <Image
                src='/tiki.png'
                unoptimized
                className='ml-1.5 rounded-lg'
                width={44}
                height={44}
                alt='coupon'
              />
              <div className='text-xs font-medium ml-4 '>Giảm 10%</div>
              {/* <div className='rounded-md text-white bg-blue-500 text-xs p-1 ml-16 px-4'>
                Bỏ Chọn
              </div> */}
            </div>
          </div>
          <div>
            <div className='text-blue-500 mt-5 flex flex-row items-center gap-2'>
              <TicketIcon className='size-5 font-semibold' />
              <span className='text-xs'>Chọn hoặc nhập khuyến mãi khác</span>
            </div>
          </div>
        </div>
        <div className='bg-white p-4'>
          <div className='flex flex-row justify-between'>
            <span className='text-gray-700 text-sm'>Tạm tính</span>
            <span className='text-sm'>
              {items?.length ?
                formatCurrency('vi-VN', 'VND', items.reduce((total: number, item) => {
                  return total += item.price * item.quantity
                }, 0))
                : 0}
              <sup>₫</sup>
            </span>
          </div>
          <div className='flex flex-row justify-between mt-2'>
            <span className='text-gray-700 text-sm'>Giảm giá</span>
            <span className='text-sm'>
              -
              {items?.length ?
                formatCurrency('vi-VN', 'VND', items.reduce((total: number, item) => {
                  return total += item.price * item.quantity
                }, 0) * 10 / 100)
                : 0}
              <sup>₫</sup>
            </span>
          </div>
          <hr className='my-5' />
          <div className='flex flex-row justify-between mt-2'>
            <span className='text-gray-700 text-sm'>Tổng tiền</span>
            <div className='flex flex-col justify-start items-end'>
              <span className='text-red-600 text-2xl'>
                {items?.length ?
                  formatCurrency('vi-VN', 'VND', items.reduce((total: number, item) => {
                    return total += item.price * item.quantity
                  }, 0) * 90 / 100)
                  : 0}
                <sup>₫</sup>
              </span>
              <span className='text-xs text-gray-500'>
                (Đã bao gồm VAT nếu có)
              </span>
            </div>
          </div>
        </div>
        <button
          className='w-full bg-red-500 block mt-3 rounded-md text-white text-md py-3 text-center'
          onClick={handleNavigate}
        >
          Mua hàng
        </button>
      </div>
    </div>
  );
}
