


module.exports.Login = async (req, res) => {
  return res.json({ status: true, messages: 'Login' });
};

module.exports.Register = async (req, res) => {
  return res.json({ status: true, messages: 'Register' });
};
module.exports.GetAllMeals = async (req, res) => {
  return res.json({ status: true, messages: 'GetAllMeals' });
};
module.exports.AddMeal = async (req, res) => {
  return res.json({ status: true, messages: 'AddMeal' });
};
module.exports.GetSingleMeal = async (req, res) => {
  return res.json({ status: true, messages: 'GetSingleMeal' });
};
module.exports.UpdateMeal = async (req, res) => {
  return res.json({ status: true, messages: 'UpdateMeal' });
};
module.exports.ResetPassword = async (req, res) => {
  return res.json({ status: true, messages: 'ResetPassword' });
};

module.exports.VerifyUserResetPassword = async (req, res) => {
  return res.json({ status: true, messages: 'VerifyUserResetPassword' });
};

