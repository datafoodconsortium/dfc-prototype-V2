'use strict';
const userModel = require('../ORM/user');
const entrepriseModel = require('../ORM/entreprise');
const request = require('request');
const config = require('./../../../configuration.js');

class Entreprise {
  constructor() {}

  getOneUser(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await userModel.model.findOne(id);
        // console.log('products', products);
        resolve(user);
      } catch (e) {
        reject(e);
      }
    })
  }

  async connectUser(login, accessToken) {
    return new Promise(async (resolve, reject) => {
      try {
        let user = await userModel.model.findOne({
          'login': login
        }).populate('DFC:Entreprise');
        if (user == undefined) {
          user = await this.createOneUser({
            'login': login,
            'accessToken': accessToken
          });
        } else {
          user.accessToken = accessToken;
          await user.save();
        }
        resolve(user);
      } catch (e) {
        reject(e);
      }
    })
  }

  async createEntreprise(userId,entreprise) {
    console.log('createEntreprise',userId,entreprise);
    return new Promise(async (resolve, reject) => {
      try {
        let user = await userModel.model.findById(userId);
        let newEntreprise = await entrepriseModel.model.create(entreprise);
        user['DFC:Entreprise']=newEntreprise;
        await user.save();
        resolve(user);
      } catch (e) {
        reject(e);
      }
    })
  }

  async updateOneUser(user) {
    return new Promise(async (resolve, reject) => {
      try {
        let userOld = await userModel.model.findById(user._id);
        Object.assign(userOld, user);
        await userOld.save();
        resolve(userOld);
      } catch (e) {
        reject(e);
      }
    })
  }

  async createOneUser(user) {
    return new Promise(async (resolve, reject) => {
      try {
        let newUser = await userModel.model.create(user)
        resolve(newUser);
      } catch (e) {
        reject(e);
      }
    })
  }

}

module.exports = Entreprise;
