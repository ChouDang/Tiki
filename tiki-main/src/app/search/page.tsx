'use client';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
// import products from '@/data/products.json';
import { CardProduct } from '@/components/shared/CardProduct';
import { useRouter, useSearchParams } from 'next/navigation';
import useApiRestaurants from '@/apis/useApiRestaurants';
import { Spin } from 'antd';

const DetailSearchPage = () => {
  const searchParams = useSearchParams()
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
  const [loading, set_loading] = useState(false)

  useEffect(() => {
    if (id && !blockFetch.current && searchParams) {
      set_loading(true)
      getRestaurantsByIdCategory(id as string, pagi.page, 9999, (searchParams.get("query") || "") as string).then(i => {
        if (i?.data) {
          let idata: CustomRestaurant = i.data
          set_lstData((idata.data || []) as Restaurant[])
          set_pagi(prev => ({
            ...prev,
            total: i.data.totalCount
          }))
          set_loading(false)
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
      return maxLength.sort((a, b) => {
        let aIncludes = a.name.includes(searchParams.get("query") || "");
        let bIncludes = b.name.includes(searchParams.get("query") || "");

        if (aIncludes && !bIncludes) return -1; // a lên trước
        if (!aIncludes && bIncludes) return 1;  // b lên trước
        return 0; // Giữ nguyên vị trí nếu cả hai đều chứa hoặc không chứa
      });
    }
    return []
  }, [lstData])

  return (<Spin spinning={loading}>
    <div className='flex flex-row flex-wrap gap-2 mb-5' style={{ justifyContent: "center", minWidth: '100vw' }}>
      {products.map((product: any) => (
        <CardProduct
          className='w-[23%]'
          key={product.id}
          data={product}
        />
      ))}
    </div>
  </Spin>)
}


export default function Page() {
  return (
    <>
      <nav>
        <Suspense fallback={<></>}>
          <DetailSearchPage />
        </Suspense>
      </nav>
    </>
  );
}
