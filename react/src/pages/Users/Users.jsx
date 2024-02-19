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


    useEffect(() => {
        if (usersStatus == "idle") {
            dispatch(fetchUsers({ page: current_page, pageSize: per_page, search: search }));
        }
    }, [usersStatus]);



    useEffect(() => {
        dispatch(fetchUsers({ page: current_page, pageSize: per_page, search: search }));
    }, [search]);



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


    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true,
        },
        {
            name: "Name ",
            selector: (row) => row.name,
            sortable: true,
            cell: (row) => (
                <div className='flex justify-center items-center gap-3'>
                    {row?.image && (
                        <div className='flex gap-4'>
                            <img src={row.image} className='w-10 h-10 rounded-full' alt="" />
                        </div>
                    )}
                    {!row?.image && (
                        <div className='flex gap-4'>
                            <FaUserCircle size={28} />
                        </div>
                    )}
                    <div>
                        {row.name}
                    </div>
                </div>
            )
        },
        {
            name: "E-mail",
            selector: (row) => row.email
        },
        {
            name: "Telephone",
            selector: (row) => row.telephone
        },
        {
            name: "İşlemler",
            cell: (row) => (
                <div className='flex gap-4'>
                    <button className='bg-slate-700 rounded-md text-white p-2 text-xl hover:bg-slate-800'
                        onClick={() => faUserIcon(row.id)}>
                        <FaUser />
                    </button>
                    <button className='bg-slate-500 rounded-md text-white p-2 text-xl hover:bg-slate-600'
                        onClick={() => faPencilIcon(row.id)}>
                        <GoPencil />
                    </button>
                    <button className='bg-green-600 rounded-md text-white p-2 text-xl hover:bg-green-700'
                        onClick={() => faPhoneIcon(row.id)}>
                        <MdOutlinePhoneIphone />
                    </button>
                    <button className='bg-red-600 rounded-md text-white p-2 text-xl hover:bg-red-700'
                        onClick={() => faPTrashIcon(row.id)}>
                        <FaTrashAlt />
                    </button>
                </div>

            )
        }]




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
                    head={[
                        { name: 'ID', sortable: true },
                        { name: 'Ad-Soyad', sortable: true },
                        { name: 'Email' },
                        { name: 'Telephone' },
                        { name: 'İşlemler', width: 200 }
                    ]}
                    status={usersStatus}
                    currentPage={current_page}
                    perPage={per_page}
                    meta={meta}
                    perPageHandle={onChangePerPageHandle}
                    next={nextPageHandle}
                    prev={prevPageHandle}
                    last={lastPageHandle}
                    begin={beginPageHandle}
                />
                {/* DataTable */}
            </div>
        </>
    )
}
