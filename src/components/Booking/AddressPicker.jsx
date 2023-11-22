import React, { useEffect, useState } from "react";
import axios from "axios";

export const AddressPicker = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
      );
      setCities(response.data);
    };

    fetchData();
  }, []);

  const handleCityChange = (e) => {
    const cityId = e.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict("");
    setSelectedWard("");

    if (cityId) {
      const selectedCity = cities.find((city) => city.Id === cityId);

      if (selectedCity) {
        setDistricts(selectedCity.Districts);
      }
    } else {
      setDistricts([]);
      setWards([]);
    }
  };

  const handleDistrictChange = (e) => {
    const districtId = e.target.value;
    setSelectedDistrict(districtId);
    setSelectedWard("");

    if (districtId) {
      const selectedDistrict = districts.find(
        (district) => district.Id === districtId,
      );

      if (selectedDistrict) {
        setWards(selectedDistrict.Wards);
      }
    } else {
      setWards([]);
    }
  };

  return (
    <div>
      <select
        className="form-select form-select-sm mb-3"
        id="city"
        aria-label=".form-select-sm"
        value={selectedCity}
        onChange={handleCityChange}
      >
        <option value="" disabled>
          Chọn tỉnh thành
        </option>
        {cities.map((city) => (
          <option key={city.Id} value={city.Id}>
            {city.Name}
          </option>
        ))}
      </select>

      <select
        className="form-select form-select-sm mb-3"
        id="district"
        aria-label=".form-select-sm"
        value={selectedDistrict}
        onChange={handleDistrictChange}
      >
        <option value="" disabled>
          Chọn quận huyện
        </option>
        {districts.map((district) => (
          <option key={district.Id} value={district.Id}>
            {district.Name}
          </option>
        ))}
      </select>

      <select
        className="form-select form-select-sm"
        id="ward"
        aria-label=".form-select-sm"
        value={selectedWard}
        onChange={(e) => setSelectedWard(e.target.value)}
      >
        <option value="" disabled>
          Chọn phường xã
        </option>
        {wards.map((ward) => (
          <option key={ward.Id} value={ward.Id}>
            {ward.Name}
          </option>
        ))}
      </select>
    </div>
  );
};
