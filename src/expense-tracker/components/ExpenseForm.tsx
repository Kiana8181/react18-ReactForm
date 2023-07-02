import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import categories from "../categories";

const schema = z.object({
  description: z
    .string()
    .min(3, { message: "Description should be at least 3 character!!!" })
    .max(50),
  amount: z
    .number({ invalid_type_error: "Amount field is required!!" })
    .min(0.01)
    .max(100_000),
  category: z.enum(categories, {
    errorMap: () => ({
      message: "Category is required.",
    }),
  }),
});

type ExpenseFormData = z.infer<typeof schema>;

interface Props {
  onSubmit: (date: ExpenseFormData) => void;
}

const ExpenseForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExpenseFormData>({ resolver: zodResolver(schema) });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
        reset();
      })}
    >
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />
      </div>
      {errors.description && (
        <p className="text-danger">{errors.description.message}</p>
      )}

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register("amount", { valueAsNumber: true })}
          id="amount"
          type="number"
          className="form-control"
        />
      </div>
      {errors.amount && <p className="text-danger">{errors.amount.message}</p>}

      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          category
        </label>
        <select {...register("category")} id="category" className="form-select">
          <option value=""></option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {errors.category && (
        <p className="text-danger">{errors.category.message}</p>
      )}
      <button className="btn btn-primary">Submit</button>
    </form>
  );
};

export default ExpenseForm;
