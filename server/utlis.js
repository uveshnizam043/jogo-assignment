const avtarBgColors = [
  "#8D6E63",
  "#80CBC4",
  "#FFB067",
  "#C175C8",
  "#FB7676",
  "#DCE775",
  "#FFB74D",
  "#D81B60",
  "#6A1B9A",
  "#3949AB",
  "#00838F",
  "#388E3C",
  "#C0CA33",
  "#FFB300",
  "#E65100",
  "#4E342E",
];
let colorCount = 0;
const users = [];

function removeUser(id) {
  colorCount = colorCount - 1;
  const discountedUserIndex = users.findIndex((ele) => ele._id == id);
  users.splice(discountedUserIndex, 1);
  return users;
}
function addUser(data) {
  if (colorCount < users.length) {
    colorCount = 0;
  }
  const user = {
    _id: !users.length ? 1 : users[users.length - 1]._id + 1,
    name: data,
    color: avtarBgColors[colorCount] || "#FFB74D",
  };
  users.push(user);
  colorCount = colorCount + 1;
  return { user, users };
}

module.exports = {
  removeUser,
  addUser,
};
