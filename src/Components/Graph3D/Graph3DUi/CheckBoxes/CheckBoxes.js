import MyCheckBox from "../../../components/checkbox/myCheckBox"


const CheckBoxes = ({ checkBoxes }) => {
    return (<div className="checkboxes">
        {checkBoxes.map((checkBox, index) => {
            return (
                <div key={index}>
                    <MyCheckBox
                        text={checkBox.text}
                        onClick={checkBox.onClick}
                        checked={checkBox.checked}
                    />
                </div>
            )
        })}
    </div >
    )
}

export default CheckBoxes;