import { Button } from '../core';
import { IUser } from '@/interfaces/users';
import Modal from '@/components/modal';
import React from 'react'
import UserForm from '../forms/users';

interface Props {
  isOpen: boolean,
  onClose: any,
  data?: IUser
}

const UserModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={data ? "Update User" : "Create User"}
      size="xl"
    >
      <UserForm onCancel={onClose} data={data} />
    </Modal>
  )
}

export default UserModal