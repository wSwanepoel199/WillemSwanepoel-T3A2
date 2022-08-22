import backEndAPI from "../utils/api";

export async function postImage(data) {
  const response = await backEndAPI.post('', data, {
    headers: {
      'Content-Type': "multipart/form-data"
    }
  });
  return response;
}