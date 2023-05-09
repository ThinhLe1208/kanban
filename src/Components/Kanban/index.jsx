import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';
import classNames from 'classnames/bind';

import styles from './styles.module.scss';
import Column from 'components/Column';
import { useDispatch } from 'react-redux';
import { updateStatusSagaAction } from 'redux/sagas/actions/taskAction';

const cx = classNames.bind(styles);

export default function Kanban({ projectDetail }) {
  const { lstTask } = projectDetail;
  const [list, setList] = useState(lstTask);
  const dispatch = useDispatch();

  const renderColumns = () => {
    return list?.map((colDetail, index) => (
      <div key={index}>
        <Column colDetail={colDetail} index={index} />
      </div>
    ));
  };

  const handleDragEnd = (data) => {
    const { source, destination, draggableId } = data;

    if (!destination) {
      return;
    }

    if (source.index === destination.index && source.droppableId === destination.droppableId) {
      return;
    }

    setList((preList) => {
      preList = _.cloneDeep(preList);
      // find task
      const srcCol = preList.find((col) => col.statusId === source.droppableId);
      const srcTask = srcCol.lstTaskDeTail[source.index];
      // remove task from column
      srcCol.lstTaskDeTail.splice(source.index, 1);
      // add task to destination
      const desCol = preList.find((col) => col.statusId === destination.droppableId);
      desCol.lstTaskDeTail.splice(destination.index, 0, srcTask);

      return preList;
    });

    dispatch(updateStatusSagaAction(Number(draggableId), destination.droppableId, projectDetail.id));
  };

  useEffect(() => {
    // question: 1st render lstTask is empty
    setList(projectDetail.lstTask);
  }, [projectDetail.lstTask]);

  return (
    <div className={cx('wrapper')}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className={cx('columns')}>{renderColumns()}</div>
      </DragDropContext>
    </div>
  );
}
