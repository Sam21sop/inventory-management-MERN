import React, { useState } from 'react';
import CategoryTable from './CategoryTable';
import { data } from '../../db/db';
import AddNewCategory from './AddNewCategory';
import DeleteProduct from './DeleteProduct';
import UpdateCategory from './UpdateCategory';



const CategoryPage = () => {

  const [addCategorymodal, setAddCategorymodal] = useState(false);
  const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
  const [updateCategoryModal, setUpdateCategoryModal] = useState(false);


  const updateCategoryHandler = () => {
    setUpdateCategoryModal(!updateCategoryModal)
  };


  const deleteCategoryHandler = () => {
    setDeleteCategoryModal(!deleteCategoryModal)
  }

  return (
    <>
      {
        (deleteCategoryModal && <DeleteProduct deleteCategoryModal={deleteCategoryModal} setDeleteCategoryModal={setDeleteCategoryModal}/>) ||
        (addCategorymodal && <AddNewCategory setAddCategorymodal={setAddCategorymodal} addCategorymodal={addCategorymodal} />) ||
        (updateCategoryModal && <UpdateCategory updateCategoryModal={updateCategoryModal} setUpdateCategoryModal={setUpdateCategoryModal}/>) ||
        (
          <div className=" ">
            <header className='flex h-28 justify-around items-center'>
              {/* icon and title */}
              <div className='flex gap-4 items-center'>
                <img src="https://cdn-icons-png.flaticon.com/128/3502/3502685.png" alt="Icon" width={40} height={40} />
                <h1 className='text-xl font-bold'>Category</h1>
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
                  onClick={() => setAddCategorymodal(!addCategorymodal)}
                >
                  Add New
                </button>
              </div>
            </header>

            <main className='w-full'>
              <CategoryTable data={data} updateCategoryHandler={updateCategoryHandler} deleteCategoryHandler={deleteCategoryHandler} />
            </main>
          </div>
        )
      }
    </>
  )
}

export default CategoryPage;