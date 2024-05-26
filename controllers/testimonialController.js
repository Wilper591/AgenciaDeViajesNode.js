const { Testimonial } = require("../models/Testimonial.js");

const guardarTestimonial = async (req, res) => {
  try {
    //Validar
    const { nombre, correo, mensaje } = req.body;
    const errores = [];

    if (nombre.trim() === "") {
      errores.push({ mensaje: "El Nombre está vacío" });
    }
    if (correo.trim() === "") {
      errores.push({ mensaje: "El Correo está vacío" });
    }
    if (mensaje.trim() === "") {
      errores.push({ mensaje: "El mensaje está vacío" });
    }

    if (errores.length > 0) {
      // Consultar testimoniales existentes
      const testimoniales = await Testimonial.findAll();

      // Mostrar la vista con errores
      res.render("testimoniales", {
        pagina: "Testimoniales",
        errores,
        nombre,
        correo,
        mensaje,
        testimoniales
      });
    } else {
      // Almacenarlo en la base de datos
      try {
        await Testimonial.create({
          nombre,
          correo,
          mensaje,
        });
        res.redirect("testimoniales");
      } catch (error) {
        console.log("Error al guardar testimonial: ", error.message);
      }
    }
  } catch (error) {
    console.log("Error al acceder a la ruta: ", error.message);
    res.status(500).send(error.message);
  }
};

module.exports = { guardarTestimonial };
