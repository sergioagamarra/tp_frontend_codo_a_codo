const elementos = {
    cantidadInput: document.getElementById("cantidad"),
    categoriaSelect: document.getElementById("categoria"),
    precioH3: document.getElementById("precio"),
    resumenBtn: document.getElementById("btn-resumen"),
    borrarBtn: document.getElementById("btn-borrar"),
    divBtn: document.getElementById("botones"),
    formNombre: document.getElementById("form_nombre"),
    formApellido: document.getElementById("form_apellido"),
    formCorreo: document.getElementById("form_correo")
  };
  
  elementos.precioH3.style.display = "none";
  
  elementos.resumenBtn.addEventListener("click", () => {
    const { cantidadInput, categoriaSelect, precioH3 } = elementos;
    const cantidad = parseInt(cantidadInput.value);
  
    if (cantidad) {
      const categoria = parseInt(categoriaSelect.value);
      let precioTotal = cantidad * 200;
  
      switch (categoria) {
        case 1:
          precioTotal -= precioTotal * 0.8;
          break;
        case 2:
          precioTotal -= precioTotal * 0.5;
          break;
        case 3:
          precioTotal -= precioTotal * 0.15;
          break;
      }
  
      precioH3.textContent = `$ ${precioTotal}`;
      precioH3.style.display = "block";
    } else {
      const formulario = document.getElementById("formulario");
      const alertDiv = document.createElement("div");
      alertDiv.className = "row justify-content-center";
      alertDiv.innerHTML = `
        <div class="col-md-6">
          <div class="alert alert-danger d-flex justify-content-start" role="alert">
            ¡Por favor ingrese la cantidad de tickets que desea comprar!
          </div>
        </div>
      `;
      formulario.insertBefore(alertDiv, elementos.divBtn);
      setTimeout(() => {
        alertDiv.remove();
      }, 3000);
    }
  });
  
  elementos.borrarBtn.addEventListener("click", () => {
    const { formNombre, formApellido, formCorreo, cantidadInput, categoriaSelect, precioH3 } = elementos;
  
    formNombre.value = "";
    formApellido.value = "";
    formCorreo.value = "";
    cantidadInput.value = "";
    categoriaSelect.value = "1";
    precioH3.style.display = "none";
  });