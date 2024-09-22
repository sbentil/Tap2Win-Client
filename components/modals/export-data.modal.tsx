import React, { useState } from 'react';

import Button from '@/components/core/button';
import Modal from '@/components/modal';
import { cn } from '@/lib/utils';

interface Props {
  state: boolean;
  onClose: (state: boolean) => void;
  fields: string[] | string[][];
}

const ExportDataModal: React.FC<Props> = ({ state, onClose, fields }) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const handleFieldChange = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  const handleProceed = () => {
    console.log('Selected fields:', selectedFields);
    onClose(false);
  };

  // Determine if fields is a nested array
  const isNestedArray = Array.isArray(fields[0]);

  return (
    <Modal isOpen={state} onClose={() => onClose(false)} title="Export Data" size="xl">
      <div className="flex flex-col w-full px-4 gap-y-6">
        <div className={cn([
          "w-full grid gap-4",
          isNestedArray ? "grid-cols-2" : "grid-cols-3"
        ])}>
          {isNestedArray ? (
            (fields as string[][]).map((group, index) => (
              <div key={index} className="gap-4">
                {group.map((field) => (
                  <div key={field} className="flex items-center">
                    <input
                      type="checkbox"
                      id={field}
                      name={field}
                      value={field}
                      onChange={() => handleFieldChange(field)}
                      className="mr-2"
                    />
                    <label htmlFor={field} className="text-text">
                      {field}
                    </label>
                  </div>
                ))}
              </div>
            ))
          ) : (
            (fields as string[]).map((field) => (
              <div key={field} className="flex items-center">
                <input
                  type="checkbox"
                  id={field}
                  name={field}
                  value={field}
                  onChange={() => handleFieldChange(field)}
                  className="mr-2"
                />
                <label htmlFor={field} className="text-text">
                  {field}
                </label>
              </div>
            ))
          )}
        </div>

        <div className="flex gap-10 mt-4 items-center justify-center">
          <Button variant="outline" text="Cancel" className="min-w-[120px]" onClick={() => onClose(false)} />
          <Button variant="primary" text="Proceed" className="min-w-[120px]" onClick={handleProceed} />
        </div>
      </div>
    </Modal>
  );
};

export default ExportDataModal;
