import { FiX } from "react-icons/fi"
import React from "react";
import { motion } from "framer-motion";

const Modal = ({ setIsOpen, isOpen, title, action, children }: { setIsOpen: any, isOpen: boolean, title: string, action?: { text: string, handler: (e: any) => void }, children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="w-full fixed z-50 inset-0 overflow-y-auto"
    >
      <div className="w-full h-screen flex items-center justify-center pt-4 px-4 pb-20 text-center ">
        {/* Background overlay, show/hide based on modal state. */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>

        {/* Profile Card, show/hide based on modal state. */}
        <div className="w-full md:w-[50%] inline-block align-bottom  bg-white rounded-3xl text-left overflow-hidden shadow-xl transform transition-all">
          {/* close button */}
          <div className="w-full flex items-center justify-between p-4 ">
            <p className=" px-4 text-xl font-semibold">{ }</p>
            <p className=" px-4 md:text-xl font-medium font-BeVietnamPro">{title}</p>
            <motion.button
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              className="block p-2 rounded-lg bg-red-600 hover:bg-red-500"
            >
              <FiX className="text-base text-white" />
            </motion.button>
          </div>

          <div className="w-full bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {children}
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {action && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                type="button"
                onClick={action.handler}
                className={`w-full inline-flex justify-center items-center gap-x-2 rounded-md border border-transparent shadow-sm px-4 py-2 ${action.text === "Suspend" || action.text === "Delete" ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}  font-medium text-white  focus:outline-none sm:ml-3 sm:w-auto sm:text-sm`}
              >
                {action.text}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Modal;
