exports.seedRandomNtoN = async (arrayOfRecords, relationship, model) => {
  arrayOfRecords.map((record, index) => {
    var randomSetter = Math.floor(
      Math.random(relationship.length) * relationship.length + 1
    );
    record[model.collection.name] = [];
    for (let i = 0; i < randomSetter; i++) {
      return (record[model.collection.name][i] = relationship[
        randomSetter - 1
      ]._id.toString());
    }
  });
  return arrayOfRecords;
}
exports.seedRandomNtoOne = async (arrayOfRecords, relationship, model) => {
  arrayOfRecords.map((record, index) => {
    var randomSetter = Math.floor(
      Math.random(relationship.length) * relationship.length + 1
    );
    record[model.collection.name.substring(0, model.collection.name.length - 1)] = relationship[
      randomSetter - 1
    ]._id.toString();
  });
  return arrayOfRecords;
}

exports.defaultEmployees = [{
  email: "admin@example.com",
  name: "Tommy",
  role: 'admin',
  password: "$2a$10$.D.ObRTjFkv4X0zyLCOE3ui9FKU1GveILRgvhQMWlIl2q3jbgnNoi",
  createdAt: new Date(Math.floor(Math.random() * Date.now())),
  verifiedAt: new Date(Math.floor(Math.random() * Date.now()))
}, {
  email: "user@example.com",
  name: "Mathilde",
  role: "user",
  password: "$2a$10$.D.ObRTjFkv4X0zyLCOE3ui9FKU1GveILRgvhQMWlIl2q3jbgnNoi",
  createdAt: new Date(Math.floor(Math.random() * Date.now())),
  verifiedAt: new Date(Math.floor(Math.random() * Date.now()))
}, {
  email: "tester@example.com",
  name: "Tester",
  role: "user",
  password: "$2a$10$.D.ObRTjFkv4X0zyLCOE3ui9FKU1GveILRgvhQMWlIl2q3jbgnNoi",
  createdAt: new Date(Math.floor(Math.random() * Date.now())),
  verifiedAt: new Date(Math.floor(Math.random() * Date.now()))
}];

exports.defaultReviews = [{
  score: 0.6,
  employee: undefined,
  createdAt: new Date(Math.floor(Math.random() * Date.now())),
},
{
  score: 0.2,
  employee: undefined,
  createdAt: new Date(Math.floor(Math.random() * Date.now())),
},
{
  score: 0.9,
  employee: undefined,
  createdAt: new Date(Math.floor(Math.random() * Date.now())),
},
{
  score: 0.4,
  employee: undefined,
  createdAt: new Date(Math.floor(Math.random() * Date.now())),
},
{
  score: 0.3,
  employee: undefined,
  createdAt: new Date(Math.floor(Math.random() * Date.now())),
},
{
  score: 0.2,
  employee: undefined,
  createdAt: new Date(Math.floor(Math.random() * Date.now())),
},
{
  score: 0.9,
  employee: undefined,
  createdAt: new Date(Math.floor(Math.random() * Date.now())),
},
];
exports.defaultFeedbacks = [
  {
    text: "Sometimes team-chaos, but always reliable in the end",
    employee: undefined,
    review: undefined,
    createdAt: new Date(Math.floor(Math.random() * Date.now())),
  },
  {
    text: "Good communicator",
    employee: undefined,
    review: undefined,
    createdAt: new Date(Math.floor(Math.random() * Date.now())),
  },
  {
    text: "Sees always the bigger scope",
    employee: undefined,
    review: undefined,
    createdAt: new Date(Math.floor(Math.random() * Date.now())),
  },
  {
    text: "Never reads her mails",
    employee: undefined,
    review: undefined,
    createdAt: new Date(Math.floor(Math.random() * Date.now())),
  },

];