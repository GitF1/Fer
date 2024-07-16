import { memo, useMemo } from "react";

function Field({ fields = [], excepted = [] }) {
  const exceptedSet = useMemo(() => new Set(excepted), [excepted]);
  return (
    <tr>
      {fields
        .filter((f) => !exceptedSet?.has(f))
        .map((f) => (
          <th key={f}>{f}</th>
        ))}
    </tr>
  );
}

export default memo(Field);
