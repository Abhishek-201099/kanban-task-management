import { useFieldArray, useForm } from "react-hook-form";

export default function CreateBoardForm({ isOpenModal, mainEl }) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      boardName: "",
      columns: [{ name: "Todo" }, { name: "Doing" }],
    },
  });

  const { append, remove, fields } = useFieldArray({
    name: "columns",
    control,
    rules: {
      required: "Add at least one column",
    },
  });

  function onSubmit(data) {
    console.log("formData : ", data);
    reset();
  }

  if (!isOpenModal) return null;

  return (
    <div className="modal">
      <form
        ref={mainEl}
        onSubmit={handleSubmit(onSubmit)}
        className="create-board-form"
      >
        <p className="board-form-heading">Add new board</p>
        <div className="board-form-name">
          <label htmlFor="boardName">Board Name</label>
          <input
            type="text"
            id="boardName"
            placeholder="e.g. Web Design"
            className={`${
              errors?.boardName?.message ? "board-input-error" : ""
            }`}
            {...register("boardName", { required: "This field is required" })}
          />
          {errors?.boardName?.message && (
            <p className="board-form-error">{errors?.boardName?.message}</p>
          )}
        </div>

        <div className="board-form-columns">
          <label>Board Column</label>
          {fields.map((column, index) => (
            <div key={column.id}>
              <div>
                <input
                  type="text"
                  {...register(`columns.${index}.name`, {
                    required: "This field is required",
                  })}
                  className={`${
                    errors?.columns?.[index]?.name?.message
                      ? "board-input-error"
                      : ""
                  }`}
                  defaultValue=""
                  placeholder={`Column name ${index + 1}`}
                />
                <button type="button" onClick={() => remove(index)}>
                  <img src="/icon-cross.svg" alt="remove icon" />
                </button>
              </div>
              {errors?.columns?.[index]?.name?.message && (
                <p className="board-form-error">
                  {errors?.columns?.[index]?.name?.message}
                </p>
              )}
            </div>
          ))}
          {errors?.columns?.root?.message && (
            <p className="board-form-error">{errors?.columns?.root?.message}</p>
          )}
        </div>

        <div className="board-form-btns">
          <button
            className="board-form-append"
            type="button"
            onClick={() => append({ name: "" })}
          >
            + Add New Column
          </button>

          <button className="board-form-submit" type="submit">
            Create New Board
          </button>
        </div>
      </form>
    </div>
  );
}
