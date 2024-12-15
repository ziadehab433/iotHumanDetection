import { useState, useEffect } from "react";
import '../Components/AddSensor.css';

export default function AddSensor({ onAddSensor, selectedLocation }) {
  const [formInputs, setFormInputs] = useState({
    name: "",
    status: "",
    NOM: "",
    period: "",
    location: null, // لإضافة الموقع
  });

  useEffect(() => {
    if (selectedLocation) {
      setFormInputs((prev) => ({ ...prev, location: selectedLocation }));
    }
  }, [selectedLocation]);

  const disable =
    formInputs.Name === "" ||
    formInputs.status === "" ||
    formInputs.NOM === "" ||
    formInputs.period === "" ||
    !formInputs.location;

  const handleAdd = (e) => {
    e.preventDefault();
    onAddSensor(formInputs); // إرسال البيانات إلى المكون الرئيسي
    setFormInputs({ Name: "", status: "", NOM: "", period: "", location: null });
  };

  return (
    <div className="form-container3">
      <form className="form3" onSubmit={handleAdd}>
        <h3>Add Sensor</h3>
        <div id="form3">
          <div>
            <input
              type="text"
              placeholder="Enter name of the sensor"
              value={formInputs.Name}
              onChange={(event) =>
                setFormInputs({ ...formInputs, Name: event.target.value })
              }
            />
          </div>
          <div>
            <label className="lab2">Activity:</label>
            <label className="lab2">On</label>
            <input
              value="on"
              type="radio"
              name="status"
              checked={formInputs.status === "on"}
              onChange={(event) =>
                setFormInputs({ ...formInputs, status: event.target.value })
              }
            />
            <label className="lab2">Off</label>
            <input
              value="off"
              type="radio"
              name="status"
              checked={formInputs.status === "off"}
              onChange={(event) =>
                setFormInputs({ ...formInputs, status: event.target.value })
              }
            />
          </div>
          <label className="lab2">Maintenance:</label>
          <div>
            <input
              type="number"
              min="1"
              max="50"
              value={formInputs.NOM}
              onChange={(event) =>
                setFormInputs({ ...formInputs, NOM: event.target.value })
              }
            />
            <select
              value={formInputs.period}
              onChange={(event) =>
                setFormInputs({ ...formInputs, period: event.target.value })
              }
            >
              <option>Week</option>
              <option>Month</option>
              <option>Year</option>
            </select>
          </div>
          <div>
            <p>Selected Location: {formInputs.location}</p>
          </div>
          <button disabled={disable}>Add</button>
        </div>
      </form>
    </div>
  );
}
