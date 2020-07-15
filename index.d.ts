
type state = {
  [k: string]: any
}

export interface Opts {
  namespace: string;
  sessionStorage?: boolean;
  keepAlive?: boolean;
}

export default function useKeepState(
  initState: state,
  opts?: string | Opts
) : [
  state,
  (args: state) => void,
  (namespace?: string) => void
];
