/* eslint-disable @typescript-eslint/no-explicit-any */
import { useExistingItems } from "@/hooks/useExistingItems";
import FormModal from "./FormModal";
import { useCategories } from "@/hooks/useCategories";

export type FormContainerProps = {
  table: "inventory" | "expenses" | "loans" | "categories";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = ({ table, type, data, id }: FormContainerProps) => {
  const { categories } = useCategories();
  const { existingItems } = useExistingItems();
  let relatedData: any = {};

  if (type !== "delete") {
    switch (table) {
      case "inventory":
        relatedData = { categories };
        break;
      case "expenses":
        relatedData = { existingItems };
        break;
      case "loans":
        relatedData = { existingItems };
        break;
      default:
        break;
    }
  }
  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        // relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
