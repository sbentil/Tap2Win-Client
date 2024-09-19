import Modal from "@/components/modal";
import InitiateSettlementsForm from "@/components/forms/settlements";
import Button from "@/components/core/button";

interface Props {
  state: boolean;
  onClose: (state: boolean) => void;
  data: any;
  onPrevClose: (state: boolean) => void;
  prevState: boolean;
}

export default function InitialSettlementsModal({
  state,
  onClose,
  data,
  onPrevClose,
  prevState,
}: Props) {
  console.log(data);

  function initialSettlement() {
    onClose(state);
    onPrevClose(prevState);
  }

  return (
    <Modal
      size="xl"
      onClose={onClose}
      title="Initiate Settlement"
      isOpen={state}
    >
      <InitiateSettlementsForm onClose={onClose} />
      <div className="mx-auto pt-8 flex items-center gap-4 w-full max-w-[80%]">
        <Button
          onClick={() => onClose(state)}
          variant="outline"
          className="w-1/2"
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={initialSettlement} className="w-1/2">
          Save
        </Button>
      </div>
    </Modal>
  );
}
