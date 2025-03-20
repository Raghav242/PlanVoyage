import React, { useState } from 'react';

export default function SuggestedPlans() {
  // State to manage the modal visibility
  const [showModal, setShowModal] = useState(false);

  // State for form fields
  const [formData, setFormData] = useState({
    city: '',
    name: '',
    places: '',
    description: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission (Add button)
  const handleAddSuggestion = (e) => {
    e.preventDefault();
    alert('Suggestion Added');
    // Here you can handle submitting the form data to a server or state management
    setShowModal(false); // Close the modal after submitting
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Suggested Plans</h1>

      {/* Add Suggestion Button */}
      <div className="mb-4 text-center">
        <button className="btn btn-success" onClick={() => setShowModal(true)}>
          Add Suggestion
        </button>
      </div>

      {/* Table Placeholder */}
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Plan Name</th>
            <th scope="col">Destination</th>
            <th scope="col">Duration</th>
            <th scope="col">Price</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Placeholder Row 1 */}
          <tr>
            <th scope="row">1</th>
            <td>Summer Adventure</td>
            <td>Paris, France</td>
            <td>7 Days</td>
            <td>$1500</td>
            <td>
              <button className="btn btn-primary btn-sm me-3">View</button>
              <button className="btn btn-warning btn-sm me-3">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>

          {/* Placeholder Row 2 */}
          <tr>
            <th scope="row">2</th>
            <td>Beach Getaway</td>
            <td>Bali, Indonesia</td>
            <td>5 Days</td>
            <td>$1200</td>
            <td>
              <button className="btn btn-primary btn-sm me-3">View</button>
              <button className="btn btn-warning btn-sm me-3">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>

          {/* Placeholder Row 3 */}
          <tr>
            <th scope="row">3</th>
            <td>Mountain Retreat</td>
            <td>Swiss Alps</td>
            <td>4 Days</td>
            <td>$2000</td>
            <td>
              <button className="btn btn-primary btn-sm me-3">View</button>
              <button className="btn btn-warning btn-sm me-3">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Modal for Add Suggestion Form */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          aria-labelledby="exampleModalLabel"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add Suggestion
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Form */}
                <form onSubmit={handleAddSuggestion}>
                  {/* City */}
                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      className="form-control"
                      placeholder="Enter City"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Plan Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Plan Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      placeholder="Enter Plan Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Places */}
                  <div className="mb-3">
                    <label htmlFor="places" className="form-label">
                      Places to Visit
                    </label>
                    <input
                      type="text"
                      id="places"
                      name="places"
                      className="form-control"
                      placeholder="Enter Places"
                      value={formData.places}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Description */}
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      placeholder="Enter Description"
                      value={formData.description}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  {/* Add Button */}
                  <button type="submit" className="btn btn-success w-100">
                    Add Suggestion
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
