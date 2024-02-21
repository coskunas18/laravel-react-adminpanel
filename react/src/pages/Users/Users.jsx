import { useEffect, useState } from 'react'
import Title from '../../components/layouts/DefaultLayout/Title';
import { useSelector, useDispatch } from "react-redux";
import {
    fetchUsers, getUserPerPage, getUserStatus, getUserSearch,
    selectAllUsers, onChangeSearch, getUserMeta, onChangePerPage, onNextPage, onPrevPage,
    onClickBeginingPage, onClickLastPage,
} from '../../components/users/UserSlice';
import DefaultTable from '../../components/table/DefaultTable';
import Search from '../../components/table/Search';

import { FaTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

import UserModal from '../../components/users/modals/UserModal';
import Toast from "../../components/Toast/Toast"

export default function Product() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState({
        status: false,
        option: '',
        id: ''
    })

    const usersStatus = useSelector(getUserStatus);
    const current_page = useSelector(state => state.users.currentPage)
    const per_page = useSelector(getUserPerPage)
    const search = useSelector(getUserSearch);
    const meta = useSelector(getUserMeta);
    const users = useSelector(selectAllUsers);

    const toast = useSelector(state => state.toast.toast);

    const [sorting, setSorting] = useState(false);


    useEffect(() => {
        if (usersStatus == "idle") {
            dispatch(fetchUsers({ page: current_page, pageSize: per_page, search: search, orderByColumn: sorting?.data_name || 'id', orderByDirection: sorting?.orderBy || 'asc' }));
        }
    }, [usersStatus]);



    useEffect(() => {
        dispatch(fetchUsers({ page: current_page, pageSize: per_page, search: search, orderByColumn: sorting?.data_name || 'id', orderByDirection: sorting?.orderBy || 'asc' }));
    }, [search, sorting]);



    const searchHandle = (value) => {
        dispatch(onChangeSearch(value));
    }

    const onChangePerPageHandle = (value) => {
        dispatch(onChangePerPage(value))
    }

    const nextPageHandle = () => {
        dispatch(onNextPage())
    }

    const prevPageHandle = () => {
        dispatch(onPrevPage())
    }

    const lastPageHandle = () => {
        dispatch(onClickLastPage())
    }

    const beginPageHandle = () => {
        dispatch(onClickBeginingPage())
    }


    const modalClose = () => {
        setOpen({
            status: false,
            option: '',
            id: ''
        })
    }


    const faUserIcon = (id) => {
        setOpen({
            status: true,
            option: 'show',
            id: id
        })
    }

    const faPencilIcon = (id) => {
        setOpen({
            status: true,
            option: 'edit',
            id: id
        })
    }

    const faPhoneIcon = (id) => {
        setOpen({
            status: true,
            option: 'call',
            id: id
        })
    }

    const faPTrashIcon = (id) => {
        setOpen({
            status: true,
            option: 'delete',
            id: id
        })
    }

    const faCreateIcon = () => {
        setOpen({
            status: true,
            option: 'create',
            id: null
        })
    }


    const columnHead = [
        { name: 'ID', sortable: true, data_name: 'id' },
        { name: 'Ad-Soyad', sortable: true, data_name: 'name' },
        { name: '', data_name: 'image', },
        { name: 'Email' },
        { name: 'Telephone' },
        { name: 'İşlemler', width: 200 }
    ];

    return (
        <>

            {toast.status && (
                <Toast type={toast.type} title={toast.title} />
            )}

            {/* Title */}
            < Title title="Users">
                <button className='bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 flex
                flex-wrap items-center gap-3' onClick={() => faCreateIcon()}>
                    Kullanıcı Ekle
                    <FaUserPlus size={20} />
                </button>
            </Title>
            {/* Title */}

            {open.status === true && (
                <UserModal modalClose={modalClose} userId={open.id} modalOptions={open} />
            )}


            <div>
                {/* Search */}
                <Search onSearch={searchHandle} />
                {/* Search */}

                {/* DataTable */}
                <DefaultTable body={users && users.map((user) => [
                    user.id,
                    user.name,
                    [
                        <>
                            {user.image !== null ? <img src={user.image} className='w-10 h-10 rounded-full' alt="" /> : <FaUserCircle size={20} />}
                        </>
                    ],
                    user.email,
                    user.telephone,
                    [
                        <>
                            <div className='flex gap-4'>
                                <button className='bg-slate-700 rounded-md text-white p-2 text-xl hover:bg-slate-800'
                                    onClick={() => faUserIcon(user.id)}>
                                    <FaUser />
                                </button>
                                <button className='bg-slate-500 rounded-md text-white p-2 text-xl hover:bg-slate-600'
                                    onClick={() => faPencilIcon(user.id)}>
                                    <GoPencil />
                                </button>
                                <button className='bg-green-600 rounded-md text-white p-2 text-xl hover:bg-green-700'
                                    onClick={() => faPhoneIcon(user.id)}>
                                    <MdOutlinePhoneIphone />
                                </button>
                                <button className='bg-red-600 rounded-md text-white p-2 text-xl hover:bg-red-700'
                                    onClick={() => faPTrashIcon(user.id)}>
                                    <FaTrashAlt />
                                </button>
                            </div>
                        </>
                    ]

                ])}
                    head={columnHead}
                    status={usersStatus}
                    currentPage={current_page}
                    perPage={per_page}
                    meta={meta}
                    perPageHandle={onChangePerPageHandle}
                    next={nextPageHandle}
                    prev={prevPageHandle}
                    last={lastPageHandle}
                    begin={beginPageHandle}
                    sorting={sorting}
                    setSorting={setSorting}
                />
                {/* DataTable */}
            </div>
        </>
    )
}
