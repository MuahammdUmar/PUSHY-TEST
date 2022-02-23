import Select, {
    components,
    ControlProps,
    Props,
    StylesConfig
  } from "react-select";
  import { FaSearch } from 'react-icons/fa';

const Control = ({ children, ...props }) => {
     // @ts-ignore
    const { onSearchIconClick } = props.selectProps;
    const style = { cursor: "pointer", display: "inline-block", paddingLeft: "10px" };
  
    return (
      <components.Control {...props}>
        <span onMouseDown={onSearchIconClick} style={style}>
          <div><FaSearch /></div>
        </span>
        {children}
      </components.Control>
    );
  };
export default Control  