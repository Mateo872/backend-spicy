import { Router } from "express";
import { Resend } from "resend";

const router = Router();
const API_KEY = process.env.API_KEY;
const resend = new Resend(API_KEY);

router.route("/:email/send").get(async (req, res) => {
  const { email } = req.params;
  const products = JSON.parse(req.query.products);

  const message = `
  <p>Hola,</p>
  <p>Somos Spicy Basics y queremos confirmarte que hemos recibido tu orden:</p>
  <ul>
    <li><strong>Productos:</strong> ${products.name.join(" - ")}</li>
    <li><strong>Cantidad:</strong> ${products.quantity}</li>
    <li><strong>Imagen:</strong> <img src="${
      products.imageOne
    }" alt="Producto"></li>
  </ul>
  <p>Total gastado: ${products.totalPrice}</p>
  <p>¡Gracias por elegir nuestros productos!</p>
  <p>Atentamente,<br>El equipo de Spicy Basics</p>
`;

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmación de Orden - Spicy Basics",
      html: message,
    });

    if (error) {
      return res.status(400).json({ error });
    }

    res.status(200).json({ data });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
});

export default router;
