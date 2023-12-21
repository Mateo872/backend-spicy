import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

export const createOrder = async (req, res) => {
  const client = new MercadoPagoConfig({
    accessToken:
      "TEST-3476545741744702-122009-ef1b7ba328fc8984ae99d7333363c40e-1603044666",
  });

  const preference = new Preference(client);

  const { items, userPayer } = req.body;

  try {
    const result = await preference.create({
      body: {
        items: items.map((item) => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          description: item.name,
        })),
        payer: {
          name: userPayer.name,
          email: userPayer.email,
        },

        notification_url: "https://c37a-176-32-17-251.ngrok-free.app/webhook",
        back_urls: {
          success: "http://localhost:5173/usuario/carrito",
          failure: "http://localhost:5173/usuario/carrito",
          pending: "http://localhost:5173/usuario/carrito",
        },
        auto_return: "approved",
      },
    });

    res.send(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const receiveWebhook = async (req, res) => {
  console.log(req, res);
  try {
    const payment = new Payment();

    if (req.query.type === "payment") {
      const data = await payment.get(req.query.id);
      res.send(data);
    }

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
