export interface IMockButtonLevel {
  description: string;
  bgColor: string;
  id: string;
}

const mockButtonLevel: IMockButtonLevel[] = [
  {
    description: '1',
    bgColor: 'bg_green',
    id: 'e7963452-a850-49c0-989b-237183a792b3',
  },
  {
    description: '2',
    bgColor: 'bg_yellow',
    id: '5954ccda-b5ef-4c74-a96a-d4d2ef0651ea',
  },
  {
    description: '3',
    bgColor: 'bg_orange',
    id: '2058a280-0fc6-4737-b77a-eb1fc27c509c',
  },
  {
    description: '4',
    bgColor: 'bg_red',
    id: 'e49e223b-94d8-4f61-b6a1-678c3205ae34',
  },
  {
    description: '5',
    bgColor: 'bg_pink',
    id: '8459a836-42b2-490f-a411-e5a6adc9a77d',
  },
  {
    description: '6',
    bgColor: 'bg_purple',
    id: '5a9d1ede-6c17-4977-a194-93c9959b1fad',
  },
];

export { mockButtonLevel };
