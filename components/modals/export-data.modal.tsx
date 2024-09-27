import React, { useEffect, useState } from 'react';

import Button from '@/components/core/button';
import Modal from '@/components/modal';
import { cn } from '@/lib/utils';
import OrganizerService from '@/services/organizer.service';
import toasts from '@/utils/toasts';
import { usePathname } from 'next/navigation';
import { __exportDataToExcel } from '@/helpers/export';

interface Props<T> {
  state: boolean;
  onClose: (state: boolean) => void;
  type: 'tokens' | 'transactions';
  data: T; // The interface object (e.g., ITransaction)
}

const ExportDataModal = <T extends Record<string, any>>({
  state,
  onClose,
  type,
  data,
}: Props<T>) => {
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [event, setEvent] = useState<string | null>(null);
  const pathname = usePathname();

  const realType = {
    tokens: 'raffle',
    transactions: 'transaction',
  };

  const handleFieldChange = (field: string) => {
    setSelectedFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const handleProceed = () => {
    if (selectedFields.length <= 0) {
      return toasts.error('Export 👺', 'Select fields to export', {
        position: 'top-center',
        toastId: 'export-error',
      });
    }
    setLoading(true);
    OrganizerService.fetchAndExportData(
      `${realType[type]}/event/${event}/all`,
      (err, data) => {
        setLoading(false);
        if (err) {
          toasts.error('Export 👺', err);
        } else {
          console.log(data);
          console.log("selected Fields", selectedFields)
          __exportDataToExcel(data.data, selectedFields, type)
        }
      }
    );
  };

  useEffect(() => {
    const event = pathname.split('/')[2];
    setEvent(event);
  }, [pathname]);

  // Extract field names dynamically
  const extractFieldNames = (obj: Record<string, any>, parentKey = ''): string[] => {
    return Object.keys(obj).flatMap((key) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === 'object' && !Array.isArray(obj[key]) && obj[key] !== null) {
        return extractFieldNames(obj[key], fullKey);
      }
      return fullKey;
    });
  };

  const fieldNames = extractFieldNames(data);

  return (
    <Modal isOpen={state} onClose={() => onClose(false)} title="Export Data" size="xl">
      <div className="flex flex-col w-full px-4 gap-y-6">
        <div className={cn(
          "w-full grid gap-4",
          type === "tokens" ? "grid-cols-3" : "grid-cols-1"
        )}>
          {fieldNames.map((field) => {
            if (field.includes("__")) return
            return (
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
                  {field.replaceAll(".", " > ")}
                </label>
              </div>
            )
          })}
        </div>

        <div className="flex gap-10 mt-4 items-center justify-center">
          <Button
            variant="outline"
            text="Cancel"
            className="min-w-[120px]"
            onClick={() => onClose(false)}
          />
          <Button
            variant="primary"
            text={loading ? 'Hang on....' : 'Proceed'}
            disabled={loading}
            className="min-w-[120px]"
            onClick={handleProceed}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ExportDataModal;
