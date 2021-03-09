const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => `
    <div>
      <h2>Your Recent Order for ${total}</h2>
      <p>Please start walking over, we will have your order ready in the next 20mins.</p>
      <ul>
        ${order
          .map(
            (item) => `
          <li>
            <img src="${item.thumbnail}" alt="${item.name}"/>
            ${item.size} ${item.name} - ${item.price}
          </li>`
          )
          .join('')}
      </ul>
      <p>Your total is <strong>€${total}</strong> due at pickup</p>
      <style>
          ul {
            list-style: none;
          }
      </style>
    </div>
  `;

// create transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);

  if (body.siroop) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'No robots allowed here ERR47844' }),
    };
  }

  // validation
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // make sure they have items in the order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
