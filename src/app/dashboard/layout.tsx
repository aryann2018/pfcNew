import Dashboard from "./Dashboard";

export default function Main({ ...props }) {
  return <Dashboard>{props.children}</Dashboard>;
}
