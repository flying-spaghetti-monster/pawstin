import Button from '../components/ui/button/Button';
import Label from '../components/form/Label';
import Input from '../components/form/input/InputField';
import TextArea from '../components/form/input/TextArea';
import Checkbox from "../components/form/input/Checkbox";
import DropzoneComponent from '../components/form/form-elements/DropZone';
import { Modal } from "../components/ui/modal";
import { Controller } from 'react-hook-form';
import { ProductResponse } from '../../../lib/types';
import Select from '../components/form/Select';

enum ProductAction {
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete'
}

export default function ProductModal({
  action,
  isOpen,
  closeModal,
  onSubmit,
  handleSubmit,
  control,
  register,
  activeProduct
}: {
  action: ProductAction,
  isOpen: boolean,
  activeProduct: ProductResponse,
  closeModal: () => void;
  onSubmit: () => void;
  handleSubmit: () => void;
  control: () => void;
  register: () => void;
}) {
  const isEdit = action && activeProduct && action == ProductAction.EDIT.toLocaleUpperCase();

  //TODO reuse from DB + register validation
  const options = [
    { value: "marketing", label: "Marketing" },
    { value: "template", label: "Template" },
    { value: "development", label: "Development" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {ProductAction[action]} Product
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {action === "DELETE" ? (
            <div className="px-2 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Are you sure you want to delete this product? This action cannot be undone.
              </p>
            </div>
          ) : (
            <>
              <div className="px-2 overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div>
                    <Label>Name</Label>
                    <Input type="text" value={isEdit && activeProduct.product_name} placeholder="Enter product name" name='product_name' register={register('product_name', { required: true })} />
                  </div>

                  <div>
                    <Label>Slug</Label>
                    <Input type="text" value={isEdit && activeProduct.slug} placeholder="Enter Product slug" name='slug' register={register('slug', { required: true })} />
                  </div>

                  <div>
                    <Label>Price</Label>
                    <Input type="text" value={isEdit && activeProduct.price} placeholder="Enter product name" name='price' register={register('price', { required: true })} />
                  </div>

                  <div>
                    <Label>Discont price</Label>
                    <Input type="text" value={isEdit && activeProduct.discont_price} placeholder="Enter product name" name='discont_price' register={register('discont_price', { required: true })} />
                  </div>

                  <div>
                    <Label>In Stock</Label>
                    <Input type="text" value={isEdit && activeProduct.in_stock} placeholder="Enter product name" name='in_stock' register={register('in_stock', { required: true })} />
                  </div>

                  <div>
                    <Label>Select Input</Label>
                    <Select
                      options={options}
                      placeholder="Select an option"
                      onChange={handleSelectChange}
                      className="dark:bg-dark-900"
                    />
                  </div>
                </div>
                <div className="grid mt-8">
                  <Label>Description</Label>
                  <Controller
                    control={control}
                    name="description"
                    rules={{ required: 'Description is required' }}
                    render={({ field: { onChange, value } }) => (
                      <TextArea
                        rows={6}
                        value={(isEdit && !value) ? activeProduct.description : value}
                        error
                        onChange={onChange}
                        placeholder="Enter product description"
                      />
                    )}
                  />
                </div>
                <div className="grid mt-8">
                  <Checkbox label="Is Active" register={register('isActive')} />
                </div>
                <div className="grid mt-8">
                  <DropzoneComponent />
                </div>
              </div>
            </>
          )}
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
            <Button size="sm">
              {ProductAction[action]} Product
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
