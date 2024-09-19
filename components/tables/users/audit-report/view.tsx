"use client";

import Button from "@/components/core/button";
import { IAuditReport } from "@/interfaces/users";
import Modal from "@/components/modal";
import React from "react";
import { TableIcon } from "@/components/table/icons";
import { formatDate } from "@/helpers/datetime";

interface Props {
  state: boolean;
  onClose: (state: boolean) => void;
  data: IAuditReport;
}

const ViewModal: React.FC<Props> = ({ state, onClose, data }) => {
  const { date, activity, activity_by, details } = data || {};

  return (
    <Modal isOpen={state} onClose={() => onClose(false)} title="User Audit">
      <div className="flex items-center gap-y-6 flex-col w-full px-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Activity By</h4>
            <p className="text-text font-thin text-sm">
              {activity_by || "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Activity</h4>
            <p className="text-text font-thin text-sm">{activity || "N/A"}</p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start w-1/2">
            <h4 className="text-primary">Date</h4>
            <p className="text-text font-thin text-sm">
              {date ? formatDate(date) : "N/A"}
            </p>
          </div>
        </div>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-start">
            <h4 className="text-primary">Details</h4>
            <p className="text-text font-thin text-sm">
              {details
                ? details.split(",").map((detail, index) => (
                    <span key={index} className="block">
                      {detail}
                    </span>
                  ))
                : "No details available"}
            </p>
          </div>
        </div>

        <div className="flex gap-10">
          <Button
            onClick={() => onClose(false)}
            variant="outline"
            text="Cancel"
            className="min-w-[100px]"
          />
          <Button variant="primary" className="gap-2 min-w-[200px]">
            <TableIcon icon="download" />
            Download Report
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewModal;
