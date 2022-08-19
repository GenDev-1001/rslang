export interface IMockButtonSelect {
  description: string;
  bgColor: string;
  id: string;
}

const mockButtonSelect: IMockButtonSelect[] = [
  {
    description: 'false',
    bgColor: 'bg_red',
    id: '827bcc74-d2a1-4745-8bb5-26ac5645e1cd',
  },
  {
    description: 'true',
    bgColor: 'bg_green',
    id: 'c653bec0-245a-46eb-9692-12751d6ab3c1',
  },
];

export { mockButtonSelect };
