export interface IMockButtonLevel {
  description: string;
  bgColor: string;
  id: string;
}

const mockButtonLevel: IMockButtonLevel[] = [
  {
    description: '1',
    bgColor: 'bg_green',
    id: '827bcc74-d2a1-4745-8bb5-26ac5645e1cd',
  },
  {
    description: '2',
    bgColor: 'bg_yellow',
    id: 'c653bec0-245a-46eb-9692-12751d6ab3c1',
  },
  {
    description: '3',
    bgColor: 'bg_orange',
    id: '3956c473-1ccb-4cc6-9eec-15c1772805e2',
  },
  {
    description: '4',
    bgColor: 'bg_red',
    id: '5c6061da-ad7a-4114-af43-cf29a43ae404',
  },
  {
    description: '5',
    bgColor: 'bg_pink',
    id: '256ab900-dd77-41f0-bee4-8152a64edcfa',
  },
  {
    description: '6',
    bgColor: 'bg_purple',
    id: '256ab900-dd77-41f0-bee4-8152a64edcfa',
  },
];

export { mockButtonLevel };
