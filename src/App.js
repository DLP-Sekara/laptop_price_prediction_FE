import React, { useEffect, useState } from "react";
import "./App.css"; // Import CSS file

function App() {
  const [formData, setFormData] = useState({
    ram: "",
    weight: "",
    company: "",
    typename: "",
    opsys: "",
    cpuname: "",
    gpuname: "",
    touchscreen: false,
    ips: false,
  });
  const [predValue, setPredValue] = useState(0);
  const [data, setdata] = useState({
    name: "",
    age: 0,
    date: "",
    programming: "",
  });
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  useEffect(() => {
    fetch("/data").then((res) =>
      res.json().then((data) => {
        setdata({
          name: data.Name,
          age: data.Age,
          date: data.Date,
          programming: data.programming,
        });
      })
    );
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(JSON.stringify(formData));
    fetch("/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setPredValue(data.prediction);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="wrapper">
      <div className="title">Predict Laptop Price...</div>
      <form onSubmit={handleSubmit} className="form">
        {/* Input fields */}

        {/* Ram */}
        <div className="inputfield">
          <label htmlFor="ram">Ram (GB)</label>
          <input
            className="input"
            type="text"
            name="ram"
            value={formData.ram}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Weight */}
        <div className="inputfield">
          <label htmlFor="weight">Weight (Kg)</label>
          <input
            className="input"
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Company */}
        <div className="inputfield">
          <label htmlFor="company">Company</label>
          <div className="custom_select">
            <select
              name="company"
              id="company"
              value={formData.company}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option value="acer">Acer</option>
              <option value="apple">Apple</option>
              <option value="asus">Asus</option>
              <option value="dell">Dell</option>
              <option value="hp">HP</option>
              <option value="lenovo">Lenovo</option>
              <option value="msi">MSI</option>
              <option value="toshiba">Toshiba</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Type */}
        <div className="inputfield">
          <label htmlFor="typename">Type Name</label>
          <div className="custom_select">
            <select
              name="typename"
              id="typename"
              value={formData.typename}
              onChange={handleInputChange}
              required
            >
              <option value="" disabled hidden>
                Select
              </option>
              <option value="2in1convertible">2 in 1 Convertible</option>
              <option value="gaming">Gaming</option>
              <option value="netbook">Net Book</option>
              <option value="notebook">Note Book</option>
              <option value="ultrabook">Ultra Book</option>
              <option value="workstation">Workstation</option>
            </select>
          </div>
        </div>

        {/* OS */}
        <div className="inputfield">
          <label htmlFor="opsys">Operating System</label>
          <div className="custom_select">
            <select
              name="opsys"
              id="opsys"
              value={formData.opsys}
              onChange={handleInputChange}
              required
            >
              <option value="" selected hidden>
                Select
              </option>
              <option value="windows">Windows</option>
              <option value="mac">Mac</option>
              <option value="linux">Linux</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* CPU */}
        <div className="inputfield">
          <label htmlFor="cpuname">CPU</label>
          <div className="custom_select">
            <select
              name="cpuname"
              id="cpuname"
              value={formData.cpuname}
              onChange={handleInputChange}
              required
            >
              <option value="" selected hidden>
                Select
              </option>
              <option value="intelcorei3">Intel Core i3</option>
              <option value="intelcorei5">Intel Core i5</option>
              <option value="intelcorei7">Intel Core i7</option>
              <option value="amd">AMD</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* GPU */}
        <div className="inputfield">
          <label htmlFor="gpuname">GPU</label>
          <div className="custom_select">
            <select
              name="gpuname"
              id="gpuname"
              value={formData.gpuname}
              onChange={handleInputChange}
              required
            >
              <option value="" selected hidden>
                Select
              </option>
              <option value="intel">Intel</option>
              <option value="amd">AMD</option>
              <option value="nvidia">Nvidia</option>
            </select>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="check">
          <div>
            <label htmlFor="touchscreen">Touch Screen</label>
            <input
              type="checkbox"
              name="touchscreen"
              checked={formData.touchscreen}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="ips">IPS</label>
            <input
              type="checkbox"
              name="ips"
              checked={formData.ips}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="inputfield">
          <input className="btn" type="submit" value="Predict Price" />
        </div>
      </form>

      {/* Display prediction */}
      {predValue !== 0 && (
        <div className="result">
          <p>Estimated Price : LKR {predValue}</p>
        </div>
      )}
    </div>
  );
}

export default App;
