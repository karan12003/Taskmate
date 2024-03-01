import express from 'express'
import { Task, User } from '../models/user_model.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import path from 'path'
import fs from 'fs'

const privateKey = fs.readFileSync(path.join(path.resolve(), './private.key'), "utf-8")

export const signup = async (req, res) => {
    try {
        const { name, username, password } = req.body;
        if (name) {
            if (username) {
                if (password) {
                    if (password.length >= 8) {
                        
                    }
                    else {
                        return res.status(404).json({ "Success": "false", "message": "Password length must be greater than 8" })
                    }
                }
                else {
                    return res.status(404).json({ "Success": "false", "message": "Please enter Password" })
                }
            } else {
                return res.status(404).json({ "Success": "false", "message": "Please enter Username" })
            }
        }
        else {
            return res.status(404).json({ "Success": "false", "message": "Please enter Name" })
        }
    } catch (error) {
        return res.status(404).json({ "Success": "false", "message": error.message })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (username) {
            if (password) {
                let user = await User.findOne({ username: username })
                if (user) {
                    bcrypt.compare(password, user.password, function (err, result) {
                        if (result) {
                            if (user) {
                                var token = jwt.sign({ username: user.username }, privateKey, { algorithm: 'RS256' });
                                user.token = token;
                                user.save()
                                    .then(() => { return res.status(201).json({ "Success": "true", "message": "User logged in successfully", token: token,"name":user.name,"username":user.username }) })
                                    .catch((err) => { return res.status(201).json({ "Success": "false", "message": "Failed to login", "error": err.message }) })

                            }
                            else {
                                return res.status(404).json({ "Success": "false", "message": "Enter valid username/Password" })
                            }
                        }
                        else {
                            return res.status(404).json({ "Success": "false", "message": "Please enter valid Password" })
                        }
                    });
                }
                else {
                    return res.status(404).json({ "Success": "false", "message": "User Not found" })
                }
            } else {
                return res.status(404).json({ "Success": "false", "message": "Please enter password" })
            }

        } else {
            return res.status(404).json({ "Success": "false", "message": "Please enter username" })
        }

    } catch (error) {
        return res.status(404).json({ "Success": "false", "message": error.message })
    }
}

export const logout = async (req, res) => {
    try {
        let user = await User.findOne({ username: req.body.username })
        if (user) {
            user.token = "";
            user.save()
                .then(() => { res.status(201).json({ "Success": "true", "message": "User logged out successfully" }) })
                .catch((err) => { res.status(201).json({ "Success": "false", "message": "Failed to log out", "error": err.message }) })

        }
        else {
            return res.status(404).json({ "Success": "false", "message": "User not found" })
        }
    } catch (error) {
        return res.status(404).json({ "Success": "false", "message": error.message })
    }
}


