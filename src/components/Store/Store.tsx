'use client'
//**React */
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

//**Cookies */
import Cookies from 'js-cookie'

//**Service */
import { getStore } from '@/services/storeInformation.service'

//**Types */
import { StorePartner } from '@/types/storeInformation.type'

//**Fns */
import { format } from 'date-fns'

interface UserInfo {
    id: string
}

const Store = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [store, setStore] = useState<StorePartner | null>(null)

    // Lấy userInfo từ cookie
    useEffect(() => {
        const userInfoCookie = Cookies.get('userInfo')
        if (userInfoCookie) {
            try {
                const parsedUser: UserInfo = JSON.parse(userInfoCookie)
                setUserInfo(parsedUser)
            } catch (error) {
                console.error('Không thể parse userInfo từ cookie:', error)
            }
        }
    }, [])

    // Gọi API lấy thông tin store khi đã có userInfo
    useEffect(() => {
        const fetchStore = async () => {
            if (!userInfo?.id) return
            try {
                debugger;
                const res = await getStore(userInfo.id)
                setStore(res)
            } catch (error) {
                console.error('Failed to fetch store:', error)
            }
        }

        fetchStore()
    }, [userInfo])

    // Chưa có dữ liệu store thì không render
    if (!store) return null

    return (
        <div className='py-18 pt-[12vh] md:pt-[8vh] bg-[#F4F9FF]'>
            <div className='lg:w-[75%] md:w-[90%] w-[90%] mx-auto'>
                <div className='bg-[#F6F6F7] px-1 py-1 mt-10'>
                    <button>Trở về</button>
                </div>
                <div
                    data-aos="fade-right"
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-10'>
                    <div className='bg-white shadow-md rounded-md px-4 py-4 relative'>

                        {/* Background store */}
                        <Image
                            className='rounded-md w-full h-40 object-cover'
                            src="/images/store/background-profile.jpg"
                            alt="background"
                            width={800}
                            height={160}
                        />

                        {/* Avatar*/}
                        <div className='absolute left-1/2 top-45 transform -translate-x-1/2 -translate-y-1/2'>
                            <Image
                                className='rounded-full border-2 border-white shadow-md'
                                src="/images/comon/no-avt.png"
                                alt="avatar"
                                width={90}
                                height={90}
                            />
                        </div>

                        {/* Thông tin cửa hàng */}
                        <div className='mt-16 text-center'>
                            <p className='font-medium text-2xl mb-2'>{store.tenGianHang}</p>
                            <div className='flex items-center space-x-2 justify-center'>
                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                <p>Hoạt động</p>
                            </div>
                            <p className='text-blue-700 text-md'>
                                (Ngày tham gia: {format(new Date(store.created_at), 'dd/MM/yyyy')})
                            </p>
                        </div>

                        <div className='flex items-center justify-between mt-5'>
                            <div className='flex space-x-2'>
                                <span className='font-medium'>Mã gian hàng: </span>
                                <span className='text-blue-700'>{store.maGianHang}</span>
                            </div>
                            <div className='bg-[#CAF1D8] px-20 py-1 rounded-full text-[#178A42]'>
                                {store.loaiGianHang === 1 ? 'Cá nhân' : 'Doanh nghiệp'}
                            </div>
                        </div>

                        <div className='bg-[#E0F2FE] rounded-md p-4 mt-10'>
                            <div className='flex items-center gap-3'>
                                <Image
                                    src="/images/order-service/map.svg"
                                    alt="hero"
                                    width={25}
                                    height={25}
                                />
                                <p className='text-[13px]'>
                                    <span className='font-medium'>Địa điểm: </span>
                                    <span>{store.diaChi + ', ' + store.idPhuongXa.ten + ', ' + store.idQuanHuyen.ten + ', ' + store.idTinhTp.ten}</span>
                                </p>
                            </div>
                            <div className='flex items-center gap-3 mt-3'>
                                <Image
                                    src="/images/order-service/Calendar.svg"
                                    alt="hero"
                                    width={25}
                                    height={25}
                                />
                                {/* <p className='text-[13px]'>
                                    <span className='font-medium'>Ngày giờ làm việc: </span>
                                    <span>{format(new Date(order.thoiGianBatDau), 'HH:mm - dd/MM/yyyy')}</span>
                                </p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Store
