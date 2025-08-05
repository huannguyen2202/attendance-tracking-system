import { getOrderService } from '@/services/orderService.service';
import React, { useEffect, useState } from 'react'
import { OrderServiceResponse } from '@/types/orderService.type';
import { PaginatedOrderServiceResponse } from '@/types/orderService.type';
import Image from 'next/image';
import { format } from 'date-fns';
import PaginationControl from '@/components/Comon/PaginationControl/PaginationControl';
import { ArrowRight } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton"

const OrderService = () => {
    const [orderServices, setOrderServices] = useState<OrderServiceResponse[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [limit] = useState<number>(10); // mặc định limit 10
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrderServices = async () => {
            try {
                setIsLoading(true);
                const res: PaginatedOrderServiceResponse = await getOrderService(page, limit);
                setOrderServices(res.data);
                setTotalPages(res.totalPages);
            } catch (error) {
                console.error("Failed to fetch order services:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrderServices();
    }, [page, limit]);

    return (
        <div className='bg-[#FFFFFF] pt-10 pb-10'>
            <div className='w-[95%] mx-auto lg:w-[75%]'>
                <div className='items-center lg:w-[100%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8'>
                    <div className='flex items-center gap-3'>
                        <div className='w-[6px] h-[35px] bg-blue-500 rounded-full'></div>
                        <p className='text-2xl md:text-3xl capitalize font-medium'>Công việc đang cần người</p>
                    </div>
                    <div>
                        <span className='border border-gray-200 flex items-center py-2 px-10 rounded-md justify-end'>
                            <PaginationControl
                                page={page}
                                totalPages={totalPages}
                                onPageChange={(newPage) => setPage(newPage)}
                            />
                        </span>
                    </div>
                </div>

                <div
                    data-aos="fade-right"
                    className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 mt-10'
                >
                    {isLoading ? (
                        Array.from({ length: 10 }).map((_, i) => (
                            <div
                                key={i}
                                className='bg-white p-4 rounded-md shadow-md border border-gray-100'
                            >
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <Skeleton className="h-4 w-[120px]" />
                                    </div>
                                    <Skeleton className="h-8 w-20 rounded-md" />
                                </div>
                                <Skeleton className="h-4 w-[60%] my-3" />
                                <div className='bg-[#E0F2FE] rounded-md p-4'>
                                    <Skeleton className="h-4 w-[90%] my-2" />
                                    <Skeleton className="h-4 w-[80%] my-2" />
                                </div>
                            </div>
                        ))
                    ) : (
                        orderServices.map((order) => (
                            <div
                                key={order._id}
                                className='bg-white p-4 rounded-md shadow-md border border-gray-100 hover:border-blue-400'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <Image
                                            src="/images/order-service/avatar-user.jpg"
                                            alt="hero"
                                            width={40}
                                            height={40}
                                        />
                                        <p className='font-semibold ml-2'>{order.tenKhachHang}</p>
                                    </div>
                                    <button
                                        className="shine-effect cursor-pointer group flex items-center gap-2 rounded-md border border-blue-600 px-2 py-1 text-blue-600 transition-all duration-200 hover:scale-105"
                                    >
                                        Báo giá
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform duration-200 group-hover:translate-x-1"
                                        />
                                    </button>
                                </div>
                                <p className='text-blue-500 font-medium mt-2 mb-2'>{order.idCongViec[0].tenCongViec}</p>
                                <div className='bg-[#E0F2FE] rounded-md p-4'>
                                    <div className='flex items-center gap-3'>
                                        <Image
                                            src="/images/order-service/map.svg"
                                            alt="hero"
                                            width={25}
                                            height={25}
                                        />
                                        <p className='text-[13px]'>
                                            <span className='font-medium'>Địa điểm: </span>
                                            <span>{order.diaChi + ', ' + order.idPhuongXa[0].ten + ', ' + order.idQuanHuyen[0].ten + ', ' + order.idTinhTp[0].ten}</span>
                                        </p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-3'>
                                        <Image
                                            src="/images/order-service/Calendar.svg"
                                            alt="hero"
                                            width={25}
                                            height={25}
                                        />
                                        <p className='text-[13px]'>
                                            <span className='font-medium'>Ngày giờ làm việc: </span>
                                            <span>{format(new Date(order.thoiGianBatDau), 'HH:mm - dd/MM/yyyy')}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

}

export default OrderService