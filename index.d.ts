
type o = {
  [k: string]: any
}

export interface Opts {
  namespace: string | symbol;
  sessionStorage?: boolean;
  keepAlive?: boolean;
}

export function useKeepState(
  initState: o,
  opts: string | symbol | Opts
) : [
  o,
  () => void
];
