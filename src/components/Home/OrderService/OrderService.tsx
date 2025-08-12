//**React */
import React, { useEffect, useState } from 'react'

//**Next */
import Image from 'next/image';

//**Shadcn */
import { Skeleton } from "@/components/ui/skeleton"

//**Icon */
import { ArrowRight } from 'lucide-react';

//**Service */
import { getOrderService } from '@/services/orderService.service';

//**Types */
import { OrderServiceResponse } from '@/types/orderService.type';
import { PaginatedOrderServiceResponse } from '@/types/orderService.type';

//**Fns */
import { format } from 'date-fns';

//**Component comon */
import PaginationControl from '@/components/Comon/PaginationControl/PaginationControl';

//**Toast message */
import toastMessage from '@/lib/toast';

const OrderService = () => {
    const [orderServices, setOrderServices] = useState<OrderServiceResponse[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [limit] = useState<number>(10); // mặc định limit 10
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const submit = () => {
        toastMessage.warning('Tính năng đang phát triển')
    }

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
        <div className='bg-white dark:bg-[#09090B] pt-10 pb-10'>
            <div className='w-[95%] mx-auto lg:w-[75%]'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-4 lg:w-full'>
                    <div className='flex items-center gap-3'>
                        <div className='w-[6px] h-[35px] bg-blue-500 rounded-full'></div>
                        <p className='text-2xl md:text-2xl capitalize font-medium text-gray-900 dark:text-white'>
                            Công việc đang cần người
                        </p>
                    </div>
                    <div className='flex justify-end w-full lg:w-auto'>
                        <PaginationControl
                            page={page}
                            totalPages={totalPages}
                            onPageChange={(newPage) => setPage(newPage)}
                        />
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
                                className='bg-white dark:bg-slate-800 p-4 rounded-md shadow-md border border-gray-100 dark:border-gray-700'
                            >
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <Skeleton className="h-4 w-[120px]" />
                                    </div>
                                    <Skeleton className="h-8 w-20 rounded-md" />
                                </div>
                                <Skeleton className="h-4 w-[60%] my-3" />
                                <div className='bg-[#E0F2FE] dark:bg-slate-700 rounded-md p-4'>
                                    <Skeleton className="h-4 w-[90%] my-2" />
                                    <Skeleton className="h-4 w-[80%] my-2" />
                                </div>
                            </div>
                        ))
                    ) : (
                        orderServices.map((order) => (
                            <div
                                key={order._id}
                                className='bg-white dark:bg-slate-800 p-4 rounded-md shadow-md border border-gray-100 dark:border-gray-700 hover:border-blue-400'>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center'>
                                        <Image
                                            src="/images/order-service/avatar-user.jpg"
                                            alt="hero"
                                            width={40}
                                            height={40}
                                        />
                                        <p className='font-semibold ml-2 text-gray-900 dark:text-white'>{order.tenKhachHang}</p>
                                    </div>
                                    <button onClick={submit}
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
                                <div className='bg-[#E0F2FE] dark:bg-slate-700 rounded-md p-4'>
                                    <div className='flex items-center gap-3'>
                                        <Image
                                            src="/images/order-service/map.svg"
                                            alt="hero"
                                            width={25}
                                            height={25}
                                        />
                                        <p className='text-[13px] text-gray-800 dark:text-gray-300'>
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
                                        <p className='text-[13px] text-gray-800 dark:text-gray-300'>
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

export default OrderService;