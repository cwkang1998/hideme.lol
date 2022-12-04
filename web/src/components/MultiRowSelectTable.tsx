import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  CheckboxGroup,
  Checkbox,
} from "@chakra-ui/react";

export type MultiRowSelectTableProps = {
  rowTitles?: string[];
  rowValues?: string[];
  selectedRows: (string | number)[];
  onChange: (nextVals: (string | number)[]) => void;
};

export const MultiRowSelectTable = ({
  rowTitles = [],
  rowValues = [],
  selectedRows,
  onChange = () => {},
}: MultiRowSelectTableProps) => {
  return (
    <TableContainer w="100%">
      <form>
        <CheckboxGroup onChange={onChange} value={selectedRows}>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th className="text">Keys</Th>
                <Th className="text">Value</Th>
                <Th className="text">Selection</Th>
              </Tr>
            </Thead>
            <Tbody>
              {rowTitles.map((row, idx) => {
                if (row !== "-") {
                  return (
                    <Tr key={idx}>
                      <Td>{row}</Td>
                      <Td>{rowValues[idx]}</Td>
                      <Td>
                        <Checkbox
                          value={`${idx}`}
                          isChecked={
                            selectedRows && selectedRows.includes(`${idx}`)
                          }
                        />
                      </Td>
                    </Tr>
                  );
                }
                return undefined;
              })}
            </Tbody>
          </Table>
        </CheckboxGroup>
      </form>
    </TableContainer>
  );
};
