import { useState } from 'react';
import { data } from '../../db/db';
import ProductTable from './ProductTable';
import AddNewProduct from './AddNewProduct';
import UpdateProduct from './UpdateProduct';
import DeleteProduct from './DeleteProduct';


const ProductPage = () => {

  const [addProductModal, setAddProductModal] = useState(false);
  const [updateProductModal, setUpdateProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);


  const updateProductHandler = () => {
    setUpdateProductModal(!updateProductModal);
  };


  const deleteProductHandler = () => {
    setDeleteProductModal(!deleteProductModal);
  };

  return (
    <>
      {
        (addProductModal && <AddNewProduct addProductModal={addProductModal} setAddProductModal={setAddProductModal} />) ||
        (updateProductModal && <UpdateProduct updateProductModal={updateProductModal} setUpdateProductModal={setUpdateProductModal}/>) ||
        (deleteProductModal && <DeleteProduct deleteProductModal={deleteProductModal} setDeleteProductModal={setDeleteProductModal}/>) ||
        (
          <div className="">
            <header className=' flex h-28 justify-around items-center'>
              {/* icon and title */}
              <div className='flex gap-4 items-center'>
                <img src="https://cdn-icons-png.flaticon.com/128/2989/2989545.png" alt="Icon" width={40} height={40} />
                <h1 className='text-xl font-bold'>Product</h1>
              </div>

              {/* search field */}
              <div className='w-[350px]'>
                <form className="max-w-md mx-auto">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-700 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block p-2 ps-10 w-full border text-gray-900 rounded-lg bg-gray-50"
                      placeholder="Search Products"
                      required=""
                    />
                  </div>
                </form>
              </div>

              <div>
                <button
                  className="text-white p-2 rounded-lg font-bold bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring"
                  onClick={() => setAddProductModal(!addProductModal)}
                >
                  Add New
                </button>
              </div>
            </header>

            {/* table body  */}
            <main className='w-full'>
              <ProductTable data={data} updateProductHandler={updateProductHandler} deleteProductHandler={deleteProductHandler} />
            </main>
          </div>
        )
      }
    </>
  )
}

export default ProductPage