export interface IMockButtonSelect {
  description: string;
  bgColor: string;
  id: string;
}

const mockButtonSelect: IMockButtonSelect[] = [
  {
    description: 'false',
    bgColor: 'bg_red',
    id: 'e1321b74-fd2e-419f-a6b5-3fcb41f7d5cc',
  },
  {
    description: 'true',
    bgColor: 'bg_green',
    id: 'd47021da-dd6a-4d25-95c9-43b8dca2d374',
  },
];

export { mockButtonSelect };
