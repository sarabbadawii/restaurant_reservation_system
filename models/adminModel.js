const connection = require("../connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection);

class AdminModel {
  getAllAdmins() {
    const selectQuery = "SELECT * FROM admin ";
    const result = query(selectQuery);
    return result;
  }
  getAdminByToken(adminToken){
    const selectQuery  = "SELECT * FROM admin WHERE token = ?";
    const result = query(selectQuery, adminToken);
    return result;
  }

  getAdminByEmail(adminEmail) {
    const selectQuery  = "SELECT * FROM admin WHERE email = ?";
    const result = query(selectQuery, adminEmail);
    return result;
  }
  getAdminByPhone(adminPhone,email){
    const selectQuery = "SELECT * FROM admin WHERE phoneNumber = ? and email not in(?)"
    const result = query(selectQuery, [adminPhone,email])
    return result;
  }
  getAdminById(adminId) {
    const selectQuery = "SELECT * FROM admin WHERE id = ?";
    const result = query(selectQuery, adminId);
    return result;
  }
  addAdmin(adminData) {
    const insertQuery = "INSERT INTO admin SET ?";
    const result = query(insertQuery, adminData);
    return result;
  }
  updateAdmin(adminData, oldEmail) {
    const updateQuery = "UPDATE admin SET ? WHERE email = ?";
    const result = query(updateQuery, [adminData, oldEmail]);
    return result;
  }
  deleteAdminByEmail(adminEmail) {
    const deleteQuery = "DELETE FROM admin WHERE email = ?";
    const result = query(deleteQuery, adminEmail);
    return result;
  }
}

module.exports = AdminModel;
