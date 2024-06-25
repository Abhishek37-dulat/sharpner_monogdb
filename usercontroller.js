const User = require("./User");

exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User(name, email, password);

    const data = await user.save();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.fetchUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.send("User not found!");
    }
    return res.send(user);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAllUsers();
    if (!users) {
      return res.send("Users not found!");
    }
    return res.send(users);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.editUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.send("User not found!");
    }
    const updateUser = new User(name, email, password, req.params.id);

    const data = await updateUser.save();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.send("User not found!");
    }
    const data = await User.deleteUser(req.params.id);
    return res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
