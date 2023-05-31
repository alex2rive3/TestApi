const axios = require('axios');

require("dotenv").config()
const jwt = require("jsonwebtoken");
const URL_BASE = process.env.URL_BASE
const secret_key = process.env.KEY_SECRET

//login created for the sole purpose of using a token with middleware
exports.login = (req, res) => {
  const payload = {
    email: req.body.email
  }
  const myJWT = jwt.sign(payload, secret_key);
  res.cookie("usertoken", myJWT, secret_key, { httpOnly: true }).status(200).json({ msg: "The session started" })
}
//logout to remove token
module.exports.logout = (req, res) => {
  res.clearCookie('usertoken');
  res.status(200).json({ message: "we close the session" });
}

exports.listUsers = async (req, res) => {
  try {
    const posts = await axios.get(`${URL_BASE}/posts`);
    const data = posts.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error making the request', error });
  }
}

exports.getUserById = async (req, res) => {
  const id = req.params.id
  try {
    const user = await axios.get(`${URL_BASE}/posts/${id}`)
    const data = user.data
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error making the request', error });
  }
}

exports.create = async (req, res) => {
  const body = JSON.stringify(req.body)
  try {
    const newUser = await axios.post(`${URL_BASE}/posts`, body, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    res.status(200).json({ msg: "Posts Created Successfully", data: newUser.data })
  } catch (error) {
    res.status(500).json({ error: 'Error making the request', error });
  };
}

exports.update = async (req, res) => {
  const body = JSON.stringify(req.body)
  const id = req.params.id
  try {
    const updateUser = await axios.patch(`${URL_BASE}/posts/${id}`, body, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    res.status(200).json({ msg: "Posts Edited Successfully", data: updateUser.data })
  } catch (error) {
    res.status(500).json({ error: 'Error making the request', error });
  };
}

exports.patching = async (req, res) => {
  const body = JSON.stringify(req.body)
  const id = req.params.id
  try {
    const pachingUser = await axios.patch(`${URL_BASE}/posts/${id}`, body, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    res.status(200).json({ msg: "Posts Edited Successfully", data: pachingUser.data })
  } catch (error) {
    res.status(500).json({ error: 'Error making the request', error });
  };
}

exports.delete = async (req, res) => {
  const id = req.params.is
  try {
    const userDeleted = await axios.delete(`${URL_BASE}/posts/${id}`)
    res.status(200).json({ msg: "Posts Eliminado Exitosamente" })
  } catch (error) {
    res.status(500).json({ error: 'Error making the request', error });
  };
}