import React from 'react';
import { Button, Drawer, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer } from 'redux/reducers/DrawerReducer';

export default function CustomDrawer() {
    const { isOpen, drawerContent, handleSubmitDrawer } = useSelector(state => state.DrawerReducer);
    const dispatch = useDispatch();

    const handleHideDrawer = () => {
        dispatch(hideDrawer());
    };

    return (
        <>
            <Drawer
                title="Edit project"
                width={720}
                onClose={handleHideDrawer}
                open={isOpen}
                // bodyStyle={{
                //     paddingBottom: 80,
                // }}
                extra={
                    <Space>
                        <Button onClick={handleHideDrawer}>Cancel</Button>
                        <Button onClick={handleSubmitDrawer} type="primary">
                            Submit
                        </Button>
                    </Space>
                }
            >
                {drawerContent}
            </Drawer>
        </>
    );
}