import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "../../helpers/axios-instance";

const initialState = {
  name: "",
  phone: "",
  email: "",
  address: "",
  long: "",
  lat: "",
  nid: "",
  image: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return {
        name: action.payload.name ?? state.name,
        phone: action.payload.phone ?? state.phone,
        email: action.payload.email ?? state.email,
        address: action.payload.address ?? state.address,
        long: action.payload.long ?? state.long,
        lat: action.payload.lat ?? state.lat,
        nid: action.payload.nid ?? state.nid,
        image: action.payload.image ?? state.image,
      };

    default:
      throw new Error("Unexpected action");
  }
}

export default function CreatePage() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name", state.name);
    data.append("phone", state.phone);
    data.append("email", state.email);
    data.append("address", state.address);
    data.append("long", state.long);
    data.append("lat", state.lat);
    data.append("nid", state.nid);
    data.append("image", state.image);

    try {
      await axios.post("phone-books", data);
      router.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  const inputChangeHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    dispatch({
      type: "add",
      payload: {
        [name]: name === "image" ? event.target.files[0] : value.trim(),
      },
    });
  };

  return (
    <React.Fragment>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Phone Book App</span>
        </div>
      </nav>

      <main className="mt-5">
        <section>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    <span>Phone Book Create</span>

                    <Link href="/">
                      <a className="btn btn-primary">Home</a>
                    </Link>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Name
                        </label>
                        <input
                          name="name"
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Name"
                          onChange={inputChangeHandler}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput2"
                          className="form-label"
                        >
                          Phone
                        </label>
                        <input
                          name="phone"
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput2"
                          placeholder="0123456789"
                          onChange={inputChangeHandler}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput3"
                          className="form-label"
                        >
                          Email address
                        </label>
                        <input
                          name="email"
                          type="email"
                          className="form-control"
                          id="exampleFormControlInput3"
                          placeholder="name@example.com"
                          onChange={inputChangeHandler}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput4"
                          className="form-label"
                        >
                          Address
                        </label>
                        <input
                          name="address"
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput4"
                          placeholder="address"
                          onChange={inputChangeHandler}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput5"
                          className="form-label"
                        >
                          Latitude
                        </label>
                        <input
                          name="lat"
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput5"
                          placeholder="lat"
                          onChange={inputChangeHandler}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput6"
                          className="form-label"
                        >
                          Longitude
                        </label>
                        <input
                          name="long"
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput6"
                          placeholder="long"
                          onChange={inputChangeHandler}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput7"
                          className="form-label"
                        >
                          NID
                        </label>
                        <input
                          name="nid"
                          type="number"
                          className="form-control"
                          id="exampleFormControlInput8"
                          placeholder="0123456789"
                          onChange={inputChangeHandler}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">
                          Image
                        </label>
                        <input
                          name="image"
                          className="form-control"
                          type="file"
                          id="formFile"
                          onChange={inputChangeHandler}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="card-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={submitHandler}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
}
