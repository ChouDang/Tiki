import { useCart } from '@/context/CartContext';
import { formatCurrency } from '@/utils';
import { TrashIcon } from '@heroicons/react/24/outline';
import { Checkbox, Input, InputNumber } from 'antd';
import Image from 'next/image';
import React, { useState } from 'react';

type PropsType = {
  product: any;
  dispatch: any;
};
export const ItemCart = ({ product, dispatch }: PropsType) => {

  console.log(product, "product")
  return (
    <div className='ml-2 flex mb-5'>
      <div className='flex w-[45%] w-max-[45%] flex-row items-center'>
        {/* <Checkbox /> */}
        <Image
          className='w-[80px] h-[80px] mx-3'
          src={product.img}
          alt='product'
          width={80}
          height={80}
          unoptimized
        />

        <div className='w-[51%]'>
          <div className='flex flex-row items-center gap-1'>
            <Image
              src='/chinh-hang.png'
              alt='chinh-hang'
              width={89}
              height={20}
              unoptimized
            />

            <Image
              src='/doi-y.png'
              alt='doi-y'
              width={89}
              height={20}
              unoptimized
            />
          </div>
          <span className='text-sm'>
            {product.name || ''}
          </span>
          <div className='flex flex-row items-center gap-1'>
            <Image
              src='/now.png'
              alt='now'
              width={32}
              height={16}
              unoptimized
            />
            <span className='text-xs'>Giao siêu tốc 2h</span>
          </div>
        </div>
      </div>
      <span className='w-[15%] w-max-[15%]  font-semibold flex items-center'>
        {formatCurrency('vi-VN', 'VND', product.price)}
        <sup>₫</sup>
      </span>
      <div className='w-[15%] w-max-[15%] flex items-center'>
        <div
          className='w-10 cursor-pointer hover:bg-gray-100 text-gray-500 text-2xl font-semibold h-8 flex items-center justify-center border rounded-md border-gray-200'
          onClick={() => {
            if (product.quantity > 1) {
              dispatch({
                type: "CHANGE_QUANTITY_CART",
                payload: { ...product, quantity: product.quantity - 1 }
              })
            }
          }}
        >
          -
        </div>
        <Input
          className='w-10 h-8 text-center'
          type='number'
          value={product.quantity}
        />

        <div
          className='w-10 cursor-pointer hover:bg-gray-100  text-gray-500 text-2xl font-semibold h-8 flex items-center justify-center border rounded-md border-gray-200'
          onClick={() => {
            dispatch({
              type: "CHANGE_QUANTITY_CART",
              payload: { ...product, quantity: product.quantity + 1 }
            })
          }}
        >
          +
        </div>
      </div>

      <span className='font-semibold text-red-500 w-[15%] w-max-[15%] flex items-center'>
        {formatCurrency('vi-VN', 'VND', product.price * product.quantity)}
        <sup>₫</sup>
      </span>
      <div className='text-gray-500 w-[10%] pr-5 flex justify-end items-center' onClick={() => {
        dispatch({
          type: "REMOVE_FROM_CART",
          payload: product
        })
      }}>
        <TrashIcon className='size-5' />
      </div>
    </div>
  );
};
