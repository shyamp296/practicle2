import React, { useState } from "react";
import "./Registration.css";

interface RegistrationFormData {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  dob: string;
  gender: "male" | "female" | "other";
  country: string;
  state: string;
  city: string;
  address: string;
  qualifications: string[];
  skills: string[];
  profile: File | null;
}

interface Country {
  name: string;
  states: State[];
}

interface State {
  name: string;
  cities: string[];
}

const countries: Country[] = [
  {
    name: "USA",
    states: [
      {
        name: "California",
        cities: ["Los Angeles", "San Francisco"],
      },
      {
        name: "Texas",
        cities: ["Houston", "Dallas"],
      },
    ],
  },
  {
    name: "Canada",
    states: [
      {
        name: "Ontario",
        cities: ["Toronto", "Ottawa"],
      },
      {
        name: "Quebec",
        cities: ["Montreal", "Quebec City"],
      },
    ],
  },
];

const RegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "male",
    country: "",
    state: "",
    city: "",
    address: "",
    qualifications: [],
    skills: [],
    profile: null,
  });
  const [showPassword, setshowPassword] = useState(false);

  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleShowPassword = () => {
    setshowPassword(!showPassword);
  };
  const handleQualificationsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;
    const updatedQualifications = checked
      ? [...formData.qualifications, value]
      : formData.qualifications.filter((q) => q !== value);
    setFormData({ ...formData, qualifications: updatedQualifications });
  };

  const handleSkillsChange = (selectedSkills: string[]) => {
    setFormData({ ...formData, skills: selectedSkills });
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      country: event.target.value,
      state: "",
      city: "",
    });
  };

  const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      state: event.target.value,
      city: "",
    });
  };

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      city: event.target.value,
    });
  };

  const getStates = () => {
    const country = countries.find((c) => c.name === formData.country);
    if (!country) {
      return [];
    }
    return country.states;
  };

  const getCities = () => {
    const country = countries.find((c) => c.name === formData.state);
    if (!country) {
      return [];
    }
    const state = country.states.find((s) => s.name === formData.city);
    if (!state) {
      return [];
    }
    return state.cities;
  };

  //   const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0] ?? null;
  //     setFormData({ ...formData, profile: file });
  //   };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Submit registration data to API here
    console.log(formData);
  };

  return (
    <>
      <div className="container">
        <div className="title"> Registration</div>
        <form onSubmit={handleSubmit}>
          <div className="content">
            {/* Firstname */}
            <div className="input-box">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* LastName */}
            <div className="input-box">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={formData.lastname}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* UserName */}
            <div className="input-box">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Email */}
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Phone Number */}
            <div className="input-box">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Password */}
            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                minLength={8}
                required
              />
              <button type="button" onClick={handleShowPassword}>
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {/* Confirm Password */}
            <div className="input-box">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              {formData.password !== formData.confirmPassword && (
                <span style={{ color: "red" }}>Passwords do not match</span>
              )}
            </div>
            {/* Date OF Birth */}
            <div className="input-box">
              <label htmlFor="dob">Date of Birth</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                max={
                  new Date(
                    new Date().setFullYear(new Date().getFullYear() - 18)
                  )
                    .toISOString()
                    .split("T")[0]
                }
                required
              />
            </div>
            {/* Gender radio */}
            <div className="input-box">
              <label className="Gender">Gender</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === "male"}
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === "female"}
                    onChange={handleInputChange}
                  />
                  Female
                </label>
              </div>
            </div>
            {/* Address */}
            <div className="input-box">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
           
              {/* Country dropdown */}
              <div className="input-box">
                <label htmlFor="country">Country</label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleCountryChange}
                  required
                >
                  {countries.map((country, index) => (
                    <option key={index} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* State dropdown */}
              <div className="input-box">
                <label htmlFor="state">State</label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleStateChange}
                  required
                >
                  {getStates().map((state, index) => (
                    <option key={index} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* City dropdown */}
              <div className="input-box">
                <label htmlFor="city">City</label>
                <select
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleCityChange}
                 
                >
                  {getCities().map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
          
            <div>
              <label>Qualification</label>
              <div>
                <label>
                  <input
                    type="checkbox"
                    name="qualifications"
                    value="highschool"
                    checked={formData.qualifications.includes("highschool")}
                    onChange={handleQualificationsChange}
                  />
                  High School
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="qualifications"
                    value="undergrad"
                    checked={formData.qualifications.includes("undergrad")}
                    onChange={handleQualificationsChange}
                  />
                  Undergraduate
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="qualifications"
                    value="postgrad"
                    checked={formData.qualifications.includes("postgrad")}
                    onChange={handleQualificationsChange}
                  />
                  Postgraduate
                </label>
              </div>
            </div>
            {/* <div>
        <label htmlFor="programmingSkills">Programming Skills</label>
        <select
          id="programmingSkills"
          name="programmingSkills"
          value={formData.programmingSkills}
          onChange={handleInputChange}
          multiple
          required
        >
        </select>
      </div> */}
            {/* <div>
        <label htmlFor="profilePicture">Profile Picture</label>
        <input
          type="file"
          id="profilePicture"
          name="profilePicture"
          accept="image/*"
          onChange={handleProfilePictureChange}
          required
        />
        {formData.profilePicture && (
          <span>
            {formData.profilePicture.name} (
            {(formData.profilePicture.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        )}
      </div> */}
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
