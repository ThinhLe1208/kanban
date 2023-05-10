import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AutoComplete, Avatar, Button, Input, Popconfirm, Popover, Space, Table, Tag, Tooltip } from 'antd';
import {
  CloseCircleOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import parse from 'html-react-parser';
import { useDispatch, useSelector } from 'react-redux';
import {
  assignUserProjectSagaAction,
  deleteProjectSagaAction,
  getAllProjectSagaAction,
  removeUserProjectSagaAction,
} from 'redux/sagas/actions/projectAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import { setOffcanvas } from 'redux/reducers/offcanvasReducer';
import { setProjectEdit } from 'redux/reducers/projectReducer';
import { getUserSagaAction } from 'redux/sagas/actions/userAction';
import EditProjectForm from 'components/EditProjectForm';
import Heading from 'components/Heading';
import Card from 'components/Card';

const cx = classNames.bind(styles);

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
  },
];

export default function ProjectManagement() {
  const dispatch = useDispatch();
  const searchRef = useRef(null);

  const { getUser } = useSelector((state) => state.userReducer);
  const { projectList } = useSelector((state) => state.projectReducer);
  const { projectCategoryArr } = useSelector((state) => state.projectCategoryReducer);

  // state support to the delete member button in the popup table
  const [projectId, setProjectId] = useState(0);

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
          textAlign: 'end',
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
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{
              width: 90,
            }}
          >
            Search
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
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
  // Remove member table
  const memberColumns = [
    {
      title: 'ID',
      dataIndex: 'userId',
      key: 'userId',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => <Avatar src={text} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => (
        <Button
          type='text'
          icon={<CloseCircleOutlined style={{ color: 'var(--error)' }} />}
          onClick={() => dispatch(removeUserProjectSagaAction(projectId, record.userId))}
        />
      ),
    },
  ];

  // Project management table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      responsive: ['xl'],
      ...getColumnSearchProps('id'),
      sorter: (a, b) => a?.id - b?.id,
      sortDirections: ['descend', 'ascend'],
      render: (text) => <span style={{ color: 'var(--sub-text-color)' }}>{text}</span>,
    },
    {
      title: 'Project Name',
      dataIndex: 'projectName',
      key: 'projectName',
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
      render: (text, record) => {
        return (
          <NavLink to={`/project/board/${record.id}`} style={{ cursor: 'pointer', fontWeight: '600' }}>
            {text}
          </NavLink>
        );
      },
    },
    {
      title: 'Category Name',
      dataIndex: 'categoryName',
      key: 'categoryName',
      width: 200,
      responsive: ['xl'],
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
      filters: projectCategoryArr?.map((ctg) => ({ text: ctg.projectCategoryName, value: ctg.id })),
      onFilter: (value, record) => record.categoryId === value,
      render: (text) => {
        let color;
        switch (text) {
          case 'Dự án web':
            color = 'purple';
            break;
          case 'Dự án phần mềm':
            color = 'magenta';
            break;
          default:
            color = 'lime';
        }
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      responsive: ['md'],
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
        return <span style={{ color: 'var(--sub-text-color)' }}>{parse(text)}</span>;
      },
    },
    {
      title: 'Member',
      dataIndex: 'members',
      key: 'members',
      width: 150,
      responsive: ['lg'],
      render: (text, record, index) => {
        return (
          <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', display: 'flex' }}>
            {/* member avatar list */}
            <Avatar.Group maxCount={2} maxStyle={{ backgroundColor: 'var(--bg-primary)' }}>
              {record.members?.map((m) => (
                <Tooltip key={m.userId} title={m.name} placement='top' color='cyan'>
                  <Avatar src={m.avatar} />
                </Tooltip>
              ))}
            </Avatar.Group>
          </div>
        );
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 200,
      render: (text, record, index) => (
        <Space>
          {/* edit button */}
          <Tooltip title={'Edit Project'} color='#00c292' zIndex={5}>
            <Button
              type='text'
              icon={<EditOutlined style={{ color: 'var(--success)' }} />}
              onClick={() => {
                // open drawer with edit content
                dispatch(
                  setOffcanvas({
                    title: 'Edit Project',
                    icon: <EditOutlined />,
                    aceptBtn: 'Edit',
                    showBtn: true,
                    offcanvasContent: <EditProjectForm />,
                  })
                );
                // dispatch the editing project to store
                dispatch(setProjectEdit(record));
              }}
            />
          </Tooltip>

          {/* remove button */}
          <Tooltip title={'Delete project'} color='#e46a76' zIndex={5}>
            <Popconfirm
              icon={<FontAwesomeIcon icon={faCircleQuestion} style={{ color: '#e46a76' }} />}
              title='Are you sure to remove this project?'
              okText='Remove'
              cancelText='Cancel'
              okButtonProps={{ style: { background: '#e46a76' } }}
              onConfirm={() => dispatch(deleteProjectSagaAction(record.id))}
            >
              <Button type='text' icon={<DeleteOutlined style={{ color: 'var(--error)' }} />} />
            </Popconfirm>
          </Tooltip>

          {/* add member button */}
          <Tooltip title={'Add member'} color='#03c9d7' zIndex={5}>
            <Popover
              content={() => (
                <AutoComplete
                  style={{
                    width: '100%',
                  }}
                  options={getUser.map((u) => ({ label: u.name, value: u.userId.toString() }))}
                  value={searchValue}
                  onChange={(keyword) => setSearchValue(keyword)}
                  onSearch={(value) => {
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
                />
              )}
              title='Add member'
              trigger='click'
            >
              <Button type='text' icon={<PlusCircleOutlined style={{ color: 'var(--info)' }} />} />
            </Popover>
          </Tooltip>

          {/* remove member button */}
          <Tooltip title={'Remove member'} color='#fec90f' zIndex={5}>
            <Popover
              placement='left'
              content={() => (
                <Card style={{ padding: '0' }}>
                  <Table columns={memberColumns} dataSource={record.members} rowKey={'userId'} pagination={false} />
                </Card>
              )}
              trigger='click'
            >
              <Button
                type='text'
                icon={<MinusCircleOutlined style={{ color: 'var(--warning)' }} />}
                onClick={() => setProjectId(record.id)}
              />
            </Popover>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className={cx('wrapper')}>
      <div className={cx(`heading`)}>
        <Heading breadCrumbList={breadCrumbList} title={'Project Management'} />
      </div>

      {/* rowKey fix error 'child need key' */}
      <Card className={cx('card')}>
        <Table columns={columns} dataSource={projectList} rowKey={'id'} pagination={{ position: ['bottomCenter '] }} />
      </Card>
    </div>
  );
}
