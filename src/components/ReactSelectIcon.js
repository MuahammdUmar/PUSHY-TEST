import Select, { components, } from "react-select";
import { FaSearch } from 'react-icons/fa';


const ReactSelectIcon = ({ children, ...props }) => {
    // // @ts-ignore
    // const { onSearchIconClick } = props.selectProps;
    // const style = { cursor: "pointer", padding: "0 5px" };
  
    // return (
    //   <components.Control {...props}>
    //     <span onMouseDown={onSearchIconClick} style={style}>
    //       <div><FaSearch />lkjlkjlkjlk</div>
    //     </span>
    //     {children}
    //   </components.Control>
    // );
    // @ts-ignore
    const { emoji, onEmojiClick } = props.selectProps;
    const style = { cursor: "pointer" };
  
    return (
      <components.Control {...props}>
        <span onMouseDown={onEmojiClick} style={style}>
          <div>Hello</div>
        </span>
        {children}
      </components.Control>
    );
  };
export default ReactSelectIcon  