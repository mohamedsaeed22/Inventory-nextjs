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
  let relatedData: any = {};
  if (type !== "delete") {
    switch (table) {
      case "inventory":
        const { categories } = useCategories();
        relatedData = { categories };
        break;
      case "expenses":
        const { existingItems } = useExistingItems();
        relatedData = { existingItems };
        break;
      case "loans":
        const { existingItems: loansExistingItems } = useExistingItems();
        relatedData = { existingItems: loansExistingItems };
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
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
