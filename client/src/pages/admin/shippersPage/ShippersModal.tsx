import Button from '../components/ui/button/Button';
import Label from '../components/form/Label';
import Input from '../components/form/input/InputField';
import TextArea from '../components/form/input/TextArea';
import Checkbox from "../components/form/input/Checkbox";
import DropzoneComponent from '../components/form/form-elements/DropZone';
import { Modal } from "../components/ui/modal";
import { Controller } from 'react-hook-form';
import { ShipperResponse } from '../../../lib/types';

enum ShipperAction {
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete'
}

export default function ShipperModal({
    action,
    isOpen,
    closeModal,
    onSubmit,
    handleSubmit,
    control,
    register,
    activeShipper
}: {
  action: ShipperAction,
  isOpen: boolean,
  activeShipper: ShipperResponse,
  closeModal: () => void;
  onSubmit: () => void;
  handleSubmit: () => void;
  control: () => void;
  register: () => void;
}) {
    const isEdit = action && activeShipper && action == ShipperAction.EDIT.toLocaleUpperCase();
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {ShipperAction[action]} Shipper
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        { action === "DELETE" ? (
          <div className="px-2 mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this Shipper? This action cannot be undone.
            </p>
          </div>
        ) : (
          <>
          <div className="px-2 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input type="text" value={isEdit && activeShipper.company_name}  placeholder="Enter Shipper name" name='company_name' register={register('company_name', { required: true })} />
              </div>

              <div>
                <Label>Number</Label>
                <Input type="text" value={isEdit && activeShipper.phone} placeholder="Enter Shipper Phone" name='phone' register={register('phone', { required: true })} />
              </div>
            </div>
            <div className="grid mt-8">
              <Checkbox label="Is Active" checked={isEdit && activeShipper.isActive} register={register('isActive')}/>
            </div>
            {/* <div className="grid mt-8">
              <DropzoneComponent />
            </div> */}
          </div>
          </>
      )}
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="sm">
              {ShipperAction[action]} Shipper
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
