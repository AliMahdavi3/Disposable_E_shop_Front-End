import React from 'react'
import { apiPath } from '../../../services/httpService'

const ImageSection = ({ data }) => {
    return (
        <>
            <div className="block md:hidden col-span-5 py-5 rounded-xl">
                <div className='flex overflow-x-auto scrollbar_hidden p-2'>
                    {data.product.imageUrl.map((imageUrl, index) => (
                        <img
                            key={index}
                            className='box_shadow cursor-pointer rounded-xl me-2 w-full'
                            src={`${apiPath}/${imageUrl}`}
                            alt={`Product ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            <div className="hidden md:block col-span-5 md:col-span-2 rounded-xl">
                <img
                    src={`${apiPath}/${data.product.imageUrl[0]}`}
                    className='box_shadow hover:shadow-2xl cursor-pointer rounded-xl mb-5'
                    alt={data.product.title}
                />

                <div className='grid grid-cols-3 gap-4'>
                    {data.product.imageUrl.slice(1, 4).map((imageUrl, index) => (
                        <img
                            key={index}
                            className='col-span-1 box_shadow hover:shadow-2xl 
                            cursor-pointer rounded-xl'
                            src={`${apiPath}/${imageUrl}`}
                            alt={data.product.title}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default ImageSection
