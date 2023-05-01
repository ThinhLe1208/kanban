import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { AutoComplete, Avatar, Breadcrumb, Button, Input, Popconfirm, Popover, Space, Table, Tag, Tooltip } from 'antd';
import Highlighter from 'react-highlight-words';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { assignUserProjectSagaAction, deleteProjectSagaAction, getAllProjectSagaAction, removeUserProjectSagaAction } from 'redux/saga/actions/projectAction';

import { setDrawer } from 'redux/reducers/drawerReducer';
import { setProjectEdit } from 'redux/reducers/projectReducer';
import { getUserSagaAction } from 'redux/saga/actions/userAction';
import { NavLink } from 'react-router-dom';
import EditProjectForm from 'components/Form/EditProjectForm/EditProjectForm';

const breadCrumbList = [
    {
        href: '/',
        title: 'Home',
    },
    {
        href: '/project',
        title: 'Project',
    },
    {
        title: 'Project Management',
    }
];

export default function ProjectManagement() {
    const dispatch = useDispatch();
    const searchRef = useRef(null);

    const { getUser } = useSelector(state => state.userReducer);
    const { projectList } = useSelector(state => state.projectReducer);

    // state of feature which searches and adds a member
    const [searchValue, setSearchValue] = useState('');

    // table antd library
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        dispatch(getAllProjectSagaAction());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // table antd library
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            ...getColumnSearchProps('id'),
            sorter: (a, b) => a?.id - b?.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            width: '20%',
            ...getColumnSearchProps('projectName'),
            sorter: (a, b) => {
                const n1 = a?.projectName.trim().toLowerCase();
                const n2 = b?.projectName.trim().toLowerCase();
                if (n1 < n2) {
                    return -1;
                } else {
                    return 1;
                }
            },
            sortDirections: ['descend', 'ascend'],
            render: (text, record, index) => {
                return <NavLink to={`/project/board/${record.id}`} >{text}</NavLink>;
            }
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
            ...getColumnSearchProps('categoryName'),
            sorter: (a, b) => {
                const n1 = a?.categoryName.trim().toLowerCase();
                const n2 = b?.categoryName.trim().toLowerCase();
                if (n1 < n2) {
                    return -1;
                } else {
                    return 1;
                }
            },
            sortDirections: ['descend', 'ascend'],
            render: (text) => {
                return <Tag color="blue">{text}</Tag>;
            }
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            ...getColumnSearchProps('description'),
            sorter: (a, b) => {
                const n1 = a?.description.trim().toLowerCase();
                const n2 = b?.description.trim().toLowerCase();
                if (n1 < n2) {
                    return -1;
                } else {
                    return 1;
                }
            },
            sortDirections: ['descend', 'ascend'],
            render: (text) => {
                // description received from Editor tinyMCE is html 
                return parse(text);
            }
        },
        {
            title: 'Members',
            dataIndex: 'members',
            key: 'members',
            ...getColumnSearchProps('members'),
            render: (text, record, index) => {
                return (
                    <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
                        {/* member avatar list */}
                        <Avatar.Group maxCount={2}>
                            {record.members?.map(m => (
                                <Tooltip key={m.userId} title={m.name} placement="top">
                                    <Avatar src={m.avatar} />
                                </Tooltip>
                            ))}
                        </Avatar.Group>
                        {/* add member button */}
                        <Popover
                            content={() => <AutoComplete
                                style={{
                                    width: '100%',
                                }}
                                options={getUser.map(u => ({ label: u.name, value: u.userId.toString() }))}
                                value={searchValue}
                                onChange={keyword => setSearchValue(keyword)}
                                onSearch={value => {
                                    if (searchRef.current) {
                                        clearTimeout(searchRef.current);
                                    }
                                    searchRef.current = setTimeout(() => {
                                        dispatch(getUserSagaAction(value));
                                    }, 500);

                                }}
                                onSelect={(value, option) => {
                                    setSearchValue(option.label);
                                    dispatch(assignUserProjectSagaAction(record.id, Number(value)));
                                }}
                            />}
                            title="Add member"
                            trigger="click"
                        >
                            <Button>+</Button>
                        </Popover>
                        {/* remove member button */}
                        <Popover
                            content={() => (
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Avatar</th>
                                            <th>Name</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {record.members.map((m, i) => (
                                            <tr key={i}>
                                                <td>{m.userId}</td>
                                                <td><Avatar src={m.avatar} /></td>
                                                <td>{m.name}</td>
                                                <td>
                                                    <Button
                                                        onClick={() => {
                                                            dispatch(removeUserProjectSagaAction(record.id, m.userId));
                                                        }}
                                                    >x</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                            title="Member List"
                            trigger="click"
                        >
                            <Button>-</Button>
                        </Popover>
                    </div>
                );
            }
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (text, record, index) => (
                <Space size='middle'>
                    {/* edit button */}
                    <span
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            // open drawer with edit content
                            dispatch(setDrawer({ title: 'Edit Project', drawerContent: <EditProjectForm /> }));
                            dispatch(setProjectEdit(record));
                        }}
                    >
                        <EditOutlined />
                    </span>
                    {/* delete button */}
                    <Popconfirm
                        title="Delete the project"
                        description="Are you sure to delete this project?"
                        onConfirm={() => dispatch(deleteProjectSagaAction(record.id))}
                        // onCancel={}
                        okText="Yes"
                        cancelText="No"
                    >
                        <span
                            style={{ cursor: 'pointer' }}
                        ><DeleteOutlined /></span>
                    </Popconfirm>
                </Space>
            )
        }
    ];
    return (
        <div className="main container py-3">
            <Breadcrumb
                items={breadCrumbList}
            />

            <h1 className='fs-1 mt-3 mb-4'>Project Management</h1>

            {/* rowKey fix error 'child need key' */}
            <Table columns={columns} dataSource={projectList} rowKey={'id'} scroll={{ y: 500 }} />
        </div>
    );
}
