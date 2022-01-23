import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'adming@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Ahmet00 Musa',
    email: 'ahmet214example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
  {
    name: 'Kader Mahkumu',
    email: 'mazlum_prens@googleadmnin.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: false,
  },
];

export default users;
