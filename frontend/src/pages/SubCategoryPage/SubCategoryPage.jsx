import React, { useState } from 'react'
import SubcategoryTable from './SubcategoryTable';
import { data } from '../../db/db';
import AddnewSubcategory from './AddnewSubcategory';
import DeleteSubcategory from './DeleteSubcategory';
import UpdateSubcategory from './UpdateSubcategory';


const SubCategoryPage = () => {

  const [addSubCategorymodal, setAddSubCategorymodal] = useState(false);
  const [deleteSubCategoryModal, setDeleteSubCategoryModal] = useState(false);
  const [updateSubCategoryModal, setUpdateSubCategoryModal] = useState(false);


  const updateSubCategoryHandler = () => {
    setUpdateSubCategoryModal(!updateSubCategoryModal)
  };


  const deleteSubCategoryHandler = () => {
    setDeleteSubCategoryModal(!deleteSubCategoryModal)
  }

  return (
    <>
      {
        (addSubCategorymodal && <AddnewSubcategory addSubCategorymodal={addSubCategorymodal} setAddSubCategorymodal={setAddSubCategorymodal} />) ||
        (updateSubCategoryModal && <UpdateSubcategory updateSubCategoryModal={updateSubCategoryModal} setUpdateSubCategoryModal={setUpdateSubCategoryModal} />) ||
        (deleteSubCategoryModal && <DeleteSubcategory deleteSubCategoryModal={deleteSubCategoryModal} setDeleteSubCategoryModal={setDeleteSubCategoryModal} />) ||
        (
          <div className="">
            <header className=' flex h-28 justify-around items-center'>
              {/* icon and title */}
              <div className='flex gap-4 items-center'>
                <img src="https://cdn-icons-png.flaticon.com/128/9131/9131997.png" alt="Icon" width={35} height={35} />
                <h1 className='text-xl font-bold'>Sub Category</h1>
              </div>

              {/* search field */}
              <div className='w-[350px]'>
                <form className="max-w-md mx-auto relative">
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
                </form>
              </div>

              <div>
                <button 
                  className="text-white p-2 rounded-lg font-bold bg-fuchsia-600 hover:bg-fuchsia-700 focus:outline-none focus:ring"
                  onClick={() => setAddSubCategorymodal(!addSubCategorymodal)}
                >
                  Add New
                </button>
              </div>
            </header>

            <main className='w-full'>
              <SubcategoryTable data={data} updateSubCategoryHandler={updateSubCategoryHandler} deleteSubCategoryHandler={deleteSubCategoryHandler}/>
            </main>
          </div>
        )
      }
    </>
  )
}

export default SubCategoryPage;