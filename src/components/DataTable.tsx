
import React from 'react';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Get column headers from the first row
  const columns = Object.keys(data[0]);

  return (
    <Card className="p-6 bg-gray-100 border-0 shadow-neumorphic">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Results</h3>
      <div className="bg-gray-50 rounded-lg shadow-neumorphic-inset overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-200 hover:bg-gray-200">
              {columns.map((column) => (
                <TableHead key={column} className="font-semibold text-gray-700 p-4">
                  {column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, ' ')}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index} className="hover:bg-gray-100 border-b border-gray-300">
                {columns.map((column) => (
                  <TableCell key={column} className="p-4 text-gray-700">
                    {row[column] !== null && row[column] !== undefined ? row[column].toString() : '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default DataTable;
