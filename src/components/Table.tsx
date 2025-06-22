/* eslint-disable @typescript-eslint/no-explicit-any */
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
    <div className="w-full mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              {columns.map((col) => (
                <th 
                  key={col.accessor} 
                  className={`${col.className} text-right px-6 py-4 text-sm font-semibold text-gray-700 tracking-wide`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          {/* if no data, show a message */}
          {data?.length === 0 ? (
            <tbody>
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="text-center py-12 text-gray-500 text-sm"
                >
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                      </svg>
                    </div>
                    <span className="font-medium">لا يوجد بيانات</span>
                    <span className="text-xs text-gray-400">لم يتم العثور على أي سجلات</span>
                  </div>
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody className="divide-y divide-gray-100">
              {data?.map((item, index) => (
                <tr 
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150 ease-in-out group"
                >
                  {renderRow(item)}
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Table;

 