
type o = {
  [k: string]: any
}

export interface Opts {
  namespace: string;
  sessionStorage?: boolean;
  keepAlive?: boolean;
}

export default function useKeepState(
  initState: o,
  opts?: string | Opts
) : [
  o,
  (args: o) => void
];
