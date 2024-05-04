import {
  Button,
  Image,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from "@nextui-org/react";
import React from "react";
import { users } from "./data";

const rowsPerPage = 8;

export default function CourseAdmin() {
  const [page, setPage] = React.useState(1);
  const pages = Math.ceil(users.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return users.slice(start, end);
  }, [page, users]);
  return (
    <div className="p-4">
      <div className="flex items-center justify-between w-full mb-2">
        <h3 className="text-lg font-bold">Courses</h3>
        <Button color="primary">Create</Button>
      </div>
      <div className="mb-2">Total: {users.length}</div>
      <Table
        aria-label="Example table with client side pagination"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key="image"></TableColumn>
          <TableColumn key="name">NAME</TableColumn>
          <TableColumn key="isntructor">INSTRUCTOR</TableColumn>
          <TableColumn key="totalLearner">TOTAL LEARNER</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item) => (
            <TableRow key={item.name}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "image" ? (
                    <Image
                      width={80}
                      src="https://file.coin98.com/insights/chi-se-cam-nhan-1614179468452.png"
                      className="rounded-none"
                    />
                  ) : (
                    getKeyValue(item, columnKey)
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
