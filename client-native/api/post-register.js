import axios from "axios";

// IPv4
// Cande = 192.168.1.8
// Luciano = 192.168.0.26
// l3an = 192.168.1.109
// M4-T30 = 192.168.0.15

export default postRegisterUser = async (datos) => {
  return await axios({
    method: "post",
    url: "http://192.168.1.109:3001/api/users/register_user",
    data: datos,
  });
};