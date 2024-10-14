import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const AddressPage = () => {
  const { state } = useLocation();
  const [address, setAddress] = useState(null); // No initial address
  const user = useSelector((state) => state.userInfo.user);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false);
  const [addressDetails, setAddressDetails] = useState({
    pincode: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    landmark: "",
  });
  console.log(state)
  useEffect(() => {
    setAddress(user?.addresses);
    setAddressDetails(user?.addresses)
  }, [user]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAddressDetails({
      ...addressDetails,
      [id]: value,
    });
  };

  const handleSaveAddress = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/user/${user._id}/address`,
        addressDetails
      );

      if (response.status === 201) {
        if(state){
          navigate(`/cart`);
          enqueueSnackbar(response.data.msg, { variant: "success" });
          return 
        }
        enqueueSnackbar(response.data.msg, { variant: "success" });
        window.location.reload()
      } else {
        enqueueSnackbar("Error updating address", { variant: "warning" });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container my-5">
      <div className="row">
        {/* Address Details Box */}
        {address ? (
          <div className="col-md-8 mb-4">
            <div className="card">
              <div className="card-body text-center">
                <h5 className="card-title">Address Details</h5>
               
                <p>
                
                  {address.addressLine1}
                </p>
                <p>
                
                  {address.addressLine2}
                </p>
                <p>
                  <strong className="fw-bold">City:</strong> {address.city}
                </p>
                <p>
                  <strong className="fw-bold">State:</strong> {address.state}
                </p>
                <p>
                  <strong className="fw-bold">Landmark:</strong>{" "}
                  {address.landmark}
                </p>
                <p>
                  <strong className="fw-bold">Pincode:</strong>{" "}
                  {address.pincode}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-md-12 mb-4 text-center">
            <h5>No Address Found</h5>
          </div>
        )}

        {/* Edit/Add Address Box */}
        <div className="col-md-4 mb-4 text-center align-items-center">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            {address ? (
              <>
                <FaEdit /> Edit Address
              </>
            ) : (
              "Add Address"
            )}
          </button>
        </div>
      </div>

      {/* Edit/Add Address Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {address ? "Edit Address" : "Add Address"}
                </h5>
                <button
                  type="button"
                  className="close text-dark btn-danger ms-auto"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group mb-3">
                    <label htmlFor="landmark" className="fw-bold">
                      Landmark
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="landmark"
                      value={addressDetails.landmark}
                      onChange={handleInputChange}
                      placeholder="Landmark"
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label htmlFor="addressLine1" className="fw-bold">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="addressLine1"
                      value={addressDetails.addressLine1}
                      onChange={handleInputChange}
                      placeholder="Address Line 1"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="addressLine2" className="fw-bold">
                      Address Line 2
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="addressLine2"
                      value={addressDetails.addressLine2}
                      onChange={handleInputChange}
                      placeholder="Address Line 2"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="city" className="fw-bold">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="city"
                      value={addressDetails.city}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="state" className="fw-bold">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="state"
                      value={addressDetails.state}
                      onChange={handleInputChange}
                      placeholder="State"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="pincode" className="fw-bold">
                      Pincode
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="pincode"
                      value={addressDetails.pincode}
                      onChange={handleInputChange}
                      placeholder="Pincode"
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveAddress}
                >
                  {address ? "Save Address" : "Add Address"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop for the modal */}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default AddressPage;
