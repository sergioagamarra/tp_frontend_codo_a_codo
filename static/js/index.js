const elements = {
    formAmount: document.getElementById("formAmount"),
    formCategory: document.getElementById("formCategory"),
    formPrice: document.getElementById("formPrice"),
    formBtnSummary: document.getElementById("formBtnSummary"),
    formBtnDelete: document.getElementById("formBtnDelete"),
    formDivButtons: document.getElementById("formDivButtons"),
    form: document.getElementById("form"),
    formName: document.getElementById("formName"),
    formLastName: document.getElementById("formLastName"),
    formMail: document.getElementById("formMail"),
    cardStudent: document.getElementById("cardStudent"),
    cardTrainee: document.getElementById("cardTrainee"),
    cardJunior: document.getElementById("cardJunior"),
    modal: document.getElementById("modal"),
    modalName: document.getElementById("modalName"),
    modalLastName: document.getElementById("modalLastName"),
    modalMail: document.getElementById("modalMail"),
    modalAmount: document.getElementById("modalAmount"),
    modalCategory: document.getElementById("modalCategory"),
    modalTotal: document.getElementById("modalTotal"),
    modalBtn: document.getElementById("modalBtn"),
};

elements.formPrice.style.display = "none";

elements.formAmount.addEventListener("input", updatePrice);

elements.formCategory.addEventListener("change", () => {
    const category = parseInt(elements.formCategory.value);
    updateCardSelected(category);
    updatePrice();
});

elements.cardStudent.addEventListener("click", () => {
    elements.formCategory.value = "2";
    updateCardSelected(2);
    updatePrice();
});

elements.cardTrainee.addEventListener("click", () => {
    elements.formCategory.value = "3";
    updateCardSelected(3);
    updatePrice();
});

elements.cardJunior.addEventListener("click", () => {
    elements.formCategory.value = "4";
    updateCardSelected(4);
    updatePrice();
});

elements.formBtnSummary.addEventListener("click", validateForm);

elements.formBtnDelete.addEventListener("click", cleanForm);

elements.modalBtn.addEventListener("click", function () {
    let modal = bootstrap.Modal.getInstance(elements.modal);
    modal.hide();
    showAlert("Se ha completado la compra de tickects con éxito.", 2);
});

function showAlert(message, type) {
    const form = elements.form;
    const alertDiv = document.createElement("div");
    let icon;
    let alert;

    switch (type) {
      case 1:
        icon = `<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>`;
        alert = "danger";
        break;
      case 2:
        icon = `<svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>`;
        alert = "success";
        break;
      default:
        break;
    }

    alertDiv.className = "row justify-content-center";
    alertDiv.innerHTML = `
        <div class="col-md-6">
          <div class="alert alert-${alert} d-flex justify-content-start" role="alert">
            ${icon}
            ${message}
          </div>
        </div>
      `;
    form.insertBefore(alertDiv, elements.formDivButtons);
    
    cleanForm();

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);

    return 0;
}

function calculatePrice(amount, category) {
    let totalPrice = amount * 200;

    switch (category) {
        case 2:
            totalPrice -= totalPrice * 0.8;
            break;

        case 3:
            totalPrice -= totalPrice * 0.5;
            break;

        case 4:
            totalPrice -= totalPrice * 0.15;
            break;
    }

    return totalPrice;
}

function updatePrice() {
    const { formAmount, formCategory, formPrice } = elements;
    const amount = parseInt(formAmount.value);
    const category = parseInt(formCategory.value);

    if (!amount || amount < 1) {
        formPrice.textContent = "";
        return;
    }

    const totalPrice = calculatePrice(amount, category);

    formPrice.textContent = `$ ${totalPrice}`;
    formPrice.style.display = "block";
}

function updateCardSelected(category) {
    const { cardStudent, cardTrainee, cardJunior } = elements;

    cardStudent.classList.remove("card-estudiante");
    cardTrainee.classList.remove("card-trainee");
    cardJunior.classList.remove("card-junior");

    switch (category) {
        case 2:
            cardStudent.classList.add("card-estudiante", "cursor-pointer");
            break;

        case 3:
            cardTrainee.classList.add("card-trainee", "cursor-pointer");
            break;

        case 4:
            cardJunior.classList.add("card-junior", "cursor-pointer");
            break;
    }
}

function validateForm() {
    const { formName, formLastName, formMail, formAmount } = elements;

    const name =  formName.value.trim();
    const lastName = formLastName.value.trim();
    const mail = formMail.value.trim();
    const amount = parseInt(formAmount.value);

    if (!name || !lastName || !mail || !amount) {
        showAlert("Por favor, complete todos los campos del formulario.", 1);
        return;
    }
    if (amount < 1) {
        showAlert("Por favor, ingrese una cantidad de tickets válida.", 1);
        return;
    }

    generateSummary();
}

function generateSummary() {
    const {
        formName,
        formLastName,
        formMail,
        formAmount,
        formCategory,
        modalName,
        modalLastName,
        modalMail,
        modalAmount,
        modalCategory,
        modalTotal,
        modal,
    } = elements;

    const name =  formName.value.trim();
    const lastName = formLastName.value.trim();
    const mail = formMail.value.trim();
    const amount = parseInt(formAmount.value);
    const category = parseInt(formCategory.value);
    const totalPrice = calculatePrice(amount, category);

    modalName.textContent = name;
    modalLastName.textContent = lastName;
    modalMail.textContent = mail;
    modalAmount.textContent = amount;
    modalCategory.textContent = getCategoryText(category);
    modalTotal.textContent = `$ ${totalPrice}`;

    const modalBoostrap = new bootstrap.Modal(modal);
    modalBoostrap.show();
}

function getCategoryText(category) {
    switch (category) {
        case 2:
            return "Estudiante";
        case 3:
            return "Trainee";
        case 4:
            return "Junior";
        default:
            return "General";
    }
}

function cleanForm() {
    const {
        formName,
        formLastName,
        formMail,
        formAmount,
        formCategory,
        formPrice,
    } = elements;

    formName.value = "";
    formLastName.value = "";
    formMail.value = "";
    formAmount.value = "";
    formCategory.value = "1";
    formPrice.style.display = "none";

    elements.cardStudent.classList.remove("card-estudiante");
    elements.cardTrainee.classList.remove("card-trainee");
    elements.cardJunior.classList.remove("card-junior");
}