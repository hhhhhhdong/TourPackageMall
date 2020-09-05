import React, { useState } from "react";
import { Collapse, Radio } from "antd";
const { Panel } = Collapse;

function RadioBox(props) {
  const [Value, setValue] = useState(1);
  const renderRadioBox = () =>
    props.list &&
    props.list.map((value) => (
      <Radio key={value.key} value={value.key}>
        {value.name}
      </Radio>
    ));
  const handleChange = (event) => {
    setValue(event.target.value);
    props.handleFilters(event.target.value);
  };
  return (
    <div>
      <Collapse>
        <Panel header="This is panel header 1" key="1">
          <Radio.Group onChange={handleChange} value={Value}>
            {renderRadioBox()}
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
