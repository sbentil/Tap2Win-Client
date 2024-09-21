import { Button } from '../core';
import EventForm from '../forms/events';
import { IEvent } from '@/interfaces/event';
import Modal from '@/components/modal';
import React from 'react'

interface Props {
  isOpen: boolean,
  onClose: any,
  data?: IEvent
}

const UserModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={data ? "Update Event" : "Create Event"}
      size="xl"
    >
      <EventForm onCancel={onClose} data={data} />
    </Modal>
  )
}

export default UserModal