import React from "react";
import Select from "react-select";

const Footer = (props) => {
    const options = [
      { value: "Malaysia", label: "Malaysia" },
      { value: "Singapore", label: "Singapore" },
    ];

    return (
      <>
        <div className="footer">
          <p className="rights">© 2022 DemoStore</p>
          <p>
            To complete checkout on Ablr's staging environment, refer to our
            Test Credentials documentation.
          </p>
          <Select
            className="select-country"
            defaultValue={props.currency === "MYR" ? options[0] : options[1]}
            onChange={props.handleChange}
            options={options}
            menuPlacement={"top"}
          />
        </div>
      </>
    );
}

export default Footer; 