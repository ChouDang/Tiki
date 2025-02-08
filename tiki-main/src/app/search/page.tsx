'use client';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
// import products from '@/data/products.json';
import { CardProduct } from '@/components/shared/CardProduct';
import { useRouter, useSearchParams } from 'next/navigation';
import useApiCatory from '@/apis/useApiCatory';
import useApiRestaurants from '@/apis/useApiRestaurants';

export default function Page() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { getAllCategory } = useApiCatory()
  const { getRestaurantsByIdCategory } = useApiRestaurants()
  let id = 'all'


  const [select, set_select] = useState("")
  const [lstData, set_lstData] = useState<Restaurant[]>([])
  const [pagi, set_pagi] = useState({
      page: 1,
      size: 9,
      total: 0
  })
  const blockFetch = useRef(false)


  useEffect(() => {
    if (id && !blockFetch.current && searchParams) {
      getRestaurantsByIdCategory(id as string, pagi.page, 9999, (searchParams.get("query") || "") as string).then(i => {
        if (i?.data) {
          let idata: CustomRestaurant = i.data
          set_lstData((idata.data || []) as Restaurant[])
          set_pagi(prev => ({
            ...prev,
            total: i.data.totalCount
          }))
        }
      })
      set_select(id as string)
    }
  }, [id, searchParams])

  let products = useMemo(() => {
    if (lstData.length) {
      let maxLength = lstData.flatMap((data, index) =>
        data.foods.map(food => ({
          ...food,
          madeIn: data.name,
          idStore: data.id
        }))
      )
      return maxLength
    }
    return []
  }, [lstData, pagi.size])

  return (
    <>
      <nav>
        <Suspense fallback={<>Loading</>}>
          <div className='flex flex-row flex-wrap gap-2 mb-5'>
            {products.map((product: any) => (
              <CardProduct
                className='w-[23%]'
                key={product.id}
                data={product}
              />
            ))}
          </div>
        </Suspense>
      </nav>
    </>
  );
}
