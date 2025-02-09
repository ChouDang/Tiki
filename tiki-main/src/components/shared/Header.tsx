'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import { Input as InputSearch } from './Input';
import {
  MagnifyingGlassIcon,
  HomeIcon,
  ShoppingCartIcon,
  CheckBadgeIcon,
  CubeIcon,
  TruckIcon,
  TagIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/20/solid';
import { MapPinIcon, FaceSmileIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Badge, Button, Input, Modal, Space } from 'antd';
import { useUser } from '@/context/UserContext';
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useCart } from '@/context/CartContext';

export const Header = () => {

  const { login, signUp, logout, state } = useUser()
  const { state: cart } = useCart()
  const { isLoggedIn } = state
  const [error, set_error] = React.useState(false)
  const [formLogin, set_formLogin] = React.useState({
    email: "",
    password: ""
  });
  const [isLogin, set_isLogin] = useState(true)
  const [status, set_status] = useState<null | boolean>(null)
  const [form, set_form] = useState<Omit<User, 'id' | 'orders'>>({
    firstname: "",
    lastname: "",
    username: "",
    phonenumber: "",
    email: "",
    password: "",
  })


  const router = useRouter();
  const refSearch = useRef<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeSearch = (e: any) => {
    console.log(refSearch);

    if (refSearch.current) refSearch.current.value = e.target.value;
  };

  const handleSearch = () => {
    router.push(`/search?query=${refSearch.current.value}`);
  };

  // const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
  //     let qr = `?query=${encodeURIComponent(value)}`
  //     if (pathName?.includes("category")) {
  //         let id = pathName.split("category/")[1]
  //         router.replace(`/category/` + id + "/" + qr);
  //     } else {
  //         router.push(`/category/all` + qr);
  //     }
  // };

  const handleChange = (value: string, key: string) => {
    set_status(null)
    set_form(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleRes = () => {
    signUp(form).then((res: any) => {
      if (res) {
        set_status(true)
      } else {
        set_status(false)
      }
    })
  }

  function handleLogin() {
    function actCheckVal(_email: string, _password: string) {
      if (Boolean(_email.trim()) && Boolean(_password.trim())) {
        login(_email, _password).then((res:any) => {
          if (res) {
            setIsModalOpen(false)
          }
        })
      } else {
        set_error(true)
      }
    }
    actCheckVal(formLogin.email, formLogin.password)
  }


  return (
    <div className='bg-white border-b border-gray-200'>
      <nav className='flex flex-row items-center h-fit gap-1 justify-center pt-3 border-b pb-2.5'>
        <Link
          href='/'
          className='w-fit flex items-center justify-center flex-col mr-10'
        >
          <Image
            src='/logo.png'
            alt='Tiki'
            width={96}
            height={40}
            className=''
            unoptimized
          />
          <span className='text-[#053B8E] font-semibold text-sm mt-1'>
            Tốt & Nhanh
          </span>
        </Link>
        <div className='flex flex-col'>
          <div className='flex flex-row'>
            <InputSearch
              ref={refSearch}
              onKeyUp={(event) => {
                if (event.key === 'Enter') {
                  handleSearch();
                }
              }}
              button={
                <button
                  onClick={() => {
                    handleSearch();
                  }}
                >
                  Tìm kiếm
                </button>
              }
              // className='w-[58rem]'
              style={{
                width: 900
              }}
              icon={<MagnifyingGlassIcon className='size-5 text-gray-500' />}
              placeholder='Bạn tìm kiếm gì hôm nay?'
            />

            <div className='flex flex-row gap-2 self-start'>
              <Link
                href='/'
                className='flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33] font-medium w-fit p-2 rounded text-sm items-center justify-center'
              >
                <HomeIcon className='size-6 text-[#0560D9]' />
                <span className='text-blue-500'>Trang chủ</span>
              </Link>

              {isLoggedIn
                ? <>
                  <Space>
                    <div
                      className='relative flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33]  w-fit p-2 rounded text-sm items-center justify-center'
                    >
                      {state?.user?.username}
                    </div>
                    <div
                      onClick={() => {
                        logout()
                      }}
                      className='relative flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33]  w-fit p-2 rounded text-sm items-center justify-center '
                    >
                      Thoát
                    </div>
                  </Space>
                </>
                : <div
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                  className='relative flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33]  w-fit p-2 rounded text-sm items-center justify-center '
                >
                  <FaceSmileIcon className='size-6 text-gray-500' />
                  <span className='text-gray-500'>Tài khoản</span>
                </div>
              }
              <Link
                href='/cart'
                className='ml-10 relative flex flex-row gap-1 cursor-pointer hover:bg-[#0a68ff33] w-fit p-2 rounded text-sm items-center justify-center before:w-[1px] before:h-3/6 before:absolute before:bg-[#BFC4CC] before:-left-5'
              >
                <Badge count={(cart && cart?.items?.length) || 0}>
                  <ShoppingCartIcon className='size-6 text-[#0560D9]' />
                </Badge>
              </Link>
            </div>
          </div>

          <div className='flex flex-row justify-between mt-2.5'>
            <div className='flex gap-3'>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                Điện gia dụng
              </a>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                xe cộ
              </a>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                khỏe đẹp
              </a>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                nhà cửa
              </a>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                sách
              </a>
              <a className='text-gray-500 lowercase cursor-pointer text-sm'>
                thể thao
              </a>
            </div>
            <div className='text-sm flex '>
              <MapPinIcon className='size-5 text-gray-500' />
              <span className='text-gray-500 mr-1'>Giao đến:</span>
              <span className='color-black underline'>
                Q. Bình Tân, P. An Lạc A, Tp. Hồ Chí Minh
              </span>
            </div>
          </div>
          <div></div>
        </div>
      </nav>
      <div className='flex flex-row gap-5 mt-2.5 items-center justify-start ml-56 mb-2.5'>
        <span className='font-semibold text-sm text-[#033A8C]'>Cam kết</span>
        <div className='flex flex-row gap-1  items-center cursor-pointer'>
          <CheckBadgeIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>100% hàng thật</span>
        </div>
        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <CurrencyDollarIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>Hoàn 200% nếu hàng giả</span>
        </div>

        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <CubeIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>30 ngày đổi trả</span>
        </div>

        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <TruckIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>Giao nhanh 2h</span>
        </div>

        <div className='text-gray-200'>|</div>
        <div className='flex flex-row gap-1 items-center cursor-pointer'>
          <TagIcon className='size-5 text-[#0560D9]' />
          <span className='text-xs'>Giá siêu rẻ</span>
        </div>
        <div className='trigger-open-modal hidden' onClick={() => setIsModalOpen(true)}></div>
        <Modal
          closable={false}
          title={null}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          className=''
          width={950}
        >
          <div className='w-full flex flex-row relative '>
            <div
              onClick={() => {
                setIsModalOpen(false);
              }}
              className='w-10 h-10 bg-white rounded-full flex justify-center absolute items-center -top-3 -right-3 cursor-pointer font-bold'
            >
              X
            </div>

            <div className='p-16 flex flex-col mb-5 w-[70%]'>
              <div className='flex flex-col gap-5 mb-20'>
                <span className='text-3xl font-semibold'>Xin chào,</span>
                {
                  isLogin
                    ? <span onClick={() => {
                      set_isLogin(false)
                      set_formLogin({
                        email: "",
                        password: "",
                      })
                    }} className='text-sm '>Đăng nhập hoặc <strong style={{
                      color: "blue"
                    }}>Tạo tài khoản</strong>
                    </span>
                    :
                    <span onClick={() => {
                      set_isLogin(true)
                      set_form({
                        firstname: "",
                        lastname: "",
                        username: "",
                        phonenumber: "",
                        email: "",
                        password: "",
                      })
                    }} className='text-sm '>Tạo tài khoản hoặc <strong style={{
                      color: "blue"
                    }}>Đăng nhập</strong>
                    </span>
                }

                {
                  isLogin
                    ? <>
                      <div className="flex flex-col w-full gap-3">
                        <Input placeholder="Email/Số điện thoại/Tên đăng nhập" className="h-[40px]"
                          value={formLogin?.email ?? ""}
                          onChange={(e) => {
                            set_error(false)
                            set_formLogin(prev => ({
                              ...prev,
                              email: e.target.value
                            }))
                          }} />
                      </div>
                      <div className="flex flex-col w-full mt-3">
                        <Input.Password
                          placeholder="Mật khẩu"
                          className="h-[40px]"
                          value={formLogin?.password ?? ""}
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                          onChange={(e) => {
                            set_error(false)
                            set_formLogin(prev => ({
                              ...prev,
                              password: e.target.value
                            }))
                          }}
                        />
                      </div>
                    </>
                    :
                    <>
                      <div className="flex flex-row w-full gap-2">
                        <Input value={form.firstname} placeholder="Họ " className="h-[40px]" onChange={e => handleChange(e.target.value || "", "firstname")} />
                        <Input value={form.lastname} placeholder="Tên" className="h-[40px]" onChange={e => handleChange(e.target.value || "", "lastname")} />
                      </div>
                      <div className="flex flex-col w-full gap-3">
                        <Input value={form.username} placeholder="Tên đăng nhập" className="h-[40px]" onChange={e => handleChange(e.target.value || "", "username")} />
                      </div>
                      <div className="flex flex-col w-full gap-3">
                        <Input value={form.phonenumber} placeholder="Số điện thoại" className="h-[40px]" onChange={e => handleChange(e.target.value || "", "phonenumber")} />
                      </div>
                      <div className="flex flex-col w-full gap-3">
                        <Input value={form.email} placeholder="Email" className="h-[40px]" onChange={e => handleChange(e.target.value || "", "email")} />
                      </div>
                      <div className="flex flex-col w-full ">
                        <Input.Password
                          placeholder="Mật khẩu"
                          className="h-[40px]"
                          iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                          value={form.password}
                          onChange={e => handleChange(e.target.value || "", "password")}
                        />
                      </div>

                    </>
                }


                <div className=' cursor-pointer bg-red-500 p-2 text-white rounded-md flex items-center justify-center text-xl'
                  onClick={() => {
                    isLogin ? handleLogin() : handleRes()
                  }}
                >
                  Tiếp Tục
                </div>
                {
                  isLogin
                    ? <div className="flex flex-col w-full mt-3">
                      {error && <p>Tài Khoảng hoặc Mật Khẩu không đúng</p>}
                    </div>
                    : <div className="flex flex-col w-full ">
                      {status == null ? <></> : status
                        ? "Đăng ký thành công hãy đi đến đăng nhập" : "Đặng ký thất bại"}
                    </div>
                }
              </div>
              <div className='self-center w-full flex flex-col gap-3'>
                <span className='w-[85%] mt-5 text-xs text-gray-500'>
                  Bằng việc tiếp tục, bạn đã đọc và đồng ý với điều khoản sử
                  dụng và Chính sách bảo mật thông tin cá nhân của Tiki
                </span>
              </div>
            </div>
            <div className='bg-sky-100 w-[30%] rounded-lg'>
              <div className='flex flex-col justify-center items-center h-full'>
                <Image
                  className='h-fit mb-7 '
                  src='/login.png'
                  width={200}
                  height={100}
                  alt='login'
                  unoptimized
                />
                <div className='text-blue-600 flex flex-col gap-2 justify-center items-center'>
                  <span className='text-lg font-semibold'>
                    Mua sắm tại Tiki
                  </span>
                  <span className='text-sm font-medium'>
                    Siêu ưu đãi mỗi ngày
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};
