const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-8">
      <thead>
        <tr className="text-right text-gray-500 text-sm">
          {columns.map((col) => (
            <th key={col.accessor} className={`${col.className} text-right`}>
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      {/* if no data, show a message */}
      {data?.length === 0 ? (
        <tbody>
          <tr>
            <td colSpan={columns.length} className="text-center">
              لا يوجد بيانات
            </td>
          </tr>
        </tbody>
      ) : (
        <tbody>{data?.map((item) => renderRow(item))}</tbody>
      )}
    </table>
  );
};

export default Table;
