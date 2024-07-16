import { Link } from "react-router-dom";
import PropTypes from "prop-types";
function Attribute({ item, addition, excepted = [] }) {
  const exceptedSet = new Set(excepted);

  const renderAction = (a) => {
    switch (a.type) {
      case "link":
        return <Link to={a?.action}>{a.name}</Link>;
      case "button":
        return (
          <button
            className="btn btn-primary"
            onClick={() => a.action(item?.id)}
          >
            {a?.name}
          </button>
        );
      default:
        return null;
    }
  };

  const renderItemContent = (value) => {
    if (value.length && Array.isArray(value)) {
      return value.map((v, i) => <div key={i}>{v}</div>);
    }
    return value ?? "";
  };

  return (
    <tr>
      {item &&
        Object.keys(item)?.map(
          (k) =>
            !exceptedSet?.has(k) && (
              <td key={k}>{renderItemContent(item[k])}</td>
            )
        )}

      {addition?.map((a, i) => (
        <td key={i}>{renderAction(a)}</td>
      ))}
    </tr>
  );
}

export default Attribute;

Attribute.propTypes = {
  item: PropTypes.shape({}).isRequired,
};
