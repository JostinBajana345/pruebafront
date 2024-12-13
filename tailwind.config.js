/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts}",  // Asegúrate de incluir las rutas donde se usan clases de Tailwind
    "./public/index.html",      // Si tienes archivos en la carpeta 'public' (depende de tu estructura)
  ],
  theme: {
    extend: {
      // Aquí puedes extender el tema de Tailwind si necesitas agregar más colores, fuentes, etc.
    },
  },
  plugins: [],
}
