'use strict';
const entrepriseModel = require('../ORM/entreprise');
const supplyModel = require('../ORM/supply');
const request = require('request');
const config = require('./../../../configuration.js');

class Entreprise {
  constructor() {}

  getOneEntreprise(id){
    return new Promise(async (resolve, reject) => {
      try {
        let entreprise = await entrepriseModel.model.findById(id);
        // console.log('entreprise',entreprise);
        let supplies = await supplyModel.model.find({"DFC:suppliedBy":id});
        // console.log('supplies',supplies);
        entreprise['DFC:supplies']= supplies
        // console.log('products', products);
        resolve(entreprise);
      } catch (e) {
        reject(e);
      }
    })
  }

  async updateOneEntreprise(entreprise){
    return new Promise(async (resolve, reject) => {
      try {
        let entrepriseOld = await entrepriseModel.model.findById(supply._id);
        Object.assign(entrepriseOld, entreprise);
        await entrepriseOld.save();
        resolve(entrepriseOld);
      } catch (e) {
        reject(e);
      }
    })
  }

  async createOneEntreprise(entreprise){
    return new Promise(async (resolve, reject) => {
      try {
        let newEntreprise = await entrepriseModel.model.create(entreprise)
        resolve(newEntreprise);
      } catch (e) {
        reject(e);
      }
    })
  }

}

module.exports = Entreprise;
