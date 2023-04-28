import React, { useEffect } from 'react';
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Breadcrumb, Button, Input, Popconfirm, Space, Table, Tag } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProjectSagaAction, getAllProjectSagaAction } from 'redux/saga/actions/ProjectAction';
import { setDrawer } from 'redux/reducers/DrawerReducer';
import EditProjectForm from 'Components/EditProjectForm/EditProjectForm';
import { setEditProject } from 'redux/reducers/ProjectReducer';

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
    const { projectList } = useSelector(state => state.ProjectReducer);

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
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a?.id - b?.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Project Name',
            dataIndex: 'projectName',
            key: 'projectName',
            width: '20%',
            ...getColumnSearchProps('age'),
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
        },
        {
            title: 'Category Name',
            dataIndex: 'categoryName',
            key: 'categoryName',
            ...getColumnSearchProps('address'),
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
            ...getColumnSearchProps('address'),
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
            // description received from Editor tinyMCE is html 
            render: (text) => {
                return parse(text);
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
                            dispatch(setDrawer(<EditProjectForm />));
                            dispatch(setEditProject(record));
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
