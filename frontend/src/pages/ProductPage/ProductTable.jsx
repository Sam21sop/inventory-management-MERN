import DataTable from 'react-data-table-component';


const customStyles = {

    headCells: {
        style: {
            paddingLeft: '8px',
            paddingRight: '8px',
            fontSize: '20px',
            color: "white",
            backgroundColor: "orchid"
        },

    },
};



const ProductTable = (props) => {

    const { data, updateProductHandler, deleteProductHandler } = props;


    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Product Name',
            selector: row => row.productName,
            sortable: true,
        },
        {
            name: 'Image',
            selector: row => (
                <img
                    src={row.imgUrl}
                    width={40}
                    height={40}
                    alt='product'
                />
            ),
            sortable: true,
        },
        {
            name: 'Sub Category',
            selector: row => row.subCategory,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Action',
            selector: row => row.action,
            cell: () => <>
                <button onClick={updateProductHandler}>
                    <img src="https://cdn-icons-png.flaticon.com/128/1827/1827933.png" alt="edit" height={15} width={15} />
                </button>
                &nbsp;&nbsp;&nbsp;
                <button onClick={deleteProductHandler}>
                    <img src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png" alt="delete" height={15} width={15} />
                </button>
            </>,
            button: true,
        },
    ];



    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                customStyles={customStyles}
                pagination
            />
        </>
    )
}

export default ProductTable