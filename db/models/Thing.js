module.exports = (sequelize, DataTypes) => {
  const Thing = sequelize.define("Thing", {
    name: {
      type: DataTypes.TEXT,
    },
    isTreasure: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  return Thing;
};
