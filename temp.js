var db = require("../../db");
var Sequelize = require("sequelize");
var DataTypes = Sequelize.DataTypes;
var globalUtils = require('../../../support/utils');
var constants = require('../../../support/constants');
var fields = {};
fields['id'] = {type: DataTypes.BIGINT, allowNull: false, primaryKey: true, autoIncrement: true};
fields['name'] = {type: DataTypes.STRING(1000), allowNull: false};
fields['data_file_type'] = {type: DataTypes.STRING(100), allowNull: false};
fields['is_delete'] = {type: DataTypes.BOOLEAN, allowNull: false};
fields['is_backup'] = {type: DataTypes.BOOLEAN, allowNull: true};
fields['max_records'] = {type: DataTypes.BIGINT, allowNull: true};
fields['code'] = {type: DataTypes.STRING(100), allowNull: true};
fields['code_hash'] = {type: DataTypes.BIGINT, allowNull: true};
fields['dependency_json'] = {type: DataTypes.JSON, allowNull: true};
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