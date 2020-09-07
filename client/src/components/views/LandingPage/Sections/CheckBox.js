import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";
const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);
  const handleToggle = (key) => {
    const currentIndex = Checked.indexOf(key);
    let newChecked = [...Checked];
    if (currentIndex === -1) {
      newChecked.push(key);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    props.handleFilters(newChecked);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value.key)}
          checked={Checked.indexOf(value.key) === -1 ? false : true}
        >
          {value.value}
        </Checkbox>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse>
        <Panel header="Continents" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
