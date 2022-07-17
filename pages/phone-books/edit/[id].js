import * as React from "react";
import Link from "next/link";
import axios from "../../../helpers/axios-instance";
import { useRouter } from "next/router";

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

export default function EditPage(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { phoneBook } = props;

  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    dispatch({
      type: "add",
      payload: {
        name: phoneBook.name ?? "",
        phone: phoneBook.phone ?? "",
        email: phoneBook.email ?? "",
        address: phoneBook.address ?? "",
        long: phoneBook.location.long ?? "",
        lat: phoneBook.location.lat ?? "",
        nid: phoneBook.nid ?? "",
      },
    });
  }, [phoneBook]);

  const submitHandler = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("_method", "put");
    data.append("name", state.name);
    data.append("phone", state.phone);
    data.append("email", state.email);
    data.append("address", state.address);
    data.append("long", state.long);
    data.append("lat", state.lat);
    data.append("nid", state.nid);
    data.append("image", state.image);

    try {
      await axios.post(`phone-books/${id}`, data);
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

  const deleteHandler = async (event, id) => {
    event.preventDefault();
    await axios.delete(`/phone-books/${id}`);
    router.replace("/");
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
                    <span>Phone Book Edit</span>

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
                          value={state.name}
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
                          value={state.phone}
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
                          value={state.email}
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
                          value={state.address}
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
                          value={state.lat}
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
                          value={state.long}
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
                          value={state.nid}
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
                  <div className="card-footer d-flex justify-content-between align-items-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={submitHandler}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={(event) => deleteHandler(event, id)}
                    >
                      Delete
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

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data } = await axios.get(`phone-books/${id}`);

  return {
    props: {
      phoneBook: data.data,
    },
  };
}
