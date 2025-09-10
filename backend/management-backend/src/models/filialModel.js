const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Filiale = sequelize.define('Filiale', { 
  id_filiale: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom_filiale: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  code_filiale: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  adresse: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ville: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  pays: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  base_donnee_nom: {
    type: DataTypes.STRING(100),
    allowNull: true,
  }
}, {
  timestamps: true, // createdAt et updatedAt gérés automatiquement
  tableName: 'filiales', // s'assure que Sequelize utilise le nom exact de la table
});

// Méthode pour trouver une filiale par nom
Filiale.findByName = async function (nom_filiale) {
  return await this.findOne({ where: { nom_filiale } });
};

// Méthode pour créer une nouvelle filiale
Filiale.createFiliale = async function (filialeData) {
  return await this.create(filialeData);
};

module.exports = Filiale;
