import Modal from "@/components/modal";
import Button from "@/components/core/button";
import RejectForm from "@/components/forms/settlements/reject";

interface Props {
  state: boolean;
  onClose: (state: boolean) => void;
  data: any;
  onPrevClose: (state: boolean) => void;
  prevState: boolean;
}

export default function  RejectSettlementModal({
  state,
  onClose,
  data,
  onPrevClose,
  prevState,
}: Props) {
  console.log(data);

  function initialSettlement() {
    onClose(false); // Update to close the modal
    onPrevClose(prevState);
  }

  return (
    <Modal size="xl" onClose={onClose} title="Rejection" isOpen={state}>
      <RejectForm onClose={() => onClose(false)} data={null} />

      <div className="mx-auto pt-8 flex items-center gap-4 w-full max-w-[80%]">
        <Button
          onClick={() => onClose(false)}
          variant="outline"
          className="w-1/2"
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={initialSettlement} className="w-1/2">
          Reject
        </Button>
      </div>
    </Modal>
  );
}
