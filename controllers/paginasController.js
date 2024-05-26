const { Viaje } = require("../models/Viaje.js");
const { Testimonial } = require("../models/Testimonial.js");

const paginaInicio = async (req, res) => {

  const promiseDB = [];
  
  // Consultar 3 viajes del modelo Viaje
  promiseDB.push(Viaje.findAll({ limit: 3 }));
  // Consultar 3 testimoniales del modelo Testimonial
  promiseDB.push(Testimonial.findAll({ limit: 3 }));
  try {
    const resultado = await Promise.all(promiseDB);

    res.render("inicio", {
      pagina: "Inicio",
      clase: "home",
      viajes: resultado[0],
      testimoniales: resultado[1]
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

const paginaNosotros = (req, res) => {
  res.render("nosotros", {
    pagina: "Nosotros",
  });
};

const paginaViajes = async (req, res) => {
  // Consultar base de datos
  const viajes = await Viaje.findAll();
  res.render("viajes", {
    pagina: "Próximos Viajes",
    viajes,
  });
};

const paginaTestimoniales = async (req, res) => {
  try {
    const testimoniales = await Testimonial.findAll();

    res.render("testimoniales", {
      pagina: "Testimoniales",
      testimoniales,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
  const { slug } = req.params;
  try {
    const viaje = await Viaje.findOne({ where: { slug } });
    res.render("viaje", {
      pagina: "Información Viaje",
      viaje,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

module.exports = {
  paginaInicio,
  paginaNosotros,
  paginaViajes,
  paginaTestimoniales,
  paginaDetalleViaje,
};
