import axios from "axios";
const url = "https://jsonplaceholder.typicode.com/posts";
async function GetData() {
  let options = {
    url: `${url}`,
  };
  let response = await axios(options);
  const data = await response.data;
  return data;
}

async function PostData(params, method, id) {
  if (id) {
    delete params.userId;
  }
  try {
    let options = {
      method: method,
      url: `${url}${id ? `/${id}` : ""}`,
      body: JSON.stringify(params),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    };
    let response = await axios(options);
    const data = await response.data;
    return data;
  } catch (err) {
    console.log("err", err);
  }
}

async function DeleteData(id) {
  let options = {
    method: "DELETE",
    url: `${url}/${id}`,
  };
  let response = await axios(options);
  const data = await response.data;
  return data;
}

module.exports = {
  async GetListData() {
    const data = GetData();
    return data;
  },
  async AddListData(params) {
    const data = await PostData(params, "POST");
    return data;
  },
  async EditListData(params) {
    const data = await PostData(params, "PATCH", params?.userId);
    return data;
  },
  async DeleteListData(params) {
    const data = await DeleteData(params);
    return data;
  },
};
