import Button from '../components/ui/button/Button';
import Label from '../components/form/Label';
import Input from '../components/form/input/InputField';
import TextArea from '../components/form/input/TextArea';
import Checkbox from "../components/form/input/Checkbox";
import DropzoneComponent from '../components/form/form-elements/DropZone';
import { Modal } from "../components/ui/modal";
import { Controller } from 'react-hook-form';
import { CategoryResponse } from '../../../lib/types';

enum CategoryAction {
  CREATE = 'Create',
  EDIT = 'Edit',
  DELETE = 'Delete'
}

export default function CategoryModal({
    action,
    isOpen,
    closeModal,
    onSubmit,
    handleSubmit,
    control,
    register,
    activeCategory
}: {
  action: CategoryAction,
  isOpen: boolean,
  activeCategory: CategoryResponse,
  closeModal: () => void;
  onSubmit: () => void;
  handleSubmit: () => void;
  control: () => void;
  register: () => void;
}) {
    const isEdit = action && activeCategory && action == CategoryAction.EDIT.toLocaleUpperCase();
  return (
    <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
      <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            {CategoryAction[action]} Category
          </h4>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        { action === "DELETE" ? (
          <div className="px-2 mb-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this category? This action cannot be undone.
            </p>
          </div>
        ) : (
          <>
          <div className="px-2 overflow-y-auto custom-scrollbar">
            {/* <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
              <div>
                <Label>Name</Label>
                <Input type="text" value={isEdit && activeCategory.category_name}  placeholder="Enter category name" name='category_name' register={register('category_name', { required: true })} />
              </div>

              <div>
                <Label>Slug</Label>
                <Input type="text" value={isEdit && activeCategory.slug} placeholder="Enter category slug" name='slug' register={register('slug', { required: true })} />
              </div>
            </div> */}
            <div className="grid mt-8">
            <Label>Description</Label>
            {/* <Controller
              control={control}
              name="description"
              rules={{ required: 'Description is required' }}
              render={({ field: { onChange, value } }) => (
              <TextArea
                rows={6}
                value={(isEdit && !value)  ? activeCategory.slug : value}
                error
                onChange={onChange}
                placeholder="Enter category description"
              />
            )}
            /> */}
            </div>
            <div className="grid mt-8">
              <Checkbox label="Is Active" register={register('isActive')}/>
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
              {CategoryAction[action]} Category
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
