import DataTable, { createTheme } from 'react-data-table-component'
import Pagination from './Pagination';
import LoadingSpinner from '../../components/loading/LoadingSpinner';
export default function DefaultTable({ data, columns, status, currentPage, perPage,
    meta, perPageHandle, next, prev, last, begin }) {

    createTheme('solarized', {
        text: {
            primary: '#000000',
            secondary: '#FFFFFF ',
        },
        background: {
            default: '#D4DBF5',
        },
        pageButtonsStyle: {
            borderRadius: '50%',
            height: '40px',
            width: '40px',
            padding: '8px',
            margin: 'px',
            cursor: 'pointer',
            transition: '0.4s',
            color: '#474F5D',
            fill: '#474F5D',
            backgroundColor: 'transparent',
            '&:disabled': {
                cursor: 'unset',
                color: '#474F5D',
                fill: '#474F5D',
            },
            '&:hover:not(:disabled)': {
                backgroundColor: '#474F5D',
            },
            '&:focus': {
                outline: 'none',
                backgroundColor: '#474F5D',
            },
        },
    }, 'dark');

    return (
        <div className='h-[800px] overflow-auto p-5'>
            {status == "loading" && (
                <div className=' mx-auto'>
                    <LoadingSpinner />
                </div>

            )}

            <div className={`${status == "success" ? '' : 'hidden h-auto'}`}>
                <DataTable columns={columns} data={data}
                    highlightOnHover
                    responsive
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    striped
                    theme="solarized"
                    customStyles={{
                        pagination: {
                            style: {
                                background: 'rgb(100 116 139)',
                            },
                        },
                        headCells: {
                            style: {
                                fontSize: "15px",
                                fontWeight: "bold",
                                color: "#FFFFFF",
                                backgroundColor: "rgb(100 116 139)"

                            }
                        },
                        rows: {
                            style: {
                                fontSize: '14px', // Tablo satırlarındaki font büyüklüğü
                                fontWeight: "semibold"
                            },
                            stripedStyle: {
                                color: "#000000",
                                backgroundColor: "#CAD0E9"
                            }
                        },
                    }}
                />

            </div>
            <Pagination current_page={currentPage} per_page={perPage} meta={meta}
                perPageHandle={perPageHandle} next={next} prev={prev} last={last}
                begin={begin} />
        </div>
    )
}
