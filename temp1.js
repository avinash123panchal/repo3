var db = require("../../db");
var Sequelize = require("sequelize");
var globalUtils = require('../../../support/utils');
var constants = require('../../../support/constants');
var fields = {};
fields['id'] = {type: Sequelize.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true};
fields['name'] = {type: Sequelize.STRING, allowNull: false};
fields['data_file_type'] = {type: Sequelize.STRING, allowNull: false};
fields['is_delete'] = {type: Sequelize.BOOLEAN, allowNull: false};
fields['is_backup'] = {type: Sequelize.BOOLEAN, allowNull: true};
fields['max_records'] = {type: Sequelize.STRING, allowNull: true};
fields['code'] = {type: Sequelize.STRING, allowNull: true};
fields['code_hash'] = {type: Sequelize.BIGINT, allowNull: true};
fields['dependency_json'] = {type: Sequelize.JSON, allowNull: true};
var keys = Object.keys(constants.db.auditColumns);
for (var key in keys)
    if (constants.db.auditColumns[keys[key]] instanceof Object)
        fields[keys[key]] = globalUtils.copyJSONObj({data: constants.db.auditColumns[keys[key]].model});
var indexes = globalUtils.copyJSONObj({data: constants.db.indexes});
indexes.push({fields: ['id']});
indexes.push({fields: ['code_hash']});
var dao = db.recon_engine.dbModel(db.recon_engine.dbName, db.recon_engine.dbConnector, 'backup_delete', fields, {
    classMethods: {
        idColName: function () {
            return 'id';
        }, nameColName: function () {
            return 'name';
        }, dataFileTypeColName: function () {
            return 'data_file_type';
        }, isDeleteColName: function () {
            return 'is_delete';
        }, isBackupColName: function () {
            return 'is_backup';
        }, isMaxRecordsColName: function () {
            return 'max_records';
        }, codeColName: function () {
            return 'code';
        }, codeHashColName: function () {
            return 'code_hash';
        }, dependencyJSONColName: function () {
            return 'dependency_json';
        }, getHashColumns: function () {
            var map = {};
            map[this.codeColName()] = this.codeHashColName();
            return map;
        }
    }, indexes: indexes,
});
module.exports = dao;