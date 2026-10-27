import { CreateButton } from '@/components/refine-ui/buttons/create'
import { DataTable } from '@/components/refine-ui/data-table/data-table'
import { Breadcrumb } from '@/components/refine-ui/layout/breadcrumb'
import { ListView } from '@/components/refine-ui/views/list-view'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { DEPARTMENT_OPTIONS } from '@/constants'
import { Subject } from '@/types'
import { useTable } from '@refinedev/react-table'
import { ColumnDef } from '@tanstack/react-table'
import { Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'

const SubjectsList = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const [selectedDepartment, setselectedDepartment] = useState("all");

  const departmentFilters = selectedDepartment === 'all' ? [] : [
    { field: 'department', operator: 'eq' as const, value: selectedDepartment}
  ];
  const searchFilters = searchQuery ? [
    {field: 'name', operator: 'contains' as const, value: searchQuery}
  ] : [];

  const subjectTable = useTable<Subject>({
    columns: useMemo<ColumnDef<Subject>[]>(
      () => [
        {
          id: "code",
          accessorKey: "code",
          size: 100,
          header: () => <p className="ml-4 font-semibold">Code</p>,
          cell: ({ getValue }) => <Badge>{getValue<string>()}</Badge>,
        },
        {
          id: "name",
          accessorKey: "name",
          size: 200,
          header: () => <p className="ml-4 font-semibold">Name</p>,
          cell: ({ getValue }) => <span className='text-muted-foreground'>{getValue<string>()}</span>,
          filterFn: "includesString",
        },
        {
          id: "department",
          accessorKey: "department",
          size: 150,
          header: () => <p className="ml-4 font-semibold">Department</p>,
          cell: ({ getValue }) => (
            <Badge variant={"secondary"}>{getValue<string>()}</Badge>
          ),
        },
        {
          id: "description",
          accessorKey: "description",
          size: 300,
          header: () => <p className="ml-4 font-semibold">Description</p>,
          cell: ({ getValue }) => <span className='truncate line-clamp-2 text-muted-foreground'>{getValue<string>()}</span>,
          filterFn: "includesString",
        },
      ],
      [],
    ),
    refineCoreProps: {
      resource: "subjects",
      pagination: { pageSize: 10, mode: "server" },
      filters: {
        permanent: [...departmentFilters, ...searchFilters]
      },
      sorters: {
        initial: [
          {field: 'id', order: 'desc'},
        ]
      },
    },
  });
  return (
    <ListView>
      <Breadcrumb />
      <h1 className='text-3xl font-semibold tracking-tight text-foreground'>Subjects</h1>
      <div>
        <p className='text-muted-foreground'>Quick access to essential management tools</p>
      </div>
      <div className='flex flex-col md:flex-row gap-4'>
        <div className='relative w-full max-h-9 md:max-w-72'>
          <Search  className='absolute top-1/2 -translate-y-1/2 h-4 w-4 text-primary left-3'/>
          <Input 
            className='pl-10 w-full' 
            type='text' 
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setsearchQuery(e.target.value)}  
          />
        </div>
        <div className='flex gap-4 w-full sm:w-auto'>
          <Select value={selectedDepartment} onValueChange={setselectedDepartment}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Department"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>
                All departments
              </SelectItem>
              {DEPARTMENT_OPTIONS.map((departments) => (
                <SelectItem key={departments.value} value={departments.value}>
                  {departments.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <CreateButton />
        </div>
      </div>

      <DataTable table={subjectTable}/>
    </ListView>
  )
}

export default SubjectsList