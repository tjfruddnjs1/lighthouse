const Sequelize = require('sequelize');

module.exports = class Essay extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            essay_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true
            },
            essay_title: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            essay_context: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            essay_title_image: {
                type: Sequelize.BLOB,
                allowNull: true
            }
            
        }, {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Essay',
            tableName: 'essays',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db) {
        db.Essay.belongsTo(db.User, {
            foreignKey : {name : 'user_id', allowNull : false}, 
            sourceKey: 'essay_id',
            onDelete: 'cascade'
        });
        db.Essay.belongsTo(db.Job, {
            foreignKey: {name: 'job_id', allowNull: false},
            sourceKey: 'essay_cateogory',
            onDelete: 'cascade'
        })
    }
};