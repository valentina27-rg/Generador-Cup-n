document.addEventListener("DOMContentLoaded", function () {
    // Referencias a los elementos HTML
    const couponInput = document.getElementById("couponInput"); // Campo donde se muestra el cupón generado
    const generateButton = document.getElementById("generateCoupon"); // Botón para generar cupón
    const validateInput = document.getElementById("validateInput"); // Campo para ingresar cupón a validar
    const validateButton = document.getElementById("validateCoupon"); // Botón para validar cupón
    const validationMessage = document.getElementById("validationMessage"); // Mensaje de validación

    let couponList = []; // Array para almacenar los cupones generados

    /**
     * Función para generar un cupón aleatorio de 8 caracteres
     * Utiliza letras mayúsculas y números.
     */
    function generateCoupon() {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let coupon = "";
        for (let i = 0; i < 8; i++) {
            coupon += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return coupon;
    }

    /**
     * Evento para generar un cupón y almacenarlo en la lista.
     */
    generateButton.addEventListener("click", function () {
        const newCoupon = generateCoupon();
        couponList.push(newCoupon);
        couponInput.value = newCoupon;
        console.log(`Cupón generado: ${newCoupon}`);
        console.log("Lista actual de cupones:", couponList);
    });

    /**
     * Función para validar un cupón ingresado por el usuario.
     * @param {string} coupon - Código del cupón a validar.
     */
    function validateCoupon(coupon) {
        // Convertir el cupón a mayúsculas para evitar errores de formato
        const formattedCoupon = coupon.trim().toUpperCase();

        // Verificar si el cupón está vacío
        if (formattedCoupon === "") {
            validationMessage.textContent = "Por favor, ingrese un cupón.";
            validationMessage.className = "invalid";
            return;
        }

        // Buscar el cupón en la lista
        const index = couponList.indexOf(formattedCoupon);

        if (index !== -1) {
            // Cupón válido: eliminarlo de la lista y mostrar mensaje de éxito
            console.log(`Cupón válido: ${formattedCoupon} - Eliminado de la lista.`);
            validationMessage.textContent = "¡El cupón es Válido!";
            validationMessage.className = "valid";
            couponList.splice(index, 1); // Eliminar el cupón usado
        } else {
            // Cupón inválido: mostrar mensaje de error
            console.log(`Cupón incorrecto o ya usado: ${formattedCoupon}`);
            validationMessage.textContent = "¡El cupón NO es Válido!";
            validationMessage.className = "invalid";
        }

        console.log("Lista actual de cupones después de validación:", couponList);
        validateInput.value = ""; // Limpiar el campo después de validarlo
    }

    /**
     * Evento para validar cupón cuando se presiona el botón de validar.
     */
    validateButton.addEventListener("click", function () {
        validateCoupon(validateInput.value);
    });

    /**
     * Evento para validar cupón cuando se presiona "Enter" en el campo de validación.
     */
    validateInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Evita que se envíe el formulario
            validateCoupon(validateInput.value);
        }
    });
});
