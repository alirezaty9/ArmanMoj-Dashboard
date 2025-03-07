import React from "react";

const Table = ({ headers, data, renderCell }) => {
    return (
        <div className="overflow-x-auto rounded-lg shadow">
            
            <table className="min-w-full bg-white">
                <thead className="bg-gray-900 text-white">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-3 md:px-6 py-3 text-right text-xs md:text-sm font-medium tracking-wider whitespace-nowrap"
                            >
                                {header.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="hover:bg-gray-50 transition-colors duration-200"
                        >
                            {headers.map((header, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="px-3 md:px-6 py-3 md:py-4 text-right text-xs md:text-sm text-gray-900 whitespace-nowrap"
                                >
                                    {renderCell ?
                                        renderCell(header.key, row[header.key], row) :
                                        row[header.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table; 