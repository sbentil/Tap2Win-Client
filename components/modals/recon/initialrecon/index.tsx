import Modal from "@/components/modal";
import InitiateReconForm from "@/components/forms/recon";
import Button from "@/components/core/button";

interface Props {
  state: boolean;
  onClose: (state: boolean) => void;
  data: any;
  onPrevClose: (state: boolean) => void;
  prevState: boolean;
}

export default function InitialReconModal({
  state,
  onClose,
  data,
  onPrevClose,
  prevState,
}: Props) {
  console.log(data);

  function initialRecon() {
    onClose(state);
    onPrevClose(prevState);
  }

  return (
    <Modal
      size="xl"
      onClose={() => onClose(false)}
      title="Initiate Reconciliation"
      isOpen={state}
    >
      <InitiateReconForm onClose={onClose} />
      <div className="mx-auto pt-8 flex items-center gap-4 w-full max-w-[80%]">
        <Button
          onClick={() => onClose(state)}
          variant="outline"
          className="w-1/2"
        >
          Cancel
        </Button>
        <Button variant="primary" onClick={initialRecon} className="w-1/2">
          Save
        </Button>
      </div>
    </Modal>
  );
}
