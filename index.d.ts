
type o = {
  [k: string]: any
}

export interface Opts {
  namespace: string | symbol;
  sessionStorage?: boolean;
  keepAlive?: boolean;
}

export default function useKeepState(
  initState: o,
  opts?: string | symbol | Opts
) : [
  o,
  (args: o) => void
];
